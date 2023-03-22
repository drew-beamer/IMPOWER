'use client';
import { TeamEvent } from "@/lib/types/team";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function TeamHistoryChart({ data }: { data: TeamEvent[] }) {

    return <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart width={500} height={300} data={data}>
            <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey={"end_date"} />
            <YAxis width={40} />
            <Tooltip />
            <Area type="monotone" dataKey="ordinal" stroke="#60a5fa" fillOpacity={1} activeDot={{ r: 8 }} fill="url(#colorBlue)"  />
        </AreaChart>
    </ResponsiveContainer>
}