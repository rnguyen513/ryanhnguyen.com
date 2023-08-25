import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from "./components/header"
import Background from "./components/background"

const inter = Inter({ subsets: ['latin'] })
//bg-gradient-to-r from-gray-200 to-gray-400
export default function Home() {
  return (
    <div className={"relative flex flex-row min-h-screen overflow-hidden"}>
      <Background></Background>
      <div className={"relative flex flex-col flex-grow min-h-fit dark:bg-gray-900 justify-center align-center"}>
        <a href="about" className={"flex flex-row bg-gray-100/10 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-2xl ring-1 ring-gray-300/10 shadow-2xl p-10 pb-14 dark:bg-gray-400 dark:hover:bg-gray-500 dark:md:ring-gray-600 hover:bg-gray-100/5 hover:ring-gray-300/5"}>
          <p className={"font-bold text-8xl dark:font-white-200"}>Explore<br></br>Ryan<br></br>Nguyen &rarr;</p>
        </a>
        <a href="https://www.github.com" className={"group flex flex-row justify-center bg-gray-100/10 sm:mx-auto sm:max-w-fit md:min-h-fit sm:rounded-lg ring-1 ring-gray-300/10 shadow-2xl p-5 pb-7 dark:bg-gray-400 dark:hover:bg-gray-500 dark:md:ring-gray-600 hover:bg-gray-100/5 hover:ring-gray-300/5 mt-5"}>
          <p className={"font-bold text-2xl dark:font-white-200"}>See the <code className={"group-hover:underline"}>$ource c0de</code> &rarr;</p>
        </a>
      </div>
    </div>
  )
}