import { Button } from "@/components/ui/styledButtons";
import Link from "next/link";


export default async function Home() {

  const date = Date();

  return <div className="w-full flex items-center">
    <section className="w-full flex justify-center text-center px-8 items-center mt-10 sm:mt-24 mb-10">
      <div >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-300 p-3">A new take on Impact Power Ratings.</h1>
        <p className="mt-3">Combining principles from previous metrics with modern ranking systems, IMPOWER is able to predict the winner of events at a rate much higher than random.</p>

        <div className="mt-6">
          <Link href="/teams">
            <Button type="primary" className="mx-2 w-[200px] my-2">Explore Teams</Button>
          </Link>

          <Link href="/events">
            <Button type="secondary" className="mx-2 w-[200px] my-2">Explore Events</Button>
          </Link>

          <p className="text-xs mt-8">System updated: {date}</p>

        </div>
      </div>
    </section>


  </div>
}
