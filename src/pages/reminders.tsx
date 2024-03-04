import { createRef, useRef, useEffect, useState, Suspense } from "react";
import Background from "../components/background";
import Header from "../components/header";
import { Progressbar } from "../components/progressbar";
import Head from "next/head";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Loading from "./loading";
import { Checkbox } from "@nextui-org/react";

import {useSession, signIn, signOut} from "next-auth/react";

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

const ReminderTemplate = ({reminder, showDeleteUI}:any) => {

    let createdAt = new Date(reminder.created);

    if (reminder.name.split(" ")[0].toUpperCase() == "TEST") {
        console.log("percent done for", reminder.name, ":", ((new Date(Date.now()).getTime() - createdAt.getTime())/(new Date(reminder.due).getTime() - createdAt.getTime())));
    }

    let [percentDone, setPercentDone] = useState((new Date(Date.now()).getTime() - createdAt.getTime())/(new Date(reminder.due).getTime() - createdAt.getTime()));

    // const progressStyle = (percent:number) => {
    //     if (percent >= 0.75) return "success";
    //     else if (percent >= 0.25 && percent < 0.75) return "warning";
    //     else return "danger";
    // }

    let displayDate = new Date(reminder.due);

    let displayHours = displayDate.getUTCHours() % 12 || displayDate.getUTCHours();
    let displayMinutes = displayDate.getUTCMinutes();

    //update progress in real time
    useEffect(() => {
        setTimeout(() => {
            setPercentDone((new Date(Date.now()).getTime() - createdAt.getTime())/(new Date(reminder.due).getTime() - createdAt.getTime()));
        },200);
    });

    return(
        <a className={`group relative flex flex-col ring-1 ring-gray-300/10 shadow-lg shadow-white/10 py-2 px-4 flex-col bg-gray-100/5 rounded-lg mr-2`}>
            <button style={{backgroundColor: `${(reminder.color != "#FF0000" && reminder.color != null) ? (reminder.color) : ("")}`}} className={`text-4xl hover:text-red-400 mb-2 rounded-lg p-1`} onClick={() => showDeleteUI([true, reminder._id])}>{reminder.name}</button>
            <p>{reminder.author}</p>
            <p className={"text-yellow-200"}>Importance: {reminder.importance}</p>
            {/*<p className={"text-red-300"}>Due: {displayDate.toLocaleDateString()}, {displayHours ? (displayHours) : ("--")}:{displayMinutes ? (displayMinutes < 10 ? ("0" + displayMinutes) : (displayMinutes)) : ("--")} {displayDate.getUTCHours() < 12 ? ("AM") : ("PM")}</p>*/}
            <p className="text-red-300">Due: {displayDate.toLocaleDateString()}, {displayDate.toLocaleTimeString()}</p>
            <p>Created: {toDateTime(reminder.created)}</p>
            {/*<ProgressBar animated variant={progressStyle(66)} now={66}></ProgressBar>*/}
            {(percentDone >= 1 || percentDone < 0) ? (<p className="text-purple-400">Expired!</p>) : (<Progressbar width={(1-percentDone)*100}></Progressbar>)}
            {/*<button className="absolute top-12 right-12 text-red-400 text-3xl" onClick={()=>{console.log("hello from", reminder._id);showDeleteUI([true, reminder._id])}}>x</button>*/}
        </a>
    )
}

export const handleSubmit = async ({_reminder, _due, _importance, _key, _color, _author, _authorEmail, _reqType, __id, _created}:any) => {
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
                color: _color,
                author: _author,
                authorEmail: _authorEmail,
                reqType: _reqType,
                _id: __id,
                created: _created
            })
        });

        if (request.ok) {/*console.log(_reqType, _reminder)*/}
        else console.log("error: failed to", _reqType, _reminder);

        return request;
    }
    catch (e) {
        return console.error("POST ERROR", e);
    }
}

export function AddRemindUI({isActive, onShow, updateRemindersCallback}:any) {

    const [name, setName] = useState("");
    const [due, setDue] = useState(new Date("2024-02-29"));
    const [importance, setImportance] = useState(0);
    const [key, setKey] = useState(0);
    const [color, setColor] = useState("#FF0000");

    const [allValid, setAllValid] = useState(true);

    const checkFieldValid = ({fieldValue, fieldType, fieldStateSetter}:any) => {
        console.log(fieldValue, typeof fieldValue);
        setReqError({code:0,message:""});
        if (fieldValue.length != "" && typeof fieldValue == fieldType) {fieldStateSetter(fieldValue);return true;}
        else {console.log("errors in input, got", fieldValue, "for", fieldType);setAllValid(false);return false}
    }

    const [reqError, setReqError] = useState({code:0,message:""});
    const showError = (error:string) => {
        return(
            <>
                {<a className="text-red-400 font-bold text-xl">{error}</a>}
            </>
        )
    }

    const {data, status} = useSession();

    return(
        <>
        {isActive ? (
            <div className="fixed h-200 w-3/5 left-20 top-20 bg-gray-200 ring-4 ring-black rounded-lg shadow-lg shadow-white/10 font-bold">
                {status == "authenticated" ? (
                    <div className="flex flex-col items-center justify-around h-full rounded-lg text-black">
                        <h1 className="text-blue-400 text-3xl">Add remind</h1>
                        <p>author: {data?.user?.name}, {data?.user?.email}</p>
                        <input type="text" placeholder="reminder" onChange={(e) => checkFieldValid({fieldValue:e.target.value,fieldType:"string",fieldStateSetter:setName})} className="m-1 ring-1 ring-black rounded-lg"></input>
                        <div>
                            <p>due</p>
                            <input type="date" placeholder="05/06/2024" onChange={(e) => {

                                let inputDate = new Date(e.target.value)
                                inputDate.setDate(inputDate.getDate()+1)

                                checkFieldValid({fieldValue:(inputDate),fieldType:"object",fieldStateSetter:setDue})

                            }} className="m-1 ring-1 ring-black rounded-lg"></input>
                            <input type="time" onChange={(e) => {
                                let time = e.target.value.split(":")
                                let hours = parseInt(time[0]); let minutes = parseInt(time[1])
                                // if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                                //     setDue(new Date(due.setUTCHours(hours, minutes)))
                                // }
                                setDue(new Date(due.setHours(hours, minutes))) //setHours() vs setUTCHours()

                                console.log(due.toUTCString())
                                //console.log(due)
                            }} className="m-1 ring-1 ring-black rounded-lg"></input>
                        </div>
                        <input type="number" placeholder="importance" onChange={(e) => checkFieldValid({fieldValue:Number(e.target.value),fieldType:"number",fieldStateSetter:setImportance})} className="m-1 ring-1 ring-black rounded-lg"></input>
                        {/*<input type="number" placeholder="password" onChange={(e) => {checkFieldValid({fieldValue:Number(e.target.value),fieldType:"number",fieldStateSetter:setKey})}}></input>*/}
                        <div className="flex-row">
                            <p>color &#40;optional&#41;:</p>
                            <input type="color" onChange={(e) => checkFieldValid({fieldValue:e.target.value,fieldType:"string",fieldStateSetter:setColor})}></input>
                        </div>

                        {/*if error from user/server*/}
                        {(!allValid || reqError.code) ? (
                            <div className="px-5">
                                {allValid ? (null) : (<p className="text-red-400 font-bold text-xl">INVALID! cancel and try again...</p>)}
                                {reqError.code ? (<p>{showError(reqError.message)}</p>) : (null)}
                            </div>
                        ) : (null)}

                        <div className="flex-row">
                            {/*close button*/}
                            <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                                onShow();
                                setAllValid(true);

                                //reset
                                setName("");
                                setDue(new Date("2024-02-29"));
                                setImportance(0);
                                setKey(0);
                                setColor("#FF0000");
                                console.log(data);
                            }}>close</button>

                            {/*submit button*/}
                            <button className="ring-1 ring-black rounded-lg p-3 bg-green-200" onClick={() => {
                                if (!allValid) {console.log("one or more fields invalid, aborting");return;}

                                //recheck
                                if (
                                    !checkFieldValid({fieldValue:name,fieldType:"string",fieldStateSetter:setName}) ||
                                    !checkFieldValid({fieldValue:due,fieldType:"object",fieldStateSetter:setDue}) ||
                                    !checkFieldValid({fieldValue:importance,fieldType:"number",fieldStateSetter:setImportance}) ||
                                    /*!checkFieldValid({fieldValue:key,fieldType:"number",fieldStateSetter:setKey}) ||*/
                                    !checkFieldValid({fieldValue:color,fieldType:"string",fieldStateSetter:setColor})
                                ) {return}

                                //at this point, request should be valid (hopefully)
                                //post to database
                                const reqResult = handleSubmit({_reminder: name, _due: due, _importance: importance, _key: key, _color: color, _author: data?.user?.name, _authorEmail: data?.user?.email, _reqType: "PUSH"})
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
                                            setDue(new Date("2024-02-29"));
                                            setImportance(0);
                                            setKey(0);
                                            setColor("#FF0000");
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
                            <div className="m-5 p-5 bg-black rounded-lg text-white">
                                <ReminderTemplate reminder={{name:(name || "[new reminder]"),due:due,importance:importance,color:color,author:data?.user?.name,created:Date.now()}} showDeleteUI={()=>{}}></ReminderTemplate>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-black font-bold p-5">sign in to add!</p>
                        <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                            onShow();
                            setAllValid(true);

                            //reset
                            setName("");
                            setDue(new Date("2024-02-29"));
                            setImportance(0);
                            setKey(0);
                            setColor("#FF0000");
                        }}>close</button>
                    </>
                )}
            </div>) : (/*() => setAllValid(true) <p className="absolute left-20 text-red-400 font-bold">NOT ACTIVE</p>*/null)
        }
        </>
    )
}

export function AddDeleteUI({isActive, onShow, updateRemindersCallback, reminder}:any) {
    const [key, setKey] = useState(0);

    const [allValid, setAllValid] = useState(true);

    const checkFieldValid = ({fieldValue, fieldType, fieldStateSetter}:any) => {
        setReqError({code:0,message:""});
        if (fieldValue.length != "" && typeof fieldValue == fieldType) {fieldStateSetter(fieldValue);return true;}
        else {console.log("errors in input");setAllValid(false);return false}
    }

    //if push request error then display error
    const [reqError, setReqError] = useState({code:0,message:""});
    const showError = (error:string) => {
        return(
            <>
                {<a className="text-red-400 font-bold text-xl">{error}</a>}
            </>
        )
    }

    useEffect(() => {
        console.log("reminder to delete has changed to", reminder?.name);
        setReqError({code:0,message:""});
    },[reminder])

    const {data, status} = useSession();

    return(
        <>
        {isActive ? (
            <div className="fixed h-80 w-3/5 left-20 top-20 bg-white ring-4 ring-gray-300/10 rounded-lg shadow-lg shadow-white/10 font-bold">
                {status == "authenticated" ? (
                    <div className="flex flex-col items-center justify-around h-full rounded-lg text-black">
                        <h1 className="text-red-400 text-3xl">delete {reminder.name}</h1>

                        <p>author: {reminder.authorEmail}</p>
                        <p>Due: {toDateTime(reminder.due)}</p>
                        <p>Importance: {reminder.importance}</p>
                        <p>Created: {toDateTime(reminder.created)}</p>

                        {/*<input type="number" placeholder="password" onChange={(e) => {checkFieldValid({fieldValue:Number(e.target.value),fieldType:"number",fieldStateSetter:setKey})}}></input>*/}

                        {/*if error from user/server*/}
                        {(!allValid || reqError.code) ? (
                            <div className="px-5">
                                {allValid ? (null) : (<p className="text-red-400 font-bold text-xl">INVALID! cancel and try again...</p>)}
                                {reqError.code ? (<p>{showError(reqError.message)}</p>) : (null)}
                            </div>
                        ) : (null)}

                        <div className="flex-row">
                            {/*close button*/}
                            <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                                onShow();
                                setAllValid(true);
                                setReqError({code: 0, message:""});
                            }}>close</button>

                            {/*submit button*/}
                            <button className="ring-1 ring-black rounded-lg p-3 bg-green-200" onClick={() => {
                                if (!allValid) {console.log("one or more fields invalid, aborting");return;}

                                //recheck
                                /*
                                if (
                                    !checkFieldValid({fieldValue:key,fieldType:"number",fieldStateSetter:setKey})
                                ) {return}
                                */

                                //at this point, request should be valid (hopefully)
                                //post to database
                                const reqResult = handleSubmit({_reminder: reminder.name, _due: reminder.due, _importance: reminder.importance, _key: key, _color: reminder.color, _author: reminder.author, _authorEmail: data?.user?.email, _reqType: "DELETE", __id: reminder._id, _created: reminder.created})
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

                                            //close UI
                                            onShow();
                                        }
                                    });
                            }}>delete!</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-black font-bold p-5">sign in to delete {reminder.name}!</p>
                        <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                            onShow();
                            setAllValid(true);
                            setReqError({code: 0, message:""});
                        }}>close</button>
                    </>
                )}
            </div>) : (null)
        }
        </>
    )
}

//https://raw.githubusercontent.com/ryangu23/gmailnoti/main/README.md
//https://raw.githubusercontent.com/{user}/{repo}/{branch}/README.md

const Reminderz = ({_reminders}:any) => {

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

    const [reminders, setReminders] = useState(_reminders);

    const makeReminders = ({reminders, showDeleteUI}:any) => {
        return (
            <>
                {reminders.map((reminder:any) => <div key={reminder._id}><ReminderTemplate reminder={reminder} showDeleteUI={showDeleteUI}></ReminderTemplate></div>)}
            </>
        )
    }

    /* still dont know how useeffect works lol
    const [color, setColor] = useState("");
    useEffect(() => {
        setColor("hello");
    },[]);
    */

    //FOR PUSH UI
    const [isActive, setIsActive] = useState(false);

    //FOR DELETE UI
    const [deleteIsActive, setDeleteIsActive] = useState([false, "65b3d063030029e415df93d3"]);

    const [seed, setSeed] = useState(1);
    const refreshFetch = () => {
        setSeed(Math.random());
    }

    const handleReminderUpdateCallback = (reminders:any) => {
        setReminders(reminders);
    }

    const [showMine, setShowMine] = useState(false);

    const {data, status} = useSession();

    return(
        <>
        <Head>
            <title>{data?.user?.name ? (`${data.user.name.split(" ")[0]}'s Reminders`) : ("Reminders")}</title>
        </Head>
        <div className={"relative flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <p className="text-purple-400 font-bold text-3xl ml-2 flex flex-row items-center">Reminderz&nbsp;
                {status == "authenticated" ? (
                    <>
                        <button className="text-green-400" onClick={() => setIsActive(!isActive)}>&#40;+Add&#41;</button>
                        <input type="checkbox" className="ml-5 mr-2" onClick={()=>setShowMine(!showMine)}/>
                        <dd className="text-xl text-white">Show mine only</dd>
                    </>
                ) : (
                    <a className="text-red-200">(sign in to add)</a>
                )}
            </p>
            <div key={seed} className={"flex flex-row flex-grow flex-wrap justify-between min-h-fit text-white font-bold gap-y-5 ml-2 mt-2 mb-5"}>
                {/*<ReminderTemplate reminder={someReminder}/>*/}
                {reminders.length ? (
                    showMine ? (
                        <>
                            {makeReminders({reminders:reminders.filter((r:any) => r.authorEmail == data?.user?.email), showDeleteUI: setDeleteIsActive})}
                            {/*refreshFetch()*/}
                        </>
                    ) : (
                        <>
                            {makeReminders({reminders:reminders, showDeleteUI: setDeleteIsActive})}
                        </>
                    )
                ) : (<p className="text-red-400 text-lg">NO REMINDERS</p>)}
            </div>
            <AddRemindUI isActive={isActive} onShow={() => {setIsActive(!isActive)}} refreshList={() => refreshFetch()} updateRemindersCallback={handleReminderUpdateCallback}></AddRemindUI>
            <AddDeleteUI isActive={deleteIsActive[0]} onShow={() => {setDeleteIsActive([false, "65b3d063030029e415df93d3"])}} updateRemindersCallback={handleReminderUpdateCallback} reminder={reminders?.find((_reminder:any)=>_reminder._id==deleteIsActive[1])}></AddDeleteUI>
        </div>
        </>
    )
}

export const getServerSideProps = async () => {

    //fix if have time
    let re: any[] = [];
    const request = await fetch("https://www.r-nguyen.com/api/remindersapi").then(data => data.json()).then(rem => {
        //console.log(rem);
        re = rem;
    });

    return {
        props: {_reminders:JSON.parse(JSON.stringify(re))}
    };
}

export default Reminderz;