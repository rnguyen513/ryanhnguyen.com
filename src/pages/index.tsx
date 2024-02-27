import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from "../components/header"
import Background from "../components/background"
import {NewBG3} from "./threejstest"
import ReactTyped from "react-typed"
import {TypeAnimation} from "react-type-animation"
import clientPromise from '../../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import React from 'react'
import Head from 'next/head'

import { SparklesCore } from '@/components/ui/Sparkles'

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

const inter = Inter({ subsets: ['latin'] })
export default function Home({isConnected}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  //<div className={"absolute bottom-0 right-0 h-15 w-15"}>
  //<p className={"font-bold text-white/50 text-sm"}>Background by: Osorina Irina</p>
  //</div>
  //<a className="flex sm:hidden">(click)</a><a className="hidden sm:flex">&rarr;</a>
  return (
    <>
    <Head>
      <meta name="description" content="I'm Ryan Nguyen, a CS undergrad at the University of Virginia. See my bio, resume and projects."/>
    </Head>
    <div className={"relative flex flex-row min-h-screen overflow-hidden"}>
      {/*<Background></Background>*/}
      {/*<NewBG3></NewBG3>*/}
      {/*<ReactTyped></ReactTyped>*/}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore background={"transparent"} maxSize={1} particleDensity={100} className="w-full h-full"></SparklesCore>
      </div>
      <div className={"relative flex flex-col flex-grow min-h-fit justify-center pointer-events-none"}>
        <a href="about" className={"group flex flex-row bg-gray-100/5 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-2xl ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-10 pb-14 hover:bg-gray-100/5 hover:ring-gray-300/5 pointer-events-auto font-bold text-8xl text-white drop-shadow-2xl dark:text-white-200"}>
          <TypeAnimation sequence={["Enter\nRyan\nNguyen →",5000,"",1000]} speed={25} repeat={Infinity}/>
          <TypeAnimation sequence={["Enter\nRyan\nNguyen →",5000,"",1000]} speed={25} repeat={Infinity} className={"absolute invisible group-hover:visible ml-1 mt-1 text-white/50"}/>
          {/*<p className={"font-bold text-8xl text-white drop-shadow-2xl dark:text-white-200"}>Enter<br></br>Ryan<br></br>Nguyen &rarr;</p>*/}
          {/*<p className={"absolute invisible group-hover:visible font-bold text-8xl ml-1 mt-1 text-white/50"}>Enter<br></br>Ryan<br></br>Nguyen &rarr;</p>*/}
        </a>
        <a href="https://www.linkedin.com/in/rnguyen2/" target="_blank" className={"group flex flex-row justify-center bg-gray-100/5 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-lg ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-5 pb-7 hover:bg-gray-100/5 hover:ring-gray-300/5 mt-5 pointer-events-auto"}>
          <p className={"font-bold text-2xl text-white drop-shadow-lg"}>Ryan&apos;s <code className={"group-hover:text-blue-400"}>LinkedIn</code> &#8599;</p>
        </a>
        <a href="https://github.com/rnguyen513/resume" target="_blank" className={"group flex flex-row justify-center bg-gray-100/5 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-lg ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-5 pb-7 hover:bg-gray-100/5 hover:ring-gray-300/5 mt-5 pointer-events-auto"}>
          <p className={"font-bold text-2xl text-white drop-shadow-lg"}>See the <code className={"group-hover:text-blue-400"}>$ource<b className={"text-sm"}> </b>code</code> &#8599;</p>
        </a>
      </div>
    </div>
    <div className="hidden sm:block absolute bottom-1 right-1 text-white text-s font-bold">
      <a>Database</a>
      {isConnected ? (<a className="text-s text-green-400 font-bold"> ⬤ Connected</a>):(<a className="text-s text-red-400 font-bold"> ⬤ Not Connected</a>)}
    </div>
    </>
  )
}