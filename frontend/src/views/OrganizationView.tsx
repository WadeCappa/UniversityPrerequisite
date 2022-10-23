import React from 'react';
import { Link } from 'react-router-dom';
import { Organization } from '../controllers/scheduler/types/Organization';


type Props = {
    org: Organization
  }

function OrganizationView({org}: Props) {

    return (
        <div className='organizationView'>
            <h2>{org.title}</h2>
            <p>{org.description}</p>
            <p>{org.location}</p>
            <p>{org.slotsPerBucket}</p>
            <Link to={`/degrees?university=${org.title}`}>
                <button className="slot" onClick={() => {}}>See Degrees</button>
            </Link>
        </div>
    )
}

export default OrganizationView;