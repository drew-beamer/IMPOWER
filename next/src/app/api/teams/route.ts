import clientPromise from '@/lib/mongo';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    // some logic to be able to handle both raw team numbers and team codes
    const team_codes: string[] | undefined = searchParams.get('teams')?.split(",").map((code) => {
        return code.includes("frc") ? code : "frc" + code
    });

    const limitParam = searchParams.get('limit')

    // TODO: change to teams lib


    let limit: number
    try {
        limit = limitParam ? parseInt(limitParam) : 10000
    } catch (e) {
        return new Response(JSON.stringify({ "Error": "Invalid Request" }), { status: 400 })
    }

    try {
        const client = await clientPromise;
        const db = client.db("Teams");
        const teams_collection = db.collection("2023");

        if (team_codes !== undefined) {
            const result = await teams_collection.find({ key: { $in: team_codes } }).limit(limit).toArray()
            return new Response(JSON.stringify(result))
        } else {
            const result = await teams_collection.find({}).limit(limit).toArray()
            return new Response(JSON.stringify(result))
        }
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ "Error": "Internal Server Error" }), { status: 500 })
    }


}
