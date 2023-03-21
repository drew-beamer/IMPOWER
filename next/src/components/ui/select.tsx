'use client'

import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { TeamOption } from '@/lib/types/team'




export default function TeamSelect({ teams }: { teams: TeamOption[] }) {
    const router = useRouter();
    return <Select options={teams} onChange={(value) => {
        router.push("teams/" + value?.value)
    }}/>
}