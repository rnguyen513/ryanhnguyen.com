import Background from "../components/background"
import Header from "../components/header"

export default function Resume() {
    return(
        <div className={"relative min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <div className={"w-100 flex flex-row justify-center"}>
                <object data="resume_8_10_24.pdf" type="application/pdf" width="95%" height="850px" className={"mt-5 ring-2 ring-gray-300/30 rounded-2xl shadow-lg shadow-white/20"}>
                    <p className={"font-2xl text-white font-bold"}>Unable to preview resume. <a href="https://www.github.com">View here </a>instead.</p>
                </object>
            </div>
        </div>
    )
}