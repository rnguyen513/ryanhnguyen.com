export const Progressbar = (props:any) => {
    let color;
    (props.width >= 75) ? (color = "#86efac") : ((props.width >= 25) ? (color="#fef08a") : (color="#fecaca"));
    return(
        <div className="h-2 rounded-full w-100 bg-gray-500">
            <div className={`h-full bg-green-200 z-10 rounded-full`} style={{width:`${props.width}%`, backgroundColor:`${color}`}}></div>
        </div>
    )
}

export const TestPage = () => {
    return(
        <Progressbar width={4.334}></Progressbar>
    )
}

export default TestPage;