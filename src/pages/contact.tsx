import Background from "./components/background"
import Header from "./components/header"

export function MediaTitle({text, href}:{text:string, href: string}) {
    return(
        <a href={href} target="_blank" className={"text-white font-bold text-7xl sm:text-8xl hover:text-blue-400"}>{text} &rarr;</a>
    )
}

export default function Contact() {
    return(
        <div className={"relative flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <div className={"flex flex-col flex-grow justify-center items-center"}>
                <div className={"flex flex-col items-center"}>
                    <MediaTitle text="LinkedIn" href="https://www.linkedin.com/in/rnguyen2/"></MediaTitle>
                    <MediaTitle text="Email" href="mailto:rnguyen3372@gmail.com"></MediaTitle>
                </div>
            </div>
        </div>
    )
}