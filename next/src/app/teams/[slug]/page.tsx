
import TeamHistoryChart from "@/components/data/teamHistoryChart";
import { TrophyIcon } from "@/components/ui/icons";
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
    const teamData = await getTeams({ team_codes: ["frc" + slug], fullData: true }).then((arr) => arr[0]);

    let chairmans = 0;
    let ei = 0
    teamData.history?.forEach((event) => {
        if (event.award !== undefined && (event.award?.includes("Chairman's Award") || event.award?.includes("Impact Award"))) chairmans++;
        else if (event.award !== undefined && event.award?.includes("Engineering Inspiration Award")) ei++;
    })



    if (teamData.rank !== undefined && teamData.percentile !== undefined) {
        return <div className="pt-12 flex justify-center flex-wrap w-full">
            <section className="text-left w-full max-w-[800px] ">
                <h1 className="text-4xl">{slug} | {teamData.name}</h1>
                <div className="grid my-4 grid-cols-4 gap-8">
                    <div className="p-4 col-span-4 sm:col-span-2 bg-stone-100 shadow-lg rounded-md text-stone-900 text-sm flex items-center text-left justify-start flex-wrap">
                        <div className="flex">
                            <div className="bg-red-400 p-3 rounded-md">
                                <TrophyIcon size={32} className={"fill-stone-100"} />
                            </div>
                            <div className="ml-5">
                                <h2 className="w-full">{teamData.rank + 1}</h2>
                                <h5 className="text-stone-500">Rank</h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-span-4 sm:col-span-2 bg-stone-100 shadow-lg rounded-md text-stone-900 text-sm flex items-center text-left justify-start flex-wrap">
                        <div className="flex">
                            <div className="bg-blue-400 p-3 rounded-md">
                                <TrophyIcon size={32} className={"fill-stone-100"} />
                            </div>
                            <div className="ml-5">
                                <h2 className="w-full">{Math.round(teamData.current_ordinal !== undefined ? teamData.current_ordinal * 100 : 0) / 100}</h2>
                                <h5 className="text-stone-500">Ordinal</h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-span-4 sm:col-span-2 bg-stone-100 shadow-lg rounded-md text-stone-900 text-sm flex items-center text-left justify-start flex-wrap">
                        <div className="flex">
                            <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-3 rounded-md">
                                <TrophyIcon size={32} className={"fill-stone-100"} />
                            </div>
                            <div className="ml-5">
                                <h2 className="w-full">{chairmans}</h2>
                                <h5 className="text-stone-500">Impact Wins</h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 col-span-4 sm:col-span-2 bg-stone-100 shadow-lg rounded-md text-stone-900 text-sm flex items-center text-left justify-start flex-wrap">
                        <div className="flex">
                            <div className="bg-gradient-to-br from-gray-100 to-gray-300 p-3 rounded-md">
                                <TrophyIcon size={32} className={"fill-stone-100"} />
                            </div>
                            <div className="ml-5">
                                <h2 className="w-full">{ei}</h2>
                                <h5 className="text-stone-500">EI Wins</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full max-w-[800px]">
                <div className="w-full h-[300px] mt-12">
                    {teamData.history !== undefined ? <TeamHistoryChart data={teamData.history} /> : null}
                </div>
            </section>
            <section className="text-left w-full max-w-[800px] mt-12">
                <h2>Award History Timeline</h2>
                <div className="px-4 sm:px-16 mt-8">
                    <ol className="border-l-4 border-stone-300 relative">
                        {teamData.history !== undefined ? teamData?.history?.map((event, index) => {
                            let circleColor = "bg-stone-300"
                            if (event.award !== undefined && (event.award.includes("Chairman's Award") || event.award.includes("Impact Award"))) {
                                circleColor = "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500"
                            } else if (event.award !== undefined &&  event.award.includes("Engineering Inspiration Award")) {
                                circleColor = "bg-gradient-to-br from-gray-100 to-gray-300"
                            }

                            return <li key={event.event} className="mb-10 ml-6 px-4">
                                <div className={`w-4 h-4 -left-2.5 mt-1.5 rounded-full absolute ${circleColor}`}></div>
                                <h5>{event.end_date}</h5>
                                <h4>{event.award === undefined ? "DNP" : event.award}</h4>
                                <p>Ordinal Change: {index === 0 ? event.ordinal : teamData.history === undefined ? null : Math.round((event.ordinal - teamData.history[index - 1].ordinal) * 100) / 100}</p>
                            </li>
                        }) : null}
                    </ol>
                </div>


            </section>
        </div>
    } else {
        return <div>Loading...</div>
    }

    throw new Error("Something went wrong!")


}