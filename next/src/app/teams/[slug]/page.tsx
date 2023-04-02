
import TeamHistoryChart from "@/components/data/teamHistoryChart";
import { getTeams } from "@/lib/mongo/teams"



export async function generateStaticParams() {
    const allData = await getTeams({});
    return allData?.map((team) => {
        return {
            slug: team.key.substring(3)
        }
    })
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const teamData = await getTeams({ team_codes: ["frc" + params.slug] }).then((arr) => arr[0])
    return {
        title: `Team ${params.slug} | ${teamData.name} | IMPOWER`,
        description: `Explore and analyze FRC Team ${params.slug}, ${teamData.name}, from an outreach award perspective.`,
        openGraph: {
            title: `Team ${params.slug} | ${teamData.name} | IMPOWER`,
            description: `Explore and analyze FRC Team ${params.slug}, ${teamData.name} from an outreach award perspective.`,
            url: `https://impower.drewbeamer.io/teams/${params.slug}`,
            site_name: "IMPOWER",
            locale: "en_US",
            type: "website",
            images: [
                {
                    url: "https://impower.drewbeamer.io/images/og.png",
                    width: 1200,
                    height: 630,
                }],

        }
    }

}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const teamData = await getTeams({ team_codes: ["frc" + slug], fullData: true }).then((arr) => arr[0])
    console.log(teamData)
    if (teamData.rank !== undefined && teamData.percentile !== undefined) {
        return <div className="pt-12 flex justify-center flex-wrap w-full">
            <section className="text-left w-full max-w-[800px] ">
                <h2>{slug} | {teamData.name}</h2>
                <div className="flex w-full justify-start my-4">
                    <div className="mx-4 py-2 w-24 bg-red-400 rounded-md text-stone-50 text-sm flex items-center text-center justify-center flex-wrap">
                        <div>Rank
                            <h3 className="w-full">{teamData.rank + 1}</h3></div>

                    </div>
                    <div className="mx-4 py-2 w-24 bg-blue-400 rounded-md text-stone-50 text-sm flex items-center text-center justify-center flex-wrap">
                        <div>Percentile
                            <h3 className="w-full">{Math.round(teamData.percentile)}</h3></div>
                    </div>
                </div>
            </section>
            <section className="w-full max-w-[800px]">
                <div className="w-full h-[300px] mt-12">
                    {teamData.history !== undefined ? <TeamHistoryChart data={teamData.history} /> : null}
                </div>
            </section>
        </div>
    } else {
        return <div>Loading...</div>
    }

    throw new Error("Something went wrong!")


}