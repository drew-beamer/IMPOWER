import { ReactElement } from "react"

interface IconProps {
    size: number,
    className: string,
}


export function MenuIcon({ size, className } : IconProps) : ReactElement {

    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={className} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
    </div>
}