import Background from "./components/background";
import Header from "./components/header";

export default function About() {
    return(
        <div className={"min-h-screen"}>
            <Header></Header>
            <Background></Background>
            <div>
                <a href="." className={"font-bold text-8xl"}>About Ryan Nguyen</a>
            </div>
        </div>
    )
}