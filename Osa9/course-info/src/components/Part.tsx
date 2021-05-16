
import React from 'react';
import { CoursePart } from "../types";

const Part = ( {cPart}:{cPart:CoursePart}) => {

    switch (cPart.type) {
        case 'normal':
            return <div><h2>{cPart.name} {cPart.exerciseCount}</h2>{cPart.description}</div>
        case 'groupProject':
            return <div><h2>{cPart.name}</h2>Group project exercises: {cPart.groupProjectCount}</div>
        case 'submission':
            return <div><h2>{cPart.name} {cPart.exerciseCount}</h2>{cPart.description}<div>Submit to {cPart.exerciseSubmissionLink}</div></div>;
        case 'special':
            return <div><h2>{cPart.name} {cPart.exerciseCount}</h2>{cPart.description}<div>Required skills: {cPart.requirements.join(', ')}</div></div>
        default: 
            throw new Error('Unknon type!!?!?');
    }
}

export default Part;