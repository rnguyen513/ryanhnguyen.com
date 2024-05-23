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

//import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Button} from "@nextui-org/react"

import {useSession, signIn, signOut} from "next-auth/react";

export function HeaderCell({text, href, props}:any) {
    return(
        <a href={href} className="font-bold md:text-xl text-white text-sm ml-5 md:ml-10 first:ml-0">{text}</a>
    )
}

export default function Header(/*{isConnected}:InferGetServerSidePropsType<typeof getServerSideProps>*/) {

    const {data, status} = useSession();

    // return(
    //     <Navbar className="font-bold text-3xl w-100 h-10 bg-red-200">
    //         <NavbarBrand className="bg-purple-200">
    //             <Link color="foreground" href="/">Ryan Nguyen</Link>
    //         </NavbarBrand>
    //         <NavbarContent className="hidden sm:flex gap-4 bg-blue-200">
    //             <NavbarItem>
    //                 <Link color="foreground" href="about">About</Link>
    //             </NavbarItem>
    //             <NavbarItem>
    //                 <Link color="foreground" href="resume">Resume</Link>
    //             </NavbarItem>
    //             <NavbarItem>
    //                 <Link color="foreground" href="projects">Projects</Link>
    //             </NavbarItem>
    //             <NavbarItem>
    //                 <Link color="foreground" href="contact">Contact</Link>
    //             </NavbarItem>
    //             <NavbarItem>
    //                 <Link href="reminders">Reminders</Link>
    //             </NavbarItem>
    //         </NavbarContent>
    //         <NavbarContent className="bg-green-200">
    //             <NavbarItem>
    //                 <Button onClick={() => signIn("google")} color="primary" variant="flat">Sign In</Button>
    //             </NavbarItem>
    //         </NavbarContent>
    //     </Navbar>
    // )

    return(
        <div className="flex flex-row justify-between bg-gray-100/5 ring-0 ring-gray-300/5 shadow-lg shadow-white/10 shadow-md">
            <div className={"flex flex-row justify-start items-center h-14 pl-5 z-50"}>
                <div className="flex lg:hidden">
                    <Dropdown className="text-3xl font-bold" backdrop="blur">
                        <DropdownTrigger>
                            <Button variant="bordered" className="text-3xl">&equiv;</Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Static Actions" className="bg-gray-500/95 ring-2 ring-gray-300/50 shadow-lg shadow-white/40 rounded-lg font-bold">
                            <DropdownItem key="rnguyen" href="/">Ryan Nguyen</DropdownItem>
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
                    <button onClick={() => signIn("google")}>Sign in with <a className="text-green-200">Google</a>!</button>
                )) : (
                    <>
                        <p className="pr-2">{data.user?.name}</p>
                        <img className="pr-2" src={data.user?.image ? (data.user?.image) : ("")} height="20" width="20"></img>
                        <button onClick={() => signOut({redirect:false})} className="text-blue-200">Sign out&rarr;</button>
                    </>
                )}
            </div>
        </div>
    )
}