import clientPromise from "."
import { ValidField } from "../types/event";
import { Event } from "../types/event";

interface Fields {

}

export async function getEvents({ eventCodes, fields }: { eventCodes?: string[] | undefined, fields: ValidField[] }): Promise<Event[]> {

    const fieldObject = Object.fromEntries([...fields, "name", "key"].map((field) => [field, 1]))

    try {
        const client = await clientPromise;
        const db = client.db("Events");
        const events_collection = db.collection("2023");

        if (eventCodes !== undefined) {
            const result = await events_collection.find({ key: { $in: eventCodes } }, { projection: fieldObject }).sort({ "end_date": 1 }).toArray()
            return result as unknown as Event[];
        } else {
            const result = await events_collection.find({}, { projection: fieldObject }).sort({ "end_date": 1 }).toArray()
            return result as unknown as Event[];
        }

    } catch (e) {
        console.error(e)
    }

    throw new Error("Server error")
}