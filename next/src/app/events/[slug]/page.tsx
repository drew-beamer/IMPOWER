import OrdinalDistributionChart from "@/components/data/ordinalDistributionChart";
import { TrophyIcon } from "@/components/ui/icons";
import { teamDistributionFromOrdinals } from "@/lib/data/helpers";
import { getEvents } from "@/lib/mongo/events";
import { Projection } from "@/lib/types/event";
import Link from "next/link";


const HOF_GRADIENT = "bg-gradient-to-br from-sky-100 via-sky-400  to-sky-100 text-white"
const CHAIRMANS_GRADIENT = "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500"
const EI_GRADIENT = "bg-gradient-to-br from-gray-100 to-gray-300"
const OTHER_GRADIENT = "bg-gradient-to-br from-yellow-600 to-red-600 text-stone-50"

export async function generateStaticParams() {
    const allEvents = await getEvents({ fields: [] });
    return allEvents.map((event) => {
        return {
            slug: event.key
        }
    })
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const eventData = await getEvents({ eventCodes: [params.slug], fields: [] });
    return {
        title: `${eventData[0].name} | IMPOWER`,
        description: `IMPOWER's Impact and Engineering Inspiration projections for ${eventData[0].name}.`,
        openGraph: {
            title: `${eventData[0].name} | IMPOWER`,
            description: `IMPOWER's Impact and Engineering Inspiration projections for ${eventData[0].name}.`,
            url: `https://impower.drewbeamer.io/events/${eventData[0].key}`,
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
}

function ProjectionsTable({ data, impactWinners, eiWinners, hofWinners, awardWinners }: { data: Projection[], impactWinners: string[], eiWinners: string[], hofWinners: string[], awardWinners: string[] }) {
    return <div className="relative overflow-x-auto mt-6 z-0">
        <table className="w-full text-sm text-left px-6 mt-6 overflow-x-scroll">
            <thead className="text-xs uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Rank</th>
                    <th scope="col" className="px-6 py-3">Number</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Power</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {data?.map((team, index) => {
                    return <tr style={{backgroundAttachment: "fixed"}} key={team[0].key} className={`border-b w-full rounded-lg ${hofWinners.includes(team[0].key) ? HOF_GRADIENT : impactWinners.includes(team[0].key) ? CHAIRMANS_GRADIENT : eiWinners.includes(team[0].key) ? EI_GRADIENT : awardWinners.includes(team[0].key) ? OTHER_GRADIENT : ""}`}>
                        <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                        <td className="px-6 py-4"><Link href={`/teams/${team[0].key?.substring(3)}`}>{team[0].key?.substring(3)}</Link></td>
                        <td className="px-6 py-4"><Link href={`/teams/${team[0].key?.substring(3)}`}>{team[0].name}</Link></td>
                        <td className="px-6 py-4">{Math.round(100 * team[1]) / 100}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>

}


export default async function Page({ params }: { params: { slug: string } }) {
    const eventData = await getEvents({ fields: ["awards", "end_date", "projections", "ei_projections", "week"], eventCodes: [params.slug] }).then((arr) => arr[0]);

    let hofWinners: string[] = []
    let impactWinners: string[] = []
    let eiWinners: string[] = []
    let otherWinners: string[] = []

    eventData.awards?.forEach((award) => {
        if (params.slug === "cmptx" && award[1] == 0) {
            hofWinners.push(award[0])
        }
        else if (award[1] == 0 || award[1] == 69) {
            impactWinners.push(award[0])
        } else if (award[1] == 9) {
            eiWinners.push(award[0])
        } else {
            if ([11, 22, 82, 10, 15, 13].includes(award[1]))
            otherWinners.push(award[0])
        }
    })

    let chairmansCorrect = false;
    let eiCorrect = false;
    eventData.projections?.slice(0, 5).map((team) => {
        if (impactWinners.includes(team[0].key)) {
            chairmansCorrect = true;
        }
    })

    eventData.ei_projections?.slice(0, 5).map((team) => {
        if (eiWinners.includes(team[0].key)) {
            eiCorrect = true;
        }
    })

    const points = teamDistributionFromOrdinals(eventData.projections?.map((team) => {
        return team[1] as number;
    }) as number[])



    return <div className="pt-12 flex justify-center flex-wrap w-full mb-24">
        <div className="max-w-[800px] w-full">
            <section className="w-full text-left">
                <h2>{eventData.name}</h2>
                <h4>{eventData.week ? "Week " + eventData.week : null}</h4>

                <div className="mt-6 flex space-x-2 w-full justify-center items-center my-8 flex-wrap">
                    {chairmansCorrect ? <div className="bg-stone-100 text-center rounded-2xl shadow-xl w-48 h-48 flex justify-center items-center flex-wrap mb-4">
                        <div>
                            <TrophyIcon size={36} className="w-full  fill-yellow-400 mb-2" />
                            Impact in Top 5
                        </div>
                    </div> : null}
                    {eiCorrect ? <div className="bg-stone-100 text-center rounded-2xl shadow-xl w-48 h-48 flex justify-center items-center flex-wrap mb-4">
                        <div>
                            <TrophyIcon size={36} className="w-full fill-gray-300 mb-2" />
                            EI in Top 5
                        </div>
                    </div> : null}
                </div>
                <div className="w-full h-[300px]">
                    <h3 className="font-bold mb-3">Team Distribution</h3>
                    <OrdinalDistributionChart data={points} />
                </div>

            </section>

            <section className="w-full text-left mt-12 pt-10">
                <h2>{eventData.name.includes("Division") ? "Engineering Inspiration" : "Impact"} Projections</h2>
                <ProjectionsTable data={eventData.projections as Projection[]} impactWinners={impactWinners} eiWinners={eiWinners} awardWinners={otherWinners} hofWinners={hofWinners} />
                <ul className="mt-6">
                    {hofWinners.length > 0 ? <li className="flex my-1"><div className={`h-6 w-6 ${HOF_GRADIENT}`}></div> <p className="ml-2"> indicates team won CCA at event</p></li> : null}
                    <li className="flex my-1"><div className="h-6 w-6 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500"></div> <p className="ml-2"> indicates team won Impact/Chairman{"'"}s at event</p></li>
                    <li className="flex my-1"><div className="h-6 w-6 bg-gradient-to-br from-gray-100 to-gray-300"></div> <p className="ml-2"> indicates team won Engineering Inspiration at event</p></li>
                    <li className="flex my-1"><div className={`h-6 w-6 ${OTHER_GRADIENT}`}></div> <p className="ml-2"> indicates team won other IMPOWER-counting award</p></li>
                </ul>
            </section>
            <section className="w-full text-left mt-12">
                {eventData.ei_projections !== undefined ? <><h2>Engineering Inspiration Projections</h2>
                    <ProjectionsTable data={eventData.ei_projections as Projection[]} impactWinners={impactWinners} eiWinners={eiWinners} awardWinners={otherWinners} hofWinners={hofWinners} />
                    <ul className="mt-6">
                        {hofWinners.length > 0 ? <li className="flex my-1"><div className={`h-6 w-6 ${HOF_GRADIENT}`}></div> <p className="ml-2"> indicates team won CCA at event</p></li> : null}
                        <li className="flex my-1"><div className="h-6 w-6 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500"></div> <p className="ml-2"> indicates team won Impact/Chairman{"'"}s at event</p></li>
                        <li className="flex my-1"><div className="h-6 w-6 bg-gradient-to-br from-gray-100 to-gray-300"></div> <p className="ml-2"> indicates team won Engineering Inspiration at event</p></li>
                        <li className="flex my-1"><div className={`h-6 w-6 ${OTHER_GRADIENT}`}></div> <p className="ml-2"> indicates team won other IMPOWER-counting award</p></li>
                    </ul></> : null}
            </section>
        </div>
    </div>
}