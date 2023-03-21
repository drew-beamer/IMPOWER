
import TeamLeaderboard from "@/components/data/leaderboard";
import TeamSelect from "@/components/ui/select";
import { getTeams } from "@/lib/mongo/teams"
import { TeamOption } from "@/lib/types/team";


export default async function Page() {
    const data = await getTeams({ limit: 50 });
    const teamOptions = data.map((team) => {
        return { value: team.key.substring(3), label: `${team.key.substring(3)} | ${team.name}` }
    });

    return <section className="my-12 w-full flex justify-center">
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