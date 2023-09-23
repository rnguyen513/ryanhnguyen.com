import { useEffect, useState } from "react"
import Background from "./components/background"
import Header from "./components/header"

const ProjTemplate = ({_proj}:{_proj:any}) => {
    return(
        <a href={_proj.html_url} target="_blank" className={"group flex flex-col ring-1 ring-gray-300/10 shadow-lg shadow-white/10 py-2 px-4 flex-col bg-gray-100/5 rounded-lg"}>
            <p className={"text-4xl group-hover:text-blue-400 mb-5"}>{_proj.name}</p>
            <p>{_proj.owner.login}</p>
            <p className={"text-yellow-200"}>{_proj.description}</p>
            <p className={"text-red-300"}>{_proj.language}</p>
            <p>Published: {_proj.created_at}</p>
        </a>
    )
}

//https://raw.githubusercontent.com/ryangu23/gmailnoti/main/README.md
//https://raw.githubusercontent.com/{user}/{repo}/{branch}/README.md

const Projects = () => {

    const [projects, setProjects] = useState([
        {id:123456789,
        name:"[name]",
        html_url:"[https://someurl.com]",
        description:"[some description]",
        language:"[language]",
        created_at:"[2022-02-07T10:15:14Z]",
        owner:{login:"[author]"}}
    ]);
    useEffect(() => {
        const getData = async () => {
            
            const query = await fetch("https://api.github.com/users/ryangu23/repos");
            const response = await query.json();
            setProjects(response);
        }
        getData();
    },[]);

    const thisProj = {
        name:"This website!",
        html_url:"https://github.com/rnguyen513/resume",
        description:"This website was built using Next.js and hosted on Vercel.",
        language:"Typescript, Javascript, CSS",
        created_at:"Present",
        owner:{login:"Ryan Nguyen"}
    }

    const [color, setColor] = useState("");
    useEffect(() => {
        setColor("hello");
    },[]);

    //title
    //author
    //description
    //language
    //createdAt

    return(
        <>
        <div className={"relative flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <div className={"flex flex-col flex-grow min-h-fit justify-center items-center text-white font-bold gap-y-5 mt-5 mb-5"}>
                <ProjTemplate _proj={thisProj}/>
                <p>Following projects were dumped via GITHUB API from an account I can&apos;t access anymore...can&apos;t change the names for now sorry...</p>
                {projects.map(project => <div key={project.name}><ProjTemplate _proj={project}></ProjTemplate></div>)}
            </div>
        </div>
        </>
    )
}

export default Projects