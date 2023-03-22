import Link from "next/link"

interface StyledButtonProps {
    type?: "primary" | "secondary"
    children: string | JSX.Element | JSX.Element[]
    className?: string,
    filled?: boolean
}
11
export function Button({ children, type, className, filled }: StyledButtonProps) {

    if (type === undefined) {
        type = "primary";
    }

    const theming = type === "primary" ? `${filled ? "bg-blue-400 outline-blue-400 hover:shadow-lg text-stone-50" : "outline-blue-400 hover:bg-blue-400 text-blue-400"}` : `outline-red-400 hover:bg-red-400 text-red-400`;


    return <button className={`font-semibold outline outline-1 shadow-inner-xl hover:text-stone-50 ${theming} ${className} p-2 rounded-full transition-all duration-300`}>{children}</button>
}
