import { useEffect, useState, useRef } from "react";
import { AddRemindUI } from "./reminders";
import { ProgressBar } from "react-bootstrap";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { SparklesCore } from "@/components/ui/Sparkles";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";

import {useSession, signIn, signOut} from "next-auth/react";

// export function TestPage() {
//     const [active, setActive] = useState(false);

//     const {data, status} = useSession();
//     if (status === "loading") return <h1>loading ... please wait</h1>
//     if (status === "authenticated") {
//         console.log(data);

//         const {isOpen, onOpen, onOpenChange} = useDisclosure();
//         return (
//             //<Panel isActive={isOpen} onShow={onOpen}></Panel>
//             // <Modal isOpen={isOpen} backdrop="blur">
//             //     <ModalContent>
//             //         {(onClose) => (
//             //             <>
//             //                 <ModalHeader>modal title</ModalHeader>
//             //                 <ModalBody>
//             //                     <p>
//             //                         hello hello hello
//             //                     </p>
//             //                 </ModalBody>
//             //                 <ModalFooter>
//             //                     <Button onPress={onClose}></Button>
//             //                 </ModalFooter>
//             //             </>
//             //         )}
//             //     </ModalContent>
//             // </Modal>
//             // <div className="flex flex-col bg-white min-h-screen text-black">
//             //     <h1>Signed in: {data.user?.name + ", " + data.user?.email}</h1>
//             //     <img src={data.user?.image ? (data.user.image) : ("")} height={500} width={500}></img>
//             //     <Panel isActive={active} onShow={() => {setActive(!active)}}>
//             //         With a population of about 2 million, Almaty is Kazakhstan&apos;s largest city. From 1929 to 1997, it was its capital city.
//             //     </Panel>
//             //     <button className="text-xl font-bold" onClick={() => setActive(!active)}>Open</button>
//             //     <ProgressBar variant="danger" animated now={66} className=""/>
//             //     <progress value={0.3}></progress>
//             //     <button onClick={() => signOut({redirect:false})}>sign out</button>
//             // </div>
//         )
//     }

//     return(
//         <div>
//             <button onClick={() => signIn("google")} className="bg-white text-black">sign in!!!!</button>
//         </div>
//     )
// }

const reques = async (endpoint:string) => {
    const rere = await fetch(`https://canvas.its.virginia.edu/api/v1${endpoint}`, {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "Authorization":`Bearer ${process.env.CANVAS_TOKEN}`
        }
    }).then(data => data.json()).then(response => console.log(response));
    return rere;
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

// export const testPage2 = () => {
//     const {isOpen, onOpen, onOpenChange} = useDisclosure();
//     return(
//         <div className="bg-blue-200">
//         <Button onPress={onOpen}>open modal</Button>
//         <Modal isOpen={isOpen} backdrop="blur">
//             <ModalContent>
//                 {(onClose) => (
//                     <>
//                         <ModalHeader>modal title</ModalHeader>
//                         <ModalBody>
//                             <p>
//                                 hello hello hello
//                             </p>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button onPress={onClose}></Button>
//                         </ModalFooter>
//                     </>
//                 )}
//             </ModalContent>
//         </Modal>
//         </div>
//     )
// }

const TestPage3 = () => {
    return(
        <>
        <div className="relative flex flex-row min-h-screen overflow-hidden">
            <SparklesCore background={"red"} maxSize={1}></SparklesCore>
        </div>
        </>
    )
}

const GoogleGeminiEffectDemo = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });
   
    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
   
    return (
      <div
        className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
    );
}

const PropTest = (props:any) => {
    console.log(props.name);
    return(
        <>
        <div className="font-bold">
            <p style={{backgroundColor: `${props.bgcolor}`}}>{props.name}</p>
        </div>
        </>
    )
}

const PropDriver = () => {
    <>
    <div className="relative flex flex-row min-h-screen overflow-hidden bg-white">
        <PropTest name="this is props.name" bgcolor="red"></PropTest>
    </div>
    </>
}

//export default testPage2;
// export default Panel;
//export default GoogleGeminiEffectDemo;
export default PropDriver;