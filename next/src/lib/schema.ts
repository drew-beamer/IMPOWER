import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  teamId: varchar("team_id", { length: 12 }).primaryKey(),
  teamName: varchar("team_name", { length: 255 }).notNull(),
  subregion: varchar("subregion", { length: 64 }),
  country: varchar("country", { length: 40 }).notNull(),
});

export const eventType = pgTable("event_type", {
  id: integer("event_type").primaryKey(),
  description: varchar("description", { length: 32 }).notNull(),
});

export const event = pgTable("event", {
  eventID: varchar("event_id", { length: 16 }).primaryKey().notNull(),
  eventType: integer("event_type")
    .notNull()
    .references(() => eventType.id),
  name: varchar("name", { length: 255 }).notNull(),
  week: integer("week"),
  endDate: date("end_date").notNull(),
});

export const award = pgTable("award", {
  awardID: integer("award_id").primaryKey(),
  awardName: varchar("award_name", { length: 64 }).notNull(),
  awardWeight: integer("award_weight").notNull().default(0),
});

export const teamAward = pgTable(
  "team_award",
  {
    teamId: varchar("team_id", { length: 12 })
      .references(() => teams.teamId)
      .notNull(),
    eventId: varchar("event_id", { length: 16 })
      .references(() => event.eventID)
      .notNull(),
    awardId: integer("award_id")
      .references(() => award.awardID)
      .notNull(),
    isDistrictTeam: boolean("is_district_team"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.teamId, table.eventId, table.awardId] }),
    };
  }
);
