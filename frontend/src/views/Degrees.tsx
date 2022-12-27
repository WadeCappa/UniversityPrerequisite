import React from 'react';
import { useEffect, useState } from 'react';
import Scheduler from '../controllers/scheduler/Scheduler';
import { Objective } from '../controllers/scheduler/types/Objective';
import { Link, useSearchParams } from 'react-router-dom';
import DegreeView from './DegreeView';
import { UserData } from '../controllers/scheduler/types/UserData';

type Props = {
    userData: UserData
}

function Degrees({userData}: Props) {
    const [queryParameters] = useSearchParams()

    const organization: string = queryParameters.get("university") || "Invalid University"

    const startingState: [Objective, boolean][] = []
    const [objectives, setObjectives] = useState(startingState);

    const setNewTargetObjectives = (index: number) => {
        console.log(objectives)
        setObjectives(objectives.map(([ob, c], i) => {
            if (i === index) { return [ob, !c] }
            else { return [ob, c] }
        }))
    }

    // This should be done through a controller, the DataEngine should not interact with the view.
    useEffect(() => {Scheduler.initializeObjectivesData(setObjectives, organization)}, []);

    return (
        <div>
            <div className='header'>
                <h1>{organization}</h1>
                <Link to={`/newschedule?university=${organization}&degrees=${objectives.filter(([_, c]) => c).map(([ob, _]) => ob.title).join()}`}>
                    <button className="slot" onClick={() => {}}>Build New Schedule</button>
                </Link>
                <div>

                    <div className="list-container">
                        {objectives.map(([ob, checked], index) => {
                            return (
                                <div key={ob.orgID}>
                                    <input value={ob.orgID} type="checkbox" checked={checked} onChange={() => setNewTargetObjectives(index)} />
                                    <span>{ob.title}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

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