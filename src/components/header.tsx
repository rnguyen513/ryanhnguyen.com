import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Button} from "@nextui-org/react"
import { GoogleIcon } from "./ui/GoogleIcon";

import {useSession, signIn, signOut} from "next-auth/react";

export function HeaderCell({text, href, props}:any) {
    return(
        <a href={href} className="font-bold md:text-xl text-white text-sm ml-5 md:ml-10 first:ml-0">{text}</a>
    )
}

export default function Header() {

    const {data, status} = useSession();

    return(
        <div className="flex flex-row justify-between bg-gray-100/5 ring-0 ring-gray-300/5 shadow-lg shadow-white/10 shadow-md text-white">
            <div className={"flex flex-row justify-start items-center h-14 pl-5 z-50"}>
                <div className="flex lg:hidden">
                    <Dropdown className="text-3xl font-bold" backdrop="blur">
                        <DropdownTrigger>
                            <Button variant="bordered" className="text-3xl">&equiv;</Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Static Actions" className="bg-gray-500/95 ring-2 ring-gray-300/50  rounded-lg font-extrabold text-white">
                            <DropdownItem key="rnguyen" href="/" className="font-bold">Ryan Nguyen</DropdownItem>
                            <DropdownItem key="about" href="about">About</DropdownItem>
                            <DropdownItem key="resume" href="resume">Resume</DropdownItem>
                            <DropdownItem key="projects" href="projects">Projects</DropdownItem>
                            <DropdownItem key="contact" href="contact">Contact</DropdownItem>
                            <DropdownItem key="reminders" href="reminders">Reminders</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="hidden lg:flex">
                    <HeaderCell href="/" text="Ryan Nguyen"></HeaderCell>
                    <HeaderCell href="about" text="About"></HeaderCell>
                    <HeaderCell href="resume" text="Resume"></HeaderCell>
                    <HeaderCell href="projects" text="Projects"></HeaderCell>
                    <HeaderCell href="contact" text="Contact"></HeaderCell>
                    <HeaderCell href="reminders" text="Reminders"></HeaderCell>
                </div>
            </div>
            <div className="flex flex-row items-center pr-5 font-bold text-white">
                {(status != "authenticated") ? ((status == "loading") ? (
                    <p>Loading...</p>
                ) : (
                    // <button onClick={() => signIn("google")}>Sign in with <a className="text-green-200">Google</a>!</button>
                    <div className="flex flex-row items-center px-2 py-1 rounded-lg border border-gray-200 hover:cursor-pointer" onClick={() => signIn("google")}>
                        <GoogleIcon/>
                        <p className="ml-2">Continue with Google</p>
                    </div>
                )) : (
                    <div className="flex flex-row items-center px-2 py-1 rounded-lg">
                        <img className="pr-2" src={data.user?.image ? (data.user?.image) : ("")} height="30" width="30"></img>
                        <p className="pr-2">{data.user?.name}</p>
                        <button onClick={() => signOut({redirect:false})} className="text-blue-200 rounded-lg px-2 py-1 bg-red-200/20">Sign out&rarr;</button>
                    </div>
                )}
            </div>
        </div>
    )
}