import Background from "./components/background"
import Header from "./components/header"

export default function Resume() {
    return(
        <div className={"min-h-screen"}>
            <Header></Header>
            <Background></Background>
            <div className={"w-100 flex flex-row justify-center"}>
                <object data="testpdf.pdf" type="application/pdf" width="80%" height="850px" className={"mt-5"}>
                    <p className={"font-2xl text-white font-bold"}>Unable to preview resume. <a href="https://www.github.com">View here </a>instead.</p>
                </object>
            </div>
        </div>
    )
}