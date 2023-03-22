'use client';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Point {
    x: number
    y: number
}

export default function OrdinalDistributionChart({ data }: { data: Point[] }) {

    return <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart width={500} height={300} data={data}>
            <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey={"x"} />
            <YAxis width={60} />
            <Area type="monotone" dataKey="y" stroke="#60a5fa" fillOpacity={1} activeDot={{ r: 8 }} fill="url(#colorBlue)"  />
        </AreaChart>
    </ResponsiveContainer>
}