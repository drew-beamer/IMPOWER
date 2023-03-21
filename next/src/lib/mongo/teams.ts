import clientPromise from ".";
import { Team } from "../types/team";


type TeamsRequest = {
    team_codes?: string[],
    limit?: number,
    fullData?: boolean
}

type Error = {
    error: string
}

export async function getTeams({ team_codes, limit, fullData }: TeamsRequest): Promise<Team[]> {

    if (limit === undefined) {
        limit = 0;
    }

    if (fullData === undefined) {
        fullData = false;
    }

    const includedFields = {
        current_ordinal: 1,
        name: 1,
        key: 1,
        rank: 1,
        percentile: 1
    }

    try {
        const client = await clientPromise;
        const db = client.db("Teams")
        const teams_collection = db.collection("2023");

        if (fullData && team_codes !== undefined) {
            const result = await teams_collection.find({ key: { $in: team_codes } }).toArray()
            return result?.map((team) => {
                return { key: team.key, name: team.name, current_ordinal: team.current_ordinal, percentile: team.percentile, rank: team.rank, history: team.history }
            })
        } else if (fullData) {
            const result = await teams_collection.find({}).toArray()
            return result?.map((team) => {
                return { key: team.key, name: team.name, current_ordinal: team.current_ordinal, percentile: team.percentile, rank: team.rank, history: team.history }
            })
        } else if (team_codes !== undefined) {
            const result = await teams_collection.find({ key: { $in: team_codes } }, { projection: includedFields }).sort({ "current_ordinal": -1 }).limit(limit).toArray()
            return result?.map((team) => {
                return { key: team.key, name: team.name, current_ordinal: team.current_ordinal, percentile: team.percentile, rank: team.rank }
            })
        } else {
            const result = await teams_collection.find({}, { projection: includedFields }).sort({ "current_ordinal": -1 }).limit(limit).toArray()
            return result?.map((team) => {
                return { key: team.key, name: team.name, current_ordinal: team.current_ordinal, percentile: team.percentile, rank: team.rank }
            })


        }

    } catch (e) {
        console.error(e)
    }

    throw new Error("This shouldn't be happening...")

}

export async function getTeamsList(): Promise<Team[]> {
    try {
        const client = await clientPromise;
        const db = client.db("Teams")
        const teams_collection = db.collection("2023");
        const result = await teams_collection.find({}, { projection: { key: 1, name: 1 } }).sort({ "key": -1 }).toArray()
        return result?.map((team) => {
            return { key: team.key, name: team.name }
        })
    } catch (e) {
        console.error(e)
    }

    throw new Error("Server error")
}