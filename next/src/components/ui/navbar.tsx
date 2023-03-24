'use client';
import Link from "next/link";
import { MenuIcon } from "./icons";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "../logos/wordmark";

type Page = {
    name: string,
    url: string
}

const pages = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Teams",
        url: "/teams"
    },
    {
        name: "Events",
        url: "/events"
    },
    {
        name: "Analysis",
        url: "/analysis"
    }
]


export default function Navbar() {

    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {

        const closeOpenMenu = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', closeOpenMenu);
    }, [ref])

    const handleOpenChange = (event: React.MouseEvent) => {
        setOpen(!isOpen);
    }

    const list = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } }, exit: { transition: { staggerChildren: 0.1 } } }

    return <nav ref={ref} className="z-50 flex fixed">
        <AnimatePresence>
            {isOpen ? <motion.ul transition={{ ease: "easeOut", duration: 0.3 }} initial="hidden" animate="visible" exit="exit" variants={list} className="fixed w-full top-[55px] flex justify-center flex-wrap sm:hidden">
                {pages.map((page, index) => {
                    const item = { hidden: { y: -55, opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { opacity: 0 } }
                    return <motion.li key={page.name} variants={item} className="w-full flex bg-stone-50 justify-start border-t-[0.25px] items-center h-10 hover:bg-stone-200 hover:text-stone-700 transition-colors ease-in-out duration-300">
                        <Link onClick={() => setOpen(false)} className="w-full px-6 text-base" href={page.url}>{page.name}</Link>
                    </motion.li>
                })}
            </motion.ul> : null}
        </AnimatePresence>
        <div className="w-full h-[55px] bg-stone-50 backdrop-blur-7xl opacity-95 z-50 flex items-center fixed">

            <div className="flex items-center p-6 w-full">
                <div className="h-[25px] w-[123px]">
                    <Link href="/">
                        <div className="h-[25px] w-[123px]" onClick={() => setOpen(false)}>
                            <Wordmark />
                        </div>
                    </Link>
                </div>

                <div className="grow">
                </div>

                <div className="hidden sm:block">
                    <ul className="flex space-x-2">
                        {pages.map((page) => {
                            return <li key={page.name}>
                                <Link className="px-2 py-1 rounded-md hover:bg-stone-200 transition-colors ease-in-out duration-300 text-sm" href={page.url}>{page.name}</Link>
                            </li>
                        })}
                    </ul>
                </div>

                <div className="block sm:hidden" onClick={handleOpenChange}>
                    <MenuIcon className="fill-stone-900 hover:cursor-pointer" size={25} />
                </div>
            </div>


        </div>
    </nav>
}