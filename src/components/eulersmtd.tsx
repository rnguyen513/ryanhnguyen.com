import { useState } from "react"

const EulersMtd = ({initial, final, stepSize}:{initial:number, final:number, stepSize:number}) => {
    const [step, setStep] = useState([{initial}]);
    let numSteps = (final-initial)/stepSize;

    for (let i=0;i<numSteps;i++) {
        //setStep(step.push())
    }
}

export default EulersMtd