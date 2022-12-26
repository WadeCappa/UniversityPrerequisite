import React from 'react';
import { useEffect, useState } from 'react';
import Scheduler from '../controllers/scheduler/Scheduler';
import { Objective } from '../controllers/scheduler/types/Objective';
import { useSearchParams } from 'react-router-dom';
import DegreeView from './DegreeView';
import { UserData } from '../controllers/scheduler/types/UserData';

type Props = {
    userData: UserData
}

function Degrees({userData}: Props) {
    const [queryParameters] = useSearchParams()

    const organization: string = queryParameters.get("university") || "Invalid University"

    const startingState: Objective[] = []
    const [objectives, setobjectives] = useState(startingState);

    // This should be done through a controller, the DataEngine should not interact with the view.
    useEffect(() => {Scheduler.initializeObjectivesData(setobjectives, organization)}, []);

    return (
        <div>
            <div className='header'>
                <h1>{organization}</h1>
                {objectives.map((ob, i) => <DegreeView ob={ob} org={organization} key={i}/>)}
            </div>

            <div className="row">

                <div className="columnLeft">
                    Eventually turn this into a drag and drop situation, figure out how to let a user drag the degrees they want to complete 
                    with their schedule (this will probably take some time to implement).
                </div>

                <div className="columnRight" >
                    e
                </div>
            </div> 
        </div>
    )
}

export default Degrees;