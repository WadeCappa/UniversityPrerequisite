import React from 'react';
import { useEffect, useState } from 'react';
import Scheduler from '../controllers/scheduler/Scheduler';
import { Organization } from '../controllers/scheduler/types/Organization';
import { UserData } from '../controllers/scheduler/types/UserData';
import OrganizationView from './OrganizationView';
    // should provide a list of all universities with a search bar (trie search). 
    // Each university should be displayed in a simple box that's been centered, 
    // they each should have a description, their name in bold, a location, and 
    // an image of a logo.

type Props = {
    userData: UserData
}

function Orgs({userData}: Props) {
    const startingState: Organization[] = []
    const [organizations, setOrganizations] = useState(startingState);

    // This should be done through a controller, the DataEngine should not interact with the view.
    useEffect(() => {Scheduler.initializeOrganizationData(setOrganizations)}, []);

    const tableRows: Organization[][] = []
    const itemsPerRow = 3
    
    organizations.forEach((org: Organization, i: number) => {
        if (i % itemsPerRow == 0) {
            tableRows.push([])
        }

        tableRows.at(-1)?.push(org)
    })

    return (
        <div>
            <div className='header'>
                <h1>Organizations</h1>
            </div>
            <table style={{width:'100%'}}>
                {tableRows.map((orgs: Organization[], rowIndex: number) => {
                    return <tr>
                        {orgs.map((org: Organization, colIndex: number) => {
                            return <td>{<OrganizationView org={org} key={rowIndex*itemsPerRow + colIndex}/>}</td>
                        })}
                    </tr>
                })}
            </table>
        </div>
    )
}

export default Orgs;