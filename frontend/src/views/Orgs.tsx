import React from 'react';
import { useEffect, useState } from 'react';
import Scheduler from '../controllers/scheduler/Scheduler';
import { Organization } from '../controllers/scheduler/types/Organization';
import OrganizationView from './OrganizationView';
    // should provide a list of all universities with a search bar (trie search). 
    // Each university should be displayed in a simple box that's been centered, 
    // they each should have a description, their name in bold, a location, and 
    // an image of a logo.
function Orgs() {
    const startingState: Organization[] = []
    const [organizations, setOrganizations] = useState(startingState);

    // This should be done through a controller, the DataEngine should not interact with the view.
    useEffect(() => {Scheduler.initializeOrganizationData(setOrganizations)}, []);

    return (
        <div>
            <div className='header'>
                <h1>Organizations</h1>
                {organizations.map((org, i) => {return <OrganizationView org={org} key={i}/>})}
            </div>
        </div>
    )
}

export default Orgs;