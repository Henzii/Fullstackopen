import React from 'react'
import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
    return <p>Number of exercises: {courseParts.reduce( (r, c) => r+c.exerciseCount, 0)}</p>;
};

export default Total;