import { createRef, useRef, useEffect, useState } from "react"
import Background from "./components/background"
import Header from "./components/header"
import { ProgressBar } from "react-bootstrap"
import RemindAPIReq from "./api/remindersapi"

export type reminder = {
    _id: string,
    name: string,
    author: string,
    created: number,
    due: number,
    importance: number
}

export const toDateTime = (ms:number) => {

    /*
    let a = new Date(ms);
    let year = a.getFullYear();
    let month = a.getMonth() + 1;
    let date = a.getDate() + 1;

    return(month + "/" + date + "/" + year);
    */

    return new Date(ms).toLocaleString("en-US", {timeZone:"EST"});
}

export const toUnix = (dateString:string) => {
    return Math.floor(new Date(dateString).getTime());
}

const ReminderTemplate = ({reminder}:{reminder:any}) => {
    let [percentDone, setPercentDone] = useState((Date.now()-reminder.created)/(reminder.due - reminder.created));

    const progressStyle = (percent:number) => {
        if (percent >= 0.75) return "success";
        else if (percent >= 0.25 && percent < 0.75) return "warning";
        else return "danger";
    }

    //console.log(reminder.name + " is " + (1-percentDone) + " to being finished");

    return(
        <a href="https://www.google.com" target="_blank" className={"group flex flex-col ring-1 ring-gray-300/10 shadow-lg shadow-white/10 py-2 px-4 flex-col bg-gray-100/5 rounded-lg mr-2"}>
            <p className={"text-4xl group-hover:text-blue-400 mb-2"}>{reminder.name}</p>
            <p>{reminder.author}</p>
            <p className={"text-yellow-200"}>Importance: {reminder.importance}</p>
            <p className={"text-red-300"}>Due: {toDateTime(parseInt(reminder.due))}</p>
            <p>Created: {toDateTime(reminder.created)}</p>
            {/*<ProgressBar animated variant={progressStyle(66)} now={66}></ProgressBar>*/}
            {(percentDone >= 1) ? (<p>Expired!</p>) : (<progress value={(1-percentDone)} className="w-full bg-gray-200 rounded-full h-2.5 color-purple-400"></progress>)}
        </a>
    )
}

export function AddRemindUI({isActive, onShow, refreshList, updateRemindersCallback}:any) {

    const [name, setName] = useState("");
    const [due, setDue] = useState(0);
    const [importance, setImportance] = useState(0);
    const [key, setKey] = useState(0);

    const [allValid, setAllValid] = useState(true);

    const handleSubmit = async ({_reminder, _due, _importance, _key}:any) => {
        console.log(_reminder, _due, _importance, _key);
        try {
            //post request
            const request = await fetch("../api/remindersapi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: _reminder,
                    due: _due,
                    importance: _importance,
                    key: _key,
                    reqType: "push"
                })
            });

            if (request.ok) {/*console.log("pushed", String(_reminder));*/}
            else console.log("failed to push reminder");

            console.log(request);

            return request
        }
        catch (e) {
            console.error("POST error:", e);
        }
    }

    const checkFieldValid = ({fieldValue, fieldType, fieldStateSetter}:any) => {
        setReqError({code:0,message:""});
        if (fieldValue.length != "" && typeof fieldValue == fieldType) {fieldStateSetter(fieldValue);return true;}
        else {console.log("errors in input");setAllValid(false);return false}
    }

    const [reqError, setReqError] = useState({code:0,message:""});
    const showError = (error:string) => {
        return(
            <>
                {<a className="text-red-400 font-bold text-xl">{error}</a>}
            </>
        )
    }

    return(
        <>
        {isActive ? (
            <div className="absolute h-4/5 w-3/5 left-20 top-20 bg-purple-100 ring-1 ring-gray-300/10 rounded-lg shadow-lg shadow-white/10 font-bold">
                <div className="flex flex-col items-center justify-around h-full rounded-lg text-black">
                    <h1 className="text-blue-400 text-3xl">Add the mf!</h1>
                    <input type="text" placeholder="reminder" onChange={(e) => checkFieldValid({fieldValue:e.target.value,fieldType:"string",fieldStateSetter:setName})}></input>
                    <div>
                        <p>due</p>
                        <input type="date" placeholder="05/06/2024" onChange={(e) => checkFieldValid({fieldValue:toUnix(e.target.value),fieldType:"number",fieldStateSetter:setDue})}></input>
                    </div>
                    <input type="number" placeholder="importance" onChange={(e) => checkFieldValid({fieldValue:Number(e.target.value),fieldType:"number",fieldStateSetter:setImportance})}></input>
                    <input type="number" placeholder="password" onChange={(e) => {checkFieldValid({fieldValue:Number(e.target.value),fieldType:"number",fieldStateSetter:setKey})}}></input>

                    {/*if error from user/server*/}
                    {(!allValid || reqError.code) ? (
                        <div>
                            {allValid ? (null) : (<p className="text-red-400 font-bold text-xl">INVALID! cancel and try again...</p>)}
                            {reqError.code ? (<p>{showError(reqError.message)}</p>) : (null)}
                        </div>
                    ) : (null)}

                    <div className="flex-row">
                        {/*close button*/}
                        <button className="ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                            onShow();
                            setAllValid(true);

                            //reset
                            setName("");
                            setDue(0);
                            setImportance(0);
                            setKey(0);

                        }}>close</button>

                        {/*submit button*/}
                        <button className="ring-1 ring-black rounded-lg p-3 bg-green-200" onClick={() => {
                            if (!allValid) {console.log("one or more fields invalid, aborting");return;}

                            //recheck
                            if (
                                !checkFieldValid({fieldValue:name,fieldType:"string",fieldStateSetter:setName}) ||
                                !checkFieldValid({fieldValue:due,fieldType:"number",fieldStateSetter:setDue}) ||
                                !checkFieldValid({fieldValue:importance,fieldType:"number",fieldStateSetter:setImportance}) ||
                                !checkFieldValid({fieldValue:key,fieldType:"number",fieldStateSetter:setKey})
                            ) {return}

                            //at this point, request should be valid (hopefully)
                            //post to database
                            const reqResult = handleSubmit({_reminder: name, _due: due, _importance: importance, _key: key})
                                .then(res => res?.json()
                                    .then(data => ({status: res.status, body: data})))
                                .then(obj => {
                                    console.log("response from server:", obj);
                                    if (obj?.status != 200) {
                                        setReqError({code: Number(obj?.status), message: obj?.body.message});
                                        return;
                                    }
                                    else {
                                        //success! refresh list
                                        updateRemindersCallback(obj.body);
                                        //refreshList();
                                        onShow();

                                        setName("");
                                        setDue(0);
                                        setImportance(0);
                                        setKey(0);
                                    }
                                });
                            //console.log(reqResult);

                            //if reqResult OK, continue otherwise halt-----
                            
                            //reset
                            //setName("");
                            //setDue(0);
                            //setImportance(0);
                            //setKey(0);

                            //onShow();

                            //change seed (state) of reminder list so that it refreshes and includes new reminder

                            //refreshList();

                            //reload page to upate list
                            //window.location.reload();
                        }}>submit</button>

                    </div>
                </div>
            </div>) : (/*() => setAllValid(true) <p className="absolute left-20 text-red-400 font-bold">NOT ACTIVE</p>*/null)
        }
        </>
    )
}

//https://raw.githubusercontent.com/ryangu23/gmailnoti/main/README.md
//https://raw.githubusercontent.com/{user}/{repo}/{branch}/README.md

const Reminderz = () => {

    /*
    const [reminders, setReminders] = useState([
        {_id: "[_id] 65ac578e01ed29334b261402",
        name: "[name] eggs",
        author: "[author] Ryan Nguyen",
        created: 1705793422035,
        due: 1705793426199,
        importance: 10}
    ]);
    */

    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const query = await fetch("../api/remindersapi");
            const response = await query.json();
            setReminders(response);
        }
        getData();
    },[]);

    const makeReminders = (reminders:any) => {
        return (
            <>
                {reminders.map((reminder:any) => <div key={reminder._id}><ReminderTemplate reminder={reminder}></ReminderTemplate></div>)}
            </>
        )
    }

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

    const [isActive, setIsActive] = useState(false);

    const [seed, setSeed] = useState(1);
    const refreshFetch = () => {
        setSeed(Math.random());
    }

    const handleReminderUpdateCallback = (reminders:any) => {
        setReminders(reminders);
    }

    return(
        <>
        <div className={"relative flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <p className="text-purple-400 font-bold text-3xl ml-2">Reminderz <button className="text-green-400" onClick={() => setIsActive(!isActive)}>&#40;+Add&#41;</button></p>
            <div key={seed} className={"flex flex-row flex-grow flex-wrap justify-between min-h-fit text-white font-bold gap-y-5 ml-2 mt-2 mb-5"}>
                {/*<ReminderTemplate reminder={someReminder}/>*/}
                {reminders.length ? (
                    <>
                        {makeReminders(reminders)}
                    </>
                ) : (<p className="text-red-400 text-lg">NO REMINDERS</p>)}
            </div>
            <AddRemindUI isActive={isActive} onShow={() => setIsActive(!isActive)} refreshList={() => refreshFetch()} updateRemindersCallback={handleReminderUpdateCallback}></AddRemindUI>
        </div>
        </>
    )
}

/*
export const getServerSideProps = async () => {
    const reminders = await RemindAPIReq({method:"GET"},{});
}
*/

export default Reminderz;