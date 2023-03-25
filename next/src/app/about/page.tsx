
export const metadata = {
    title: "About | IMPOWER",
    description: "Learn more about the history of IMPOWER and the methodology behind it.",
    openGraph: {
        title: "About | IMPOWER",
        description: "Learn more about the history of IMPOWER and the methodology behind it.",
        url: "https://impower.drewbeamer.io/about",
        site_name: "IMPOWER"
    }
}

export default function About() {
    return <div className="pt-12 flex justify-center flex-wrap w-full mb-24">
        <div className="max-w-[800px] w-full">
            <section className="w-full text-left max-w-[65ch]">
                <h1 className="font-bold">About Impower</h1>
            </section>
            <section className="mt-8 max-w-[65ch]">
                <h2>The History</h2>
                <h3>Who Am I?</h3>
                <p>
                    I am an alumnus of FRC Team 2485 (Class of 2020). Toward the latter part of my
                    sophomore year to my senior year, I was highly involved in the business and
                    outreach departments, particularly imagery and awards. During my time on the team,
                    I learned a lot about the business side of FRC, and I was able to work
                    with some truly incredible student and mentors both within 2485 and with other teams.
                    Some highlights included developing <a className="text-red-400 hover:underline hover:text-blue-400 transition-colors" target="_blank"  href="https://www.team2485.org/branding">2485{"'"}s Branding Guidelines</a>,
                    and working with Team 1902 to create a <a className="text-red-400 hover:underline hover:text-blue-400 transition-colors" target="_blank" href="https://www.team2485.org/chairmans">Chairman{"'"}s/Impact Award Resource Packet</a>.
                    During my time on the team, I was fortunate enough to experience three world championships,
                    three Chairman{"'"}s Award wins, and two Engineering Inspiration Awards.
                    <br/><br/>
                </p>
                <h3>Why Did I Create IMPOWER?</h3>
                <p>
                    The idea for IMPOWER started with the 2018 World Championship. I wanted to create
                    a metric, similar to <a className="text-red-400 hover:underline hover:text-blue-400 transition-colors" target="_blank" href="https://www.chiefdelphi.com/t/chairmans-predictions-week-1/163872/5?u=drewthemediadude2485">Ryan Shavell{"'s"} rankings on Chief Delphi</a>, 
                    that would be able to rank teams based on their likelihood of winning the Chairman{"'"}s Award. So I set out to do so. There were a few additional factors I wanted to take into account,
                    largely going back to 5 years, adding in additional bonuses for winning Chairman{"'"}s the year prior, giving district teams a bit of a bonus, and the event number the team won at.
                    This last item was my first attempt at creating a strength of schedule weight, as in theory Chairman{"'"}s should get easier as the season goes on and the competition level declines.
                    <br/><br/>
                    If you{"'"}re interested in seeing the original "Chairman{"'"}s Momentum Ratings", they can be found <a target="_blank" className="text-red-400 hover:underline hover:text-blue-400 transition-colors" href="https://docs.google.com/spreadsheets/d/1C2dq69FtgHTDTexv9j-_QmyzwKg7j2jmLme58uj7CbU/edit?usp=sharing">here</a>
                    <br/><br/>
                    However, I did not know how to code. This proved slightly problematic, as I had to manually update the rankings every week. As such, it never really took off. I did, however, continue to
                    use it for proposing regionals to go to and for assessing our odds at the events we were attending. This required some minor adaptations, and resulted in a regional version of the calculator being created.
                    <br/><br/>
                </p>
                <h3>So...Why Change the Old System?</h3>
                <p>
                    I never actually assessed the accuracy of the old system, but it seemed problematic. The weights would change from year to year, and the process of updating it was tedious and time consuming. As such, an update was required!
                </p>
            </section>
            <section className="mt-8 max-w-[65ch]">
                <h2>The New System</h2>

                <h3>The Weng-Lin (OpenSkill) Rating System</h3>
                <p>
                    IMPOWER uses the Weng-Lin rating system to assess teams. I use the Python implemenation, which can be found <a  className="text-red-400 hover:underline hover:text-blue-400 transition-colors" target="_blank" href="https://openskill.me/en/stable/">here</a>. I was having a hard time coming up with an easy way to describe the <a target="_blank" className="text-red-400 hover:underline hover:text-blue-400 transition-colors" href="https://www.jmlr.org/papers/v12/weng11a.html">Weng-Lin (OpenSkill) rating system</a>, so I just decided to ask ChatGPT. Here{"'"}s what it had to say:
                </p>
                <blockquote className="p-4 my-6 border-l-4 border-gray-300 text-base">
                    The Weng-Lin rating system is a statistical algorithm used to measure the skill levels of players in competitive gaming. It calculates a numerical rating based on a player{"'"}s win-loss record and the skill level of their opponents, and updates this rating after each match. The system also accounts for the uncertainty of a player{"'"}s skill level by using a confidence interval that widens or narrows depending on the amount of data available. The Weng-Lin system is used in several popular games and provides accurate and objective measures of player skill while considering the inherent uncertainty of competitive gaming.
                </blockquote>
                <p>I validated this for accuracy and overall it seems to capture many of the most important points. To summarize though:</p>
                <ul className="pl-4 list-disc list-inside">
                    <li>Every team has a rating</li>
                    <li>Every team is also given an uncertainty, that impacts how far they can move with any given win or loss</li>
                    <li>"Strength of schedule" plays a role (which, in previous metrics was hard to assess, as an Impact award win at an event with, say, 5 of the current top 10 teams would count as much as a win at an event where no team had ever won an outreach award)</li>
                </ul>
                <br/>
                <p>
                    An important note is that the rankings shown on the website aren{"'"}t the raw ratings. Rather, these are essentially ratings that are three standard deviations below the team{"'"}s average rating. This is done to prevent teams with very high uncertainty from dominating the rankings, and is pretty common in Weng-Lin systems (this can be thought of as there{"'"}s a 97% chance the team{"'"}s true rating is higher than the number shown on the site). However, this does mean that a team can have a higher current rating and still be ranked below another team, due to having a higher uncertainty.
                    <br/><br/>
                </p>
                <h3>Some Constraints and Problems</h3>
                <p>
                    The Weng-Lin system applied to the Chairman{"'"}s/Impact award is not perfect (although,
                    when it can predict the winner out of ~40 teams with ~33% accuracy, it{"'"}s pretty good).
                    There are a few things I had to assume. First, I assumed that the Chairman{"'"}s/Impact award
                    can be treated as "rank 1," while Engineering Inspiration can be treated as "rank 2." This
                    fact, while generally accepted by the FRC community, might not hold at every event. For regional and district
                    events, teams that are eligible for either Chairman{"'"}s/Impact or Engineering Inspiration are put into
                    the same pool. This means that a team that has won Chairman{"'"}s/Impact{"'"}s rating might decrease if 
                    they do not win EI at a competition at which they are eligible (and vice versa). This is not necessarily
                    ideal, but in my mind it was better than treating the two as separate competitions.
                    <br/><br/>
                </p>
                <p>
                    This problem is generally resolved at the District Championship and World Championship, levels, as
                    teams are separated into EI pools and Chairman{"'"}s/Impact pools. Chairman{"'"}s/Impact pools are run
                    before the EI pools, and the winners are removed from contention from EI before the EI pools are run.
                    <br/><br/>
                </p>
                <p>
                    Another problem with the rating system is that it is *very difficult* for the variances
                    to converge, without significantly more data (although, ratings have gotten significantly more accurate
                    since the data starts in 2017). This is largely due to the size of the competitions, and lack of differentiation
                    among teams (3 ranks for 40 teams when 38 of them share the same rank is not a lot of data). Again, this problem
                    improves at District Championships when there are generally fewer teams eligible for awards. 
                    <br/><br/>
                </p>
                <p>
                    The final problem I{"'"}ve come across is rookie teams. By default, all teams need to be added in at some ranking (I have the defaults of mu=25 and sigma=8.33). However,
                    due to the large number of teams that do not win Impact or EI regularly, this means rookies are added in at a very high ranking (around the 86th percentile, at time of writing).
                    This isn{"'"}t great, but it is better than not having them at all. I{"'"}m still working on a solution to this problem.
                    <br/><br/>
                </p>
            </section>
        </div>

    </div>

}