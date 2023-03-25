
import TeamLeaderboard from "@/components/data/leaderboard";
import { TeamSelect } from "@/components/ui/select";
import { getTeams } from "@/lib/mongo/teams"
import { TeamOption } from "@/lib/types/team";

export const metadata = {
    title: "Events | IMPOWER",
    description: "Explore and analyze any FRC team dating back to 2017 from an outreach award perspective.",
    openGraph: {
        title: "Teams | IMPOWER",
        description: "Explore and analyze any FRC team this season from an outreach award perspective.",
        url: "https://impower.drewbeamer.io/teams",
        site_name: "IMPOWER",
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: "https://impower.drewbeamer.io/images/og.png",
                width: 1200,
                height: 630,
            }],
    }
}

const HOF_INELIGIBLE = ["frc1629", "frc503", "frc4613", "frc1902", "frc1816", "frc1311", "frc2834"]

export default async function Page() {
    const data = await getTeams({});
    const teamOptions = data.map((team) => {
        return { value: team.key.substring(3), label: `${team.key.substring(3)} | ${team.name}` }
    }).filter((team) => !HOF_INELIGIBLE.includes("frc" + team.value)).sort((a, b) => parseInt(a.value) - parseInt(b.value));

    const hofIneligibleData = data.filter((team) => HOF_INELIGIBLE.includes(team.key));
    const eligibleData = data.filter((team) => !HOF_INELIGIBLE.includes(team.key));

    return <div className="my-12 w-full flex justify-center z-0 flex-wrap">
        <section className="max-w-[800px] w-full mb-6">
            <h2>Team Lookup</h2>
            <div className="w-72 py-2">
                <TeamSelect teams={teamOptions as TeamOption[]} />
            </div>
        </section>

        <section className="max-w-[800px] w-full">
            <div className="flex flex-wrap items-center">
                <div className="grow">
                    <h2>Hall of Fame</h2>
                </div>
            </div>
            <div className="w-full" >
                <TeamLeaderboard data={hofIneligibleData} />
            </div>
        </section>
        <section className="max-w-[800px] w-full mt-12">
            <div className="flex flex-wrap items-center">
                <div className="grow">
                    <h2>Eligible Leaderboard</h2>
                </div>
            </div>
            <div className="w-full" >
                <TeamLeaderboard data={eligibleData} />
            </div>
        </section>
    </div>


}