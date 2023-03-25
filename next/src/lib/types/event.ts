import { Team } from "./team"

export type ValidField = "team_list" | "week" | "end_date" | "awards" | "projections" | "ei_projections"

export type Projection = [Team, number]
export type Award = [string, number]

export interface Event {
    key: string,
    name: string,
    week?: number,
    end_date?: string,
    awards?: Award[],
    projections?: Projection[],
    ei_projections?: Projection[],
}

export type EventOption = {
    value: 'string',
    label: 'string'
}