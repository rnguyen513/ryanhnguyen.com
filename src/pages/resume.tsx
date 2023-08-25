import Background from "./components/background"
import Header from "./components/header"

export default function Resume() {
    return(
        <div className={"min-h-screen"}>
            <Header></Header>
            <Background></Background>
            <p>Resume</p>
            <object data="/testpdf.pdf" type="application/pdf" width="100%" height="500px">
                <p>Unable to preview resume. <a href="https://www.github.com">View here </a>instead.</p>
            </object>
        </div>
    )
}