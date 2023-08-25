import Header from "./components/header"

export default function Resume() {
    return(
        <div className={"bg-green-200 min-h-screen overflow-hidden"}>
            <Header></Header>
            <p>Resume</p>
            <div className={"min-h-screen bg-black"}></div>
        </div>
    )
}