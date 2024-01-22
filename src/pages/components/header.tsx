/*
import clientPromise from "../../../lib/mongodb"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"

export type ConnectionStatus = {
    isConnected: boolean;
}

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
    try {
        await clientPromise;

        return {
            props: {isConnected: true}
        };
    }
    catch (e) {
        console.error(e);
        return {
            props: {isConnected: false}
        };
    }
}

*/

export function HeaderCell({text, href}:{text: string, href: string}) {
    return(
        <a href={href} className="font-bold md:text-xl text-white text-sm ml-5 md:ml-10 first:ml-0">{text}</a>
    )
}

export default function Header(/*{isConnected}:InferGetServerSidePropsType<typeof getServerSideProps>*/) {
    return(
        <div className="flex flex-row justify-between bg-gray-100/5 ring-0 ring-gray-300/5 shadow-lg shadow-white/10 shadow-md">
            <div className={"flex flex-row justify-start items-center justify-start h-14 pl-5 z-50"}>
                <HeaderCell href="/" text="Ryan Nguyen"></HeaderCell>
                <HeaderCell href="about" text="About"></HeaderCell>
                <HeaderCell href="resume" text="Resume"></HeaderCell>
                <HeaderCell href="projects" text="Projects"></HeaderCell>
                <HeaderCell href="contact" text="Contact"></HeaderCell>
            </div>
        </div>
    )
}