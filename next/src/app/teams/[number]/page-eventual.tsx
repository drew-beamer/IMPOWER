import { db } from "@/lib/db";
import { award, event, teamAward, teams } from "@/lib/schema";
import { asc, eq, sql } from "drizzle-orm";

export default async function TeamPage({
  params,
}: {
  params: { number: string };
}) {
  const teamKey = `frc${params.number}`;

  const teamData = db
    .select({
      teamId: teamAward.teamId,
      eventId: teamAward.eventId,
      award: award.awardName,
      points:
        sql<number>`round((${award.awardWeight} * exp(-1/2 * (date_part('year', CURRENT_TIMESTAMP) - date_part('year', ${event.endDate}))))::numeric, 2)::float8`.as(
          "points"
        ),
      endDate: event.endDate,
    })
    .from(teamAward)
    .leftJoin(award, eq(teamAward.awardId, award.awardID))
    .leftJoin(event, eq(teamAward.eventId, event.eventID))
    .leftJoin(teams, eq(teamAward.teamId, teams.teamId))
    .where(eq(teamAward.teamId, teamKey))
    .orderBy(asc(event.endDate));

  console.log(await teamData);

  return <div>team data get successful</div>;
}
