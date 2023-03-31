'use client';
import { RegionData } from "@/lib/types/region";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";



export default function RegionalBar({ data }: { data: RegionData[] }) {
    data.sort((a, b) => (a.statistic > b.statistic) ? -1 : 1)
    return <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart width={500} height={300}  data={data} margin={{ top: 20, right: 0, bottom: 20, left: 0 }} >
            <XAxis dataKey={"state"} hide/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="statistic" fill="#60a5fa" />
        </BarChart>
    </ResponsiveContainer>
}