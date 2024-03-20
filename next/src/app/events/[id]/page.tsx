import { db } from "@/lib/db";
import { award, event, teamAward, teams } from "@/lib/schema";
import {
  eq,
  inArray,
  sql,
  and,
  desc,
  asc,
  lt,
  not,
  notInArray,
  gte,
} from "drizzle-orm";
import { year } from "drizzle-orm/mysql-core";
import { redirect } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const uniqueEvent = await db
    .select()
    .from(event)
    .where(and(eq(event.eventID, params.id), inArray(event.eventType, [0, 1])))
    .limit(1)
    .then((rows) => {
      if (rows.length !== 1) {
        redirect("/404");
      }
      return rows[0];
    });

  const currentYear = new Date().getFullYear();

  const priorEvents = db
    .select({
      eventId: event.eventID,
    })
    .from(event)
    .where(
      and(
        lt(event.endDate, uniqueEvent.endDate),
        eq(sql`date_part('year', ${event.endDate})`, currentYear)
      )
    )
    .as("prior_events");

  const priorWinners = db
    .select()
    .from(teamAward)
    .where(eq(teamAward.awardId, 0))
    .as("prior_winners");

  const ytdEventWinners = db
    .select({
      teamId: priorWinners.teamId,
    })
    .from(priorEvents)
    .innerJoin(priorWinners, eq(priorEvents.eventId, priorWinners.eventId));

  const eligibleTeamsAttending = db
    .select({
      teamId: teamAward.teamId,
    })
    .from(teamAward)
    .where(
      and(
        eq(teamAward.eventId, uniqueEvent.eventID),
        notInArray(teamAward.teamId, ytdEventWinners)
      )
    );

  const teamPoints = db
    .select({
      teamId: teamAward.teamId,
      points:
        sql<number>`sum(${award.awardWeight} * exp(-1/2 * (date_part('year', CURRENT_TIMESTAMP) - date_part('year', ${event.endDate}))))`.as(
          "points"
        ),
    })
    .from(teamAward)
    .leftJoin(event, eq(teamAward.eventId, event.eventID))
    .where(
      and(
        inArray(teamAward.teamId, eligibleTeamsAttending),
        lt(event.endDate, uniqueEvent.endDate)
      )
    )
    .leftJoin(award, eq(teamAward.awardId, award.awardID))
    .groupBy(teamAward.teamId)
    .as("team_points");

  const teamFullData = await db
    .select({
      teamId: teams.teamId,
      teamName: teams.teamName,
      subregion: teams.subregion,
      country: teams.country,
      points: teamPoints.points,
    })
    .from(teamPoints)
    .leftJoin(teams, eq(teamPoints.teamId, teams.teamId))
    .orderBy(desc(teamPoints.points));

  let eventWinner:
    | {
        teamId: string;
        eventId: string;
        awardId: number;
        isDistrictTeam: boolean | null;
      }
    | undefined = undefined;
  if (new Date() > new Date(uniqueEvent.endDate)) {
    eventWinner = await db
      .select()
      .from(teamAward)
      .where(
        and(
          eq(teamAward.eventId, uniqueEvent.eventID),
          eq(teamAward.awardId, 0)
        )
      )
      .limit(1)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0];
        }
        return undefined;
      });
  }

  return (
    <div>
      <h1>{uniqueEvent.name}</h1>
      <p className="lead">Week {uniqueEvent.week ?? 1}</p>
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subregion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamFullData.map((team) => (
              <tr
                key={team.teamId}
                className={
                  eventWinner?.teamId === team.teamId ? " bg-[#ffcf40]" : ""
                }>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team.teamId!.slice(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{team.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {team.subregion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{team.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
