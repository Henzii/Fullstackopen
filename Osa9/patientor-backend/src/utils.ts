

import { NewPatient, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    const newPatient:NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDob(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newPatient;
};
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Missing or incorrect SSN');
    }
    return ssn;
};
const parseDob = (dob: unknown): string => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date');
    }
    return dob;
};
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect name');
    }
    return name;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
export default toNewPatient;