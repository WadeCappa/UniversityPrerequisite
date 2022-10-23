import React from 'react';
import { Objective } from '../controllers/scheduler/types/Objective';
import { Link } from 'react-router-dom'
import { Organization } from '../controllers/scheduler/types/Organization';

type Props = {
    ob: Objective
    org: string
  }

function DegreeView({ob, org}: Props) {

    return (
        <div className='organizationView'>
            <h2>{ob.title}</h2>
            <p>{ob.description}</p>
            <Link to={`/newschedule?university=${org}&degrees=${ob.title}`}>
                <button className="slot" onClick={() => {}}>Build Schedule</button>
            </Link>
        </div>
    )
}

export default DegreeView;