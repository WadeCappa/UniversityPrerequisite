import React from 'react';
import { useEffect, useState } from 'react';
    // should provide a list of all universities with a search bar (trie search). 
    // Each university should be displayed in a simple box that's been centered, 
    // they each should have a description, their name in bold, a location, and 
    // an image of a logo.
function Orgs() {
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {}, []);

    return (
        <div>
            <h1 className='header'>Organizations</h1>
        </div>
    )
}

export default Orgs;