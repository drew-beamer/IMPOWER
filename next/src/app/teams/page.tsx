
import TeamLeaderboard from "@/components/data/leaderboard";
import {TeamSelect} from "@/components/ui/select";
import { getTeams } from "@/lib/mongo/teams"
import { TeamOption } from "@/lib/types/team";

export const metadata = {
    title: "Events | IMPOWER",
    description: "Explore and analyze any FRC team dating back to 2017 from an outreach award perspective.",
    openGraph: {
        title: "Teams | IMPOWER",
        description: "Explore and analyze any FRC team this season from an outreach award perspective.",
        url: "https://impower.drewbeamer.io/teams",
        site_name: "IMPOWER"
    }
}

export default async function Page() {
    const data = await getTeams({});
    const teamOptions = data.map((team) => {
        return { value: team.key.substring(3), label: `${team.key.substring(3)} | ${team.name}` }
    }).sort((a, b) => parseInt(a.value) - parseInt(b.value));

    return <section className="my-12 w-full flex justify-center z-0">
        <div className="max-w-[800px] w-full">
            <div className="flex flex-wrap items-center">
                <div className="grow">
                    <h2>Leaderboard</h2>
                </div>
                <div className="w-72 py-2">
                    <TeamSelect teams={teamOptions as TeamOption[]} />
                </div>
            </div>
            <div className="w-full" >
                <TeamLeaderboard data={data} />
            </div>
        </div>

    </section>


}