import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from "./components/header"
import Background from "./components/background"

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <div className={"relative flex flex-row min-h-screen overflow-hidden"}>
      <Background></Background>
      <div className={"relative flex flex-col flex-grow min-h-fit justify-center"}>
        <a href="about" className={"group flex flex-row bg-gray-100/10 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-2xl ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-10 pb-14 hover:bg-gray-100/5 hover:ring-gray-300/5"}>
          <p className={"font-bold text-8xl text-white drop-shadow-2xl dark:text-white-200"}>Explore<br></br>Ryan<br></br>Nguyen &rarr;</p>
          <p className={"absolute invisible group-hover:visible font-bold text-8xl ml-1 mt-1 text-white/50"}>Explore<br></br>Ryan<br></br>Nguyen &rarr;</p>
        </a>
        <a href="https://www.linkedin.com/in/ryan-nguyen-82b387284/" target="_blank" className={"group flex flex-row justify-center bg-gray-100/10 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-lg ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-5 pb-7 hover:bg-gray-100/5 hover:ring-gray-300/5 mt-5"}>
          <p className={"font-bold text-2xl text-white drop-shadow-lg"}>Ryan&apos;s <code className={"group-hover:text-blue-400"}>LinkedIn</code> &#8599;</p>
        </a>
        <a href="https://github.com/rnguyen513/resume" target="_blank" className={"group flex flex-row justify-center bg-gray-100/10 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-lg ring-1 ring-gray-300/10 shadow-lg shadow-white/20 p-5 pb-7 hover:bg-gray-100/5 hover:ring-gray-300/5 mt-5"}>
          <p className={"font-bold text-2xl text-white drop-shadow-lg"}>See the <code className={"group-hover:text-blue-400"}>$ource c0de</code> &#8599;</p>
        </a>
      </div>
      <div className={"absolute bottom-0 right-0 h-15 w-15"}>
        <p className={"font-bold text-white/50 text-sm"}>Background by: Osorina Irina</p>
      </div>
    </div>
  )
}