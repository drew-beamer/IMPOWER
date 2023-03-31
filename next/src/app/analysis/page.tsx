
import OrdinalDistributionChart from "@/components/data/ordinalDistributionChart";
import RegionalBar from "@/components/data/regionalBar";
import { teamDistributionFromOrdinals } from "@/lib/data/helpers";
import { getEvents } from "@/lib/mongo/events";
import { countryRegionalStatistics, getTeams } from "@/lib/mongo/teams";
import { RegionData } from "@/lib/types/region";


export const metadata = {
    title: "Analysis | IMPOWER",
    description: "Explore IMPOWER's accuracy and general insights into the rankings (more coming soon).",
    openGraph: {
        title: "Analysis | IMPOWER",
        description: "Explore IMPOWER's accuracy and general insights into the rankings (more coming soon).",
        url: "https://impower.drewbeamer.io/analysis",
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


export default async function AnalysisPage() {

    const eventData = await getEvents({ fields: ["week", "awards", "projections", "ei_projections"] });
    const teamData = await getTeams({ fullData: false });
    const UnitedStates = await countryRegionalStatistics({ country: "USA" });
    const Canada = await countryRegionalStatistics({ country: "Canada" });

    let regionalData = UnitedStates.concat(Canada);


    let total = 0;
    let impactCorrect = 0;
    let impactExact = 0
    let eiCorrect = 0;
    let eiTop2 = 0;

    eventData.forEach((event) => {
        let chairmansWinner: string[] = [];
        let eiWinner: string[] = [];
        event.awards?.forEach((award) => {
            if (award[1] == 0 || award[1] == 69) {
                chairmansWinner.push(award[0])
            } else if (award[1] == 9) {
                eiWinner.push(award[0])
            }
        })
        if (event.awards?.length !== undefined && event.awards.length !== 0) {
            total += 1;
        }
        let impactEventCorrect = 0;
        let eiEventCorrect = 0;
        event.projections?.slice(0, 5).forEach((team, index) => {
            if (chairmansWinner.includes(team[0].key)) {
                if (index === 0) {
                    impactExact += 1;
                }
                impactEventCorrect = 1;
            }

        })
        event.ei_projections?.slice(0, 5).forEach((team, index) => {
            if (eiWinner.includes(team[0].key)) {
                if (index <= 1) {
                    eiTop2 += 1;
                }
                eiEventCorrect = 1;
            }
        })
        impactCorrect += impactEventCorrect;
        eiCorrect += eiEventCorrect;
    })

    regionalData = regionalData.filter((region) => {
        return region.count >= 10;
    })
    
    regionalData = regionalData.sort((a, b) => {
        return b.statistic - a.statistic;
    }) as RegionData[]


    const teamOrdinals = teamData.map((team) => {
        return team.current_ordinal as number;
    })


    const points = teamDistributionFromOrdinals(teamOrdinals)


    return <div className="pt-12 flex justify-center flex-wrap w-full mb-24 px-6">
        <div className="max-w-[800px] w-full">
            <section className="w-full text-left">
                <h1>{new Date().getFullYear()} Analysis</h1>
                <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-1">
                    <div className="my-1 col-span-2 lg:col-span-1 bg-stone-100 text-center rounded-2xl shadow-xl w-full h-48 flex justify-center items-center flex-wrap">
                        <div>
                            <h2>{Math.round(100 * 100 * (impactExact / total)) / 100}%</h2>
                            Impact in Top 1
                        </div>
                    </div>
                    <div className="my-1 col-span-2 lg:col-span-1 bg-stone-100 text-center rounded-2xl shadow-xl w-full h-48 flex justify-center items-center flex-wrap">
                        <div>
                            <h2>{Math.round(100 * 100 * (impactCorrect / total)) / 100}%</h2>
                            Impact in Top 5
                        </div>
                    </div>
                    <div className="my-1 col-span-2 lg:col-span-1 bg-stone-100 text-center rounded-2xl shadow-xl w-full h-48 flex justify-center items-center flex-wrap">
                        <div>
                            <h2>{Math.round(100 * 100 * (eiTop2 / total)) / 100}%</h2>
                            EI in Top 2
                        </div>
                    </div>
                    <div className="my-1 col-span-2 lg:col-span-1 bg-stone-100 text-center rounded-2xl shadow-xl w-full h-48 flex justify-center items-center flex-wrap">
                        <div>
                            <h2>{Math.round(100 * 100 * (eiCorrect / total)) / 100}%</h2>
                            EI in Top 5
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full text-left mt-12">
                <h2 className="mb-4">Current Team Distribution</h2>
                <div className="w-full h-[300px]">
                    <OrdinalDistributionChart data={points} />
                </div>
            </section>
            <section className="w-full text-left mt-12">
                <h2 className="mb-4">Regional Top 10 Average</h2>
                <p>This graph shows the average of the top 10 teams from each state or province in
                    the United States and Canada with 10+ teams.
                </p>
                <div className="w-full h-[300px]">
                    {regionalData !== null ? <RegionalBar data={regionalData} />: null}
                </div>
            </section>

        </div>
    </div>
}

/*
            
*/