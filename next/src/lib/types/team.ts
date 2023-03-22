
export interface TeamEvent {
    event: string,
    end_date: string,
    ordinal: number,
    rating: {
        mu: number,
        sigma: number
    }

}

export interface Team {
    name: string,
    key: string,
    rank?: number,
    percentile?: number,
    history?: TeamEvent[],
    current_ordinal?: number
}

export type TeamOption = {
    value: 'string',
    label: 'string'
}