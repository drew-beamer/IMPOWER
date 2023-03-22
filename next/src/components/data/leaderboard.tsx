'use client';
import { Team } from "@/lib/types/team";
import Link from "next/link";
import { useState, useEffect } from "react";

const calculateRange = (length: number, rowsPerPage: number): number[] => {
    const range = []
    const num = Math.ceil(length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i)
    }
    return range;
}

const sliceData = (data: Team[], page: number, rowsPerPage: number) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

const useTable = (data: Team[], page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<Team[]>([]);

    useEffect(() => {
        const range = calculateRange(data.length, rowsPerPage);
        setTableRange([...range]);

        const slice = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice, range: tableRange };
}

function colorFromPercentile(percentile: number): string {
    if (percentile >= 99) {
        return "bg-green-500 text-stone-100"
    } else if (percentile >= 90) {
        return "bg-green-300"
    } else if (percentile >= 75) {
        return "bg-green-100"
    } else if (percentile <= 1) {
        return "bg-red-500 text-stone-100"
    }
    else if (percentile <= 10) {
        return "bg-red-300"
    } else if (percentile <= 25) {
        return "bg-red-100"
    } else {
        return "bg-stone-50"
    }
}

const TableFooter = ({ range, setPage, page, slice }: { range: number[], setPage: (page: number) => void, page: number, slice: Team[] }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1)
        }
    }, [slice, page, setPage]);

    const buttonClasses = `w-8 h-8 p-2 flex mx-1 justify-center items-center rounded-md transition-colors border-stone-50 hover:bg-blue-400 hover:text-stone-50 hover:border-2 hover:border-blue-400`

    return <div className="flex-wrap flex justify-center text-lg">
        <button className={buttonClasses} key={"fullLeft"} onClick={() => setPage(1)}>{"<<"}</button>
        <button className={buttonClasses} key={"left"} onClick={() => setPage(page === 1 ? 1 : page - 1)}>{"<"}</button>
        <button className={buttonClasses} key={"right"} onClick={() => setPage(page === range.length ? range.length : page + 1)}>{">"}</button>
        <button className={buttonClasses} key={"fullRight"} onClick={() => setPage(range.length)}>{">>"}</button>
    </div>
}

export default function TeamLeaderboard({ data }: { data: Team[] }) {


    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);


    const { slice, range } = useTable(data, page, rowsPerPage);

    return <div>
        <div className="relative overflow-x-auto mt-6 z-0">


            <table className="w-full text-sm text-left px-6">
                <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Rank
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 flex justify-end">
                            Power
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice ? slice.map((team: Team, index) => {
                        return <tr key={team.key} className="border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {team.rank !== undefined ? team.rank + 1 : null}
                            </th>
                            <td className="px-6 py-4">
                                <Link href={`/teams/${team.key.substring(3)}`}>{team.key.substring(3)}</Link>
                            </td>
                            <td className="px-6 py-4 ">
                                <Link href={`/teams/${team.key.substring(3)}`}>{team.name}</Link>
                            </td>
                            <td className={`px-6 py-4 flex justify-end align-middle`}>
                                <div className={"p-2 w-12 text-center rounded-md " + colorFromPercentile(team.percentile ? team.percentile : 50)}>
                                    {team.current_ordinal ? (Math.round(team.current_ordinal * 100) / 100).toFixed(2) : null}
                                </div>

                            </td>
                        </tr>
                    }) : null}

                </tbody>
            </table>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center mt-2">
            {data.length > rowsPerPage ? <TableFooter range={range} setPage={setPage} slice={slice} page={page} /> : null}
            <div className="mx-8">
                <label className="text-xs mx-2">Rows per Page</label>
                <select className=" bg-stone-50 border border-stone-900 rounded-md" onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    </div>
}