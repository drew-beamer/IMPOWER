
import OrdinalDistributionChart from "@/components/data/ordinalDistributionChart";
import { teamDistributionFromOrdinals } from "@/lib/data/helpers";
import { getEvents } from "@/lib/mongo/events";
import { getTeams } from "@/lib/mongo/teams";

export default async function AnalysisPage() {

    const eventData = await getEvents({ fields: ["week", "awards", "projections", "ei_projections"] });
    const teamData = await getTeams({ fullData: false });

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

    const teamOrdinals = teamData.map((team) => {
        return team.current_ordinal as number;
    })


    const points = teamDistributionFromOrdinals(teamOrdinals)


    return <div className="pt-12 flex justify-center flex-wrap w-full mb-24 px-6">
        <div className="max-w-[800px] w-full">
            <section className="w-full text-left">
                <h2>{new Date().getFullYear()} Analysis</h2>
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
                <div className="w-full h-[300px]">
                    <OrdinalDistributionChart data={points} />
                </div>
            </section>
        </div>
    </div>
}