import Background from "./components/background"
import Header from "./components/header"

export default function Projects() {
    
    //let _projects;
    //GetProjects().then(asdf => _projects=asdf);

    //console.log(_projects);

    return(
        <div className={"relative min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <p className={"text-white"}>Projects...still working on it<br></br>{}</p>
        </div>
    )
}