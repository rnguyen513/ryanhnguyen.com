import { useState } from "react";
import { AddRemindUI } from "./reminders";

export default function TestPage() {
    const [active, setActive] = useState(false);
    return(
        <>
            <h1>Kazakhstan</h1>
            <Panel isActive={active} onShow={() => {setActive(!active)}}>
                With a population of about 2 million, Almaty is Kazakhstan&apos;s largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <button className="text-white text-xl font-bold" onClick={() => setActive(!active)}>Open</button>
        </>
    )
}

function Panel({children,isActive,onShow}:any) {
    return(
        <section className="text-white bg-red-300">
            {isActive ? (
                <div className="absolute h-4/5 w-3/5 left-20 top-20 bg-purple-100 ring-1 ring-gray-300/10 rounded-lg shadow-lg shadow-white/10 font-bold">
                    <div className="flex flex-col items-center justify-around h-full rounded-lg">
                        <h1 className="text-blue-400 text-3xl">Add the mf!</h1>
                        <input type="text" placeholder="reminder"></input>
                        <input type="date" placeholder="due"></input>
                        <input type="number" placeholder="importance"></input>
                        <div className="flex-row">
                            <button className="ring-1 ring-black rounded-lg p-3 mr-3 bg-red-200" onClick={onShow}>cancel</button>
                            <button className="ring-1 ring-black rounded-lg p-3 bg-green-200">submit</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-red-400 font-bold text-xl">NOT ACTIVE</p>
            )}
        </section>
    )
}