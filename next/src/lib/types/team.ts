
export interface TeamEvent {
    event: string,
    end_date: string,
    ordinal: number,
    rating: {
        mu: number,
        sigma: number
    },
    award: string,

}

export interface Team {
    name: string,
    key: string,
    country?: string,
    state?: string,
    rank?: number,
    percentile?: number,
    history?: TeamEvent[],
    current_ordinal?: number
}

export type TeamOption = {
    value: 'string',
    label: 'string'
}