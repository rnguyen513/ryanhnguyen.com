import Background from "../components/background"
import Header from "../components/header"
import {NewBG3} from "./threejstest"
import { SparklesCore } from "@/components/ui/Sparkles"

export function MediaTitle({text, href}:{text:string, href: string}) {
    return(
        <a href={href} target="_blank" className={"text-white font-bold text-7xl sm:text-8xl hover:text-blue-400"}>{text} &rarr;</a>
    )
}

export default function Contact() {
    return(
        <div className={"relative flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            {/*<NewBG3></NewBG3>*/}
            {/*<Background></Background>*/}
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore background={"transparent"} maxSize={1} particleDensity={100} className="w-full h-full"></SparklesCore>
            </div>
            <div className={"flex flex-col flex-grow justify-center items-center z-10 pointer-events-none"}>
                <div className={"flex flex-col items-center pointer-events-auto"}>
                    <MediaTitle text="LinkedIn" href="https://www.linkedin.com/in/rnguyen2/"/>
                    <MediaTitle text="Email" href="mailto:rnguyen3372@gmail.com"/>
                    <MediaTitle text="GitHub" href="https://www.github.com/rnguyen513"/>
                </div>
            </div>
        </div>
    )
}