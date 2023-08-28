import { useEffect, useState } from "react"
import Background from "./components/background"
import Header from "./components/header"

const Projects = () => {

    const [projects, setProjects] = useState([
        {id:123456789,
        name:"name",
        html_url:"https://someurl.com",
        description:"some description",
        language:"HTML",
        created_at:"2022-02-07T10:15:14Z",
        owner:{login:"someperson"}}
    ]);
    useEffect(() => {
        const getData = async () => {
            
            const query = await fetch("https://api.github.com/users/ryangu23/repos");
            const response = await query.json();
            setProjects(response);
        }
        getData();
    },[]);

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
            <div className={"flex flex-col flex-grow min-h-fit justify-center items-center text-white font-bold gap-y-5"}>
                {projects.map(project => <a href={project.html_url} className={"group flex ring-1 ring-gray-300/10 py-2 px-4 flex-col bg-gray-100/10 rounded-lg hover:text-blue-400"}>
                    {project.name}
                </a>)}
            </div>
        </div>
        </>
    )
}

export default Projects