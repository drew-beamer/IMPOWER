'use client'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { TeamOption } from '@/lib/types/team'
import { EventOption } from '@/lib/types/event'

export function TeamSelect({ teams }: { teams: TeamOption[] }) {
    const router = useRouter();
    return <Select options={teams} onChange={(value) => {
        if (value) {
            router.push("teams/" + value.value)
        }
    }} />
}

export function EventSelect({ events }: { events: EventOption[] }) {
    const router = useRouter();
    return <Select options={events} onChange={(value) => {
        if (value) {
            router.push("events/" + value.value)
        }
    }}/>
}