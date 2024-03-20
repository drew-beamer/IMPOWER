import { db } from "@/lib/db";
import { event, eventType } from "@/lib/schema";
import { and, asc, eq, gte, lte, or } from "drizzle-orm";
import Link from "next/link";

export default async function EventsPage() {
  const events = await db
    .select()
    .from(event)
    .where(
      and(
        gte(event.endDate, "2024-01-01"),
        lte(event.week, 6),
        or(eq(event.eventType, 0), eq(event.eventType, 1))
      )
    )
    .orderBy(asc(event.endDate))
    .then((rows) => {
      return rows;
    });

  return (
    <div>
      <h1>Events</h1>
      <p className="mt-2">Regional and District Events</p>
      <div className="p-4 border border-slate-300 rounded-md mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Week</th>
              <th className="px-4 py-2 text-left">Event</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventID}>
                <td className="px-4 py-2">{event.week! + 1}</td>
                <td className="px-4 py-2">
                  <Link
                    className="text-blue-500 hover:underline"
                    href={`/events/${event.eventID}`}>
                    {event.name}
                  </Link>
                </td>
                <td>
                  {new Date(event.endDate).toISOString().slice(0, 10) <
                  new Date().toISOString().slice(0, 10)
                    ? "Complete"
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
