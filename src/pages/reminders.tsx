import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Background from "../components/background";
import Header from "../components/header";
import { Progressbar } from "../components/progressbar";
import Head from "next/head";

import {useSession, signIn, signOut} from "next-auth/react";

export interface Reminder {
    _id: string,
    name: string,
    author: string,
    authorEmail: string,
    created: Date,
    due: Date,
    importance: number,
    color: string
}

//Template for reminder entry
interface ReminderTemplateProps {
    reminder: Reminder,
    showDeleteUI: Dispatch<SetStateAction<(boolean | string)[]>>
}
const ReminderTemplate = ({reminder, showDeleteUI}:ReminderTemplateProps) => {

    let createdAt = new Date(reminder.created);

    if (reminder.name.split(" ")[0].toUpperCase() == "TEST") {
        console.log("percent done for", reminder.name, ":", ((new Date(Date.now()).getTime() - createdAt.getTime())/(new Date(reminder.due).getTime() - createdAt.getTime())));
    }

    let [percentDone, setPercentDone] = useState((new Date(Date.now()).getTime() - createdAt.getTime())/(new Date(reminder.due).getTime() - createdAt.getTime()));

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
            <p className="text-red-300">Due: {displayDate.toLocaleDateString()}, {displayDate.toLocaleTimeString()}</p>
            <p>Created: {new Date(reminder.created).toLocaleDateString()}</p>
            {(percentDone >= 1 || percentDone < 0) ? (<p className="text-purple-400">Expired!</p>) : (<Progressbar width={(1-percentDone)*100}></Progressbar>)}
        </a>
    )
}

//Async function that's called when user adds new reminder via UI
interface handleSubmitProps {
    _reminder: string,
    _due: Date,
    _importance: number,
    _key: string,
    _color: string,
    _author: string,
    _authorEmail: string,
    _reqType: string,
    __id: string,
    _created: Date
}
export const handleSubmit = async ({_reminder, _due, _importance, _key, _color, _author, _authorEmail, _reqType, __id, _created}:handleSubmitProps) => {
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

//UI for creating new reminder
interface AddRemindUIProps {
    isActive: boolean,
    onShow: ()=>void,
    updateRemindersCallback: (reminders: Reminder[])=>void
}
const AddRemindUI = ({isActive, onShow, updateRemindersCallback}:AddRemindUIProps) => {

    const [name, setName] = useState("");
    const [due, setDue] = useState(new Date("2024-02-29"));
    const [importance, setImportance] = useState(0);
    const [key, setKey] = useState("0");
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
            <div className="fixed h-200 w-screen md:w-3/5 left-0 md:left-20 top-20 bg-gray-200 ring-4 ring-black rounded-lg shadow-lg shadow-white/10 font-bold">
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
                                setKey("0");
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
                                const req_name = data?.user?.name ? data.user.name : "UNKNOWN";
                                const req_email = data?.user?.email ? data.user.email : "UKNOWN";
                                const reqResult = handleSubmit({_reminder:name,
                                                                _due:due,
                                                                _importance:importance,
                                                                _key:key,
                                                                _color:color,
                                                                _author:req_name,
                                                                _authorEmail:req_email,
                                                                _reqType:"PUSH",
                                                                __id:"0",
                                                                _created:new Date(0)}
                                                            )
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
                                            setKey("0");
                                            setColor("#FF0000");
                                        }
                                    });
                            }}>submit</button>
                            <div className="m-5 p-5 bg-black rounded-lg text-white">
                                <ReminderTemplate
                                    reminder={{
                                                _id: "0",
                                                name:(name || "[new reminder]"),
                                                due:due,
                                                importance:importance,
                                                color:color,
                                                author:String(data?.user?.name),
                                                authorEmail:"UNKNOWN",
                                                created:new Date(Date.now())}
                                            }
                                    showDeleteUI={()=>{}}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-black font-bold p-5">Sign in to add!</p>
                        <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={() => {
                            onShow();
                            setAllValid(true);

                            //reset
                            setName("");
                            setDue(new Date("2024-02-29"));
                            setImportance(0);
                            setKey("0");
                            setColor("#FF0000");
                        }}>close</button>
                    </>
                )}
            </div>) : (/*() => setAllValid(true) <p className="absolute left-20 text-red-400 font-bold">NOT ACTIVE</p>*/null)
        }
        </>
    )
}

//UI for deleting selected reminder
interface AddDeleteUIProps {
    isActive: (boolean | string),
    onShow: ()=>void,
    updateRemindersCallback: (reminders: Reminder[])=>void,
    reminder: Reminder
}
export function AddDeleteUI({isActive, onShow, updateRemindersCallback, reminder}:AddDeleteUIProps) {
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
            <div className="fixed h-200 w-screen md:w-3/5 left-0 md:left-20 top-20 bg-white ring-4 ring-black rounded-lg shadow-lg shadow-white/10 font-bold">
                {status == "authenticated" ? (
                    <div className="flex flex-col items-center justify-around h-full rounded-lg text-black p-10">
                        <h1 className="text-red-400 text-3xl">Delete:</h1>

                        <div className="m-5 p-5 bg-black rounded-lg text-white">
                        <ReminderTemplate reminder={reminder} showDeleteUI={()=>{}}></ReminderTemplate>
                        </div>

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
                            <button className="absolute top-5 right-3 ring-1 ring-black rounded-lg p-3 mt-3 bg-red-200" onClick={() => {
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
                                const r_email = data?.user?.email ? data.user.email : "UKNOWN";
                                const reqResult = handleSubmit({_reminder:reminder.name,
                                                                _due:reminder.due,
                                                                _importance:reminder.importance,
                                                                _key:String(key),
                                                                _color:reminder.color,
                                                                _author:reminder.author,
                                                                _authorEmail:r_email,
                                                                _reqType:"DELETE",
                                                                __id:reminder._id,
                                                                _created:reminder.created}
                                                            )
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

//Component that instantiates array of reminders (uses reminder template from above)
interface makeRemindersProps {
    reminders: Reminder[],
    showDeleteUI: Dispatch<SetStateAction<(boolean | string)[]>>
}
export const makeReminders = ({reminders, showDeleteUI}:makeRemindersProps) => {
    return (
        <>
            {reminders.map((reminder:Reminder) => <div key={reminder._id}><ReminderTemplate reminder={reminder} showDeleteUI={showDeleteUI}></ReminderTemplate></div>)}
        </>
    )
}

//Base component for /reminders
interface ReminderzProps {
    _reminders: Reminder[]
}
const Reminderz = ({_reminders}:ReminderzProps) => {

    console.log(_reminders);

    const [reminders, setReminders] = useState((_reminders || []));

    //FOR PUSH UI
    const [isActive, setIsActive] = useState(false);

    //FOR DELETE UI
    const [deleteIsActive, setDeleteIsActive] = useState([false, "65b3d063030029e415df93d3"]);

    const [seed, setSeed] = useState(1);

    const handleReminderUpdateCallback = (reminders:Reminder[]) => {
        setReminders(reminders);
    }

    const [showMine, setShowMine] = useState(false);

    const {data, status} = useSession();
    console.log(data);
    console.log(status);

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
                {reminders.length ? (
                    showMine ? (
                        <>
                            {makeReminders({reminders:reminders.filter((r:Reminder) => r.authorEmail == data?.user?.email), showDeleteUI:setDeleteIsActive})}
                        </>
                    ) : (
                        <>
                            {makeReminders({reminders:reminders, showDeleteUI:setDeleteIsActive})}
                        </>
                    )
                ) : (<p className="text-red-400 text-lg">NO REMINDERS</p>)}
            </div>
            <AddRemindUI
                isActive={isActive}
                onShow={() => {setIsActive(!isActive)}}
                updateRemindersCallback={handleReminderUpdateCallback}
            />
            <AddDeleteUI
                isActive={deleteIsActive[0]}
                onShow={() => {setDeleteIsActive([false, "65b3d063030029e415df93d3"])}}
                updateRemindersCallback={handleReminderUpdateCallback}
                reminder={reminders?.find((_reminder:Reminder)=>_reminder._id==deleteIsActive[1]) ?? {name:"error", author:"error", authorEmail:"error", _id:"error", created:new Date(0), due:new Date(0), color:"error", importance:0}}
            />
        </div>
        </>
    )
}

//Server side rendering for reminders, then pass to base component above
export const getServerSideProps = async () => {

    //fix if have time
    let re: any[] = [];
    const request = await fetch("https://www.ryanhnguyen.com/api/remindersapi").then(data => data.json()).then(rem => {
        //console.log(rem);
        re = rem;
    });

    return {
        props: {_reminders:JSON.parse(JSON.stringify(re))}
    };
}

export default Reminderz;