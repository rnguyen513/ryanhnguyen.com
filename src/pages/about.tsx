import Background from "./components/background";
import Header from "./components/header";
import Image from "next/image";

export default function About() {
    return(
        <div className={"flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <div className={"flex flex-col flex-grow justify-start items-center"}>
                <p className={"text-white text-xl md:text-3xl font-bold p-20 -mt-5"}>
                    <a className="text-3xl md:text-6xl">M</a>y name is <a href="." className="text-3xl md:text-6xl hover:text-blue-400">Ryan Nguyen.</a> I am currently a first-year student at the University of Virginia in Charlottesville, VA. 
                    I plan to pursue <a className={"underline"}>computer science</a>, and I also have <a className={"text-yellow-200"}>experience in embedded electronics, 
                    circuitry, and Internet of Things (IoT)</a> projects. I am <a className={"text-red-300"}>interested in research pertaining 
                    to artificial intelligence/machine learning</a> in all contexts. You can check out my <a href="resume" className={"hover:text-blue-400"}>resume</a>, <a href="projects" className={"hover:text-blue-400"}>projects</a>, and <a href="contact" className={"hover:text-blue-400"}>contact information</a>.
                </p>
                <div className="min-w-full flex flex-row flex-grow flex-wrap justify-around -mt-5 gap-y-5">
                    <Image src="/pics/aboutryan2.jpg" width={375} height={600} alt="Ryan Nguyen" className={"ring-1 ring-white/20"}></Image>
                    <Image src="/pics/aboutryan.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan17.jpg" width={375} height={600} alt="Ryan Nguyen" className={"ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan5.jpg" width={375} height={600} alt="Ryan Nguyen" className={"ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan6.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan7.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan8.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan9.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan10.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan11.JPEG" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan12.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan13.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan14.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan15.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>
                    <Image src="/pics/ryan16.jpg" width={375} height={600} alt="Ryan Nguyen" className={"hidden lg:flex ring-1 ring-white/20"}></Image>                </div>
            </div>
        </div>
    )
}