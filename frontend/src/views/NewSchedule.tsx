import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserData } from '../controllers/scheduler/types/UserData';
import ScheduleMaker from './schedule_maker/ScheduleMaker';

type Props = {
    userData: UserData
}

function NewSchedule({userData}: Props) {
    const [queryParameters] = useSearchParams()
    const university: string | null = queryParameters.get("university")    
    const degrees: string | null = queryParameters.get("degrees")    

    return (
        <ScheduleMaker university={university} degrees={degrees} userData={userData}/>
    )
}

export default NewSchedule