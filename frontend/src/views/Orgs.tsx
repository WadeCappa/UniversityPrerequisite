import React from 'react';
import { useEffect, useState } from 'react';
import DataEngine from '../controllers/scheduler/DataEngine';
import { Organization } from '../controllers/scheduler/types/Organization';
    // should provide a list of all universities with a search bar (trie search). 
    // Each university should be displayed in a simple box that's been centered, 
    // they each should have a description, their name in bold, a location, and 
    // an image of a logo.
function Orgs() {
    const startingState: Organization[] = []
    const [organizations, setOrganizations] = useState(startingState);

    // This should be done through a controller, the DataEngine should not interact with the view.
    useEffect(() => {
        DataEngine.GetOrganizations().then(d => setOrganizations(d))
    }, []);

    return (
        <div>
            <h1 className='header'>Organizations</h1>
        </div>
    )
}

export default Orgs;