import { useEffect, useState } from "react"
import Background from "./components/background"
import Header from "./components/header"

export type reminder = {
    _id: string,
    name: string,
    author: string,
    created: number,
    due: number,
    importance: number
}

export const toDateTime = (secs:number) => {
    return new Date(secs).toLocaleString("en-US", {timeZone:"EST"})
}

const ReminderTemplate = ({reminder}:{reminder:any}) => {
    return(
        <a href="https://www.google.com" target="_blank" className={"group flex flex-col ring-1 ring-gray-300/10 shadow-lg shadow-white/10 py-2 px-4 flex-col bg-gray-100/5 rounded-lg mr-2"}>
            <p className={"text-4xl group-hover:text-blue-400 mb-5"}>{reminder.name}</p>
            <p>{reminder.author}</p>
            <p className={"text-yellow-200"}>Importance: {reminder.importance}</p>
            <p className={"text-red-300"}>Due: {toDateTime(reminder.due)}</p>
            <p>Created: {toDateTime(reminder.created)}</p>
        </a>
    )
}

//https://raw.githubusercontent.com/ryangu23/gmailnoti/main/README.md
//https://raw.githubusercontent.com/{user}/{repo}/{branch}/README.md

const Projects = () => {

    const [reminders, setReminders] = useState([
        {_id: "[_id] 65ac578e01ed29334b261402",
        name: "[name] eggs",
        author: "[author] Ryan Nguyen",
        created: 1705793422035,
        due: 1705793426199,
        importance: 10}
    ]);

    useEffect(() => {
        const getData = async () => {
            
            const query = await fetch("../api/remindersapi");
            const response = await query.json();
            setReminders(response);
        }
        getData();
    },[]);

    /*
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

    */

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
            <p className="text-purple-400 font-bold text-3xl">Reminderz <a href="/" className="text-green-400">+</a></p>
            <div className={"flex flex-row flex-grow flex-wrap min-h-fit text-white font-bold gap-y-5 mt-5 mb-5"}>
                {/*<ReminderTemplate reminder={someReminder}/>*/}
                {reminders.map(reminder => <div key={reminder._id}><ReminderTemplate reminder={reminder}></ReminderTemplate></div>)}
            </div>
        </div>
        </>
    )
}

export default Projects