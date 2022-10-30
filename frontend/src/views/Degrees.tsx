import React from 'react';
import { useEffect, useState } from 'react';
import Scheduler from '../controllers/scheduler/Scheduler';
import { Objective } from '../controllers/scheduler/types/Objective';
import { useSearchParams } from 'react-router-dom';
import DegreeView from './DegreeView';

function Degrees() {
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
                {objectives.map(ob => <DegreeView ob={ob} org={organization}/>)}
            </div>
        </div>
    )
}

export default Degrees;