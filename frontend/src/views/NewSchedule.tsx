import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ScheduleMaker from './schedule_maker/ScheduleMaker';

function NewSchedule() {
    const [queryParameters] = useSearchParams()
    const university: string | null = queryParameters.get("university")    
    const degrees: string | null = queryParameters.get("degrees")    

    return (
        <ScheduleMaker university={university} degrees={degrees}/>
    )
}

export default NewSchedule