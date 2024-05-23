import Background from "../components/background";
import Header from "../components/header";
import Image from "next/image";

export default function About() {
    const srcs = ["/pics/aboutryan2.jpg",
                    "/pics/ryan17.jpg",
                    "/pics/ryan6.jpg",
                    "/pics/ryan10.jpg",
                    "/pics/ryan11.JPEG",
                    "/pics/ryan12.jpg",
                    "/pics/ryan15.jpg",
                    "/pics/ryan16.jpg"
                    ]

    //<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FNew_York&hl=en&src=YW1rM2VmQHZpcmdpbmlhLmVkdQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=NmFlMTM4Zjg1NDNmMmZlZjhmOWVjN2M1YTYwNmZlOWY0N2YzZTgwNjQ1NTMzYjgyMTY1ZjA0NmZlMmY3OGU2OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%237986CB&color=%230B8043" width="800" height="600"></iframe>
    //<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"></iframe>
    return(
        <div className={"flex flex-col min-h-screen overflow-hidden"}>
            <Header></Header>
            <Background></Background>
            <div className={"flex flex-col flex-grow justify-start items-center"}>
                <p className={"text-white text-xl md:text-3xl font-bold p-20 -mt-5"}>
                    <a className="text-3xl md:text-6xl">M</a>y name is <a href="." className="text-3xl md:text-6xl hover:text-blue-400">Ryan<b className={"text-3xl"}> </b>Nguyen.</a> I am currently a student at the University of Virginia in Charlottesville, VA. 
                    I am pursuing <a className={"underline"}>computer science</a>, and I also have <a className={"text-yellow-200"}>experience in embedded electronics, 
                    circuitry, and Internet of Things (IoT)</a> projects. I am <a className={"text-red-300"}>interested in research pertaining 
                    to artificial intelligence/machine learning</a> in all contexts. You can check out my <a href="resume" className={"hover:text-blue-400"}>resume</a>, <a href="projects" className={"hover:text-blue-400"}>projects</a>, and <a href="contact" className={"hover:text-blue-400"}>contact information</a>.
                    <br/>
                    <a className="text-3xl md:text-6xl">R</a>yan <a href="https://engineering.virginia.edu/i-s2ee" target="_blank" className={"text-green-200"}>works for the UVA I-S<sup>2</sup>EE Lab&#8599;</a>, which performs research in civil engineering-related disciplines. 
                    He is using artificial intelligence to create simulations of the real world (called &quot;digital twins&quot;) that are used for analysis. Computations are performed digitally to model stress/deformation, without conventional finite analysis. Presently, the lab is able to import prerendered
                    models to an augmented reality environment, but research is being done to develop realtime methods for recognizing environmental objects.
                </p>
                <div className="min-w-full flex flex-row flex-grow flex-wrap justify-around -mt-5 gap-y-5 mb-5">
                    {srcs.map(pic => <Image key={pic} src={pic} width={375} height={600} alt="Ryan Nguyen" className="ring-1 ring-white/20"></Image>)}
                </div>
                {/* <p className={"text-white text-xl md:text-3xl font-bold p-20 -mt-10 -mb-10"}>
                    <a className="text-3xl md:text-6xl">R</a>yan was recently <a href="https://engineering.virginia.edu/i-s2ee" target="_blank" className={"text-green-200"}>hired to the UVA I-S<sup>2</sup>EE Lab&#8599;</a>, which performs research in civil engineering-related disciplines. 
                    He is using artificial intelligence to create simulations of the real world (called &quot;digital twins&quot;) that are used for analysis. Computations are performed digitally to model stress/deformation, without conventional finite analysis. Presently, the lab is able to import prerendered
                    models to an augmented reality environment, but research is being done to develop realtime methods for recognizing environmental objects.<br/><br/>Similar research &darr;
                </p> */}
                {/*<iframe width="95%" height="850px" className={"mb-10 ring-1 ring-gray-400/20 rounded-lg bg-white"} src="https://www.sciencedirect.com/science/article/abs/pii/S0965997815000733"></iframe>*/}
            </div>
        </div>
    )
}