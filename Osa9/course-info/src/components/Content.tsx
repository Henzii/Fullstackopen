import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ( {cPart}:{cPart:CoursePart} ) => {
    return <Part cPart={cPart} />
};

export default Content;