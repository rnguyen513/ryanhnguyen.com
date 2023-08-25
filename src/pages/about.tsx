import Background from "./components/background";
import Header from "./components/header";
import Image from "next/image";

export default function About() {
    return(
        <div className={"flex flex-col min-h-screen"}>
            <Header></Header>
            <Background></Background>
            <div className={"flex flex-col flex-grow justify-start items-center"}>
                <p className={"text-white text-xl md:text-3xl font-bold p-20"}>
                    <a className="text-3xl md:text-6xl">M</a>y name is <a href="." className="text-3xl md:text-6xl hover:text-blue-400">Ryan Nguyen.</a> I am currently a first-year student at the University of Virginia in Charlottesville, VA. 
                    I plan to pursue <a className={"underline"}>computer science</a>, and I also have experience in <a className={"text-yellow-200"}>embedded electronics, 
                    circuitry, and Internet of Things (IoT)</a> projects. I am <a className={"text-red-200"}>interested in research pertaining 
                    to artificial intelligence/machine</a> learning in all contexts. You can explore my <a href="resume" className={"hover:text-blue-400"}>resume</a>, <a href="projects" className={"hover:text-blue-400"}>projects</a>, and <a href="contact" className={"hover:text-blue-400"}>contact information</a>.
                </p>
                <div className="min-w-full flex flex-row justify-around">
                    <Image src="/aboutryan.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"-mt-10 invisible lg:visible"}></Image>
                    <Image src="/aboutryan.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"-mt-10"}></Image>
                    <Image src="/aboutryan.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"-mt-10 invisible lg:visible"}></Image>
                </div>
            </div>
        </div>
    )
}