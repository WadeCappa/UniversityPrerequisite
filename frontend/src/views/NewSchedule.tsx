import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserData } from '../controllers/scheduler/types/UserData';
import ScheduleMaker from './schedule_maker/ScheduleMaker';

type Props = {
    navData: {
        profile: UserData;
        setProfile: (newProfile: UserData) => void;
    }
}

function NewSchedule({navData}: Props) {
    const [queryParameters] = useSearchParams()
    const university: string | null = queryParameters.get("university")    
    const degrees: string | null = queryParameters.get("degrees")    

    return (
        <ScheduleMaker university={university} degrees={degrees} navData={navData}/>
    )
}

export default NewSchedule