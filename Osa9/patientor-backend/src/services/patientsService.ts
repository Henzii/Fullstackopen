
import { Patient } from '../types';
import { NewPatient } from '../types';

import patientsList from '../../data/patients';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsList;

const getPatients = (): Array<Patient> => {
    return patients;
};
const findPatient = (id:string):Patient => {
    const pToReturn = patientsList.find(p => p.id === id) as Patient;
    if (!pToReturn) {
        throw new Error('Patient not found');
    }
    if (!pToReturn.entries) {
        pToReturn.entries = [];
    }
    return pToReturn;
};
const getPatientsNoSsn = (): Omit<Patient, 'ssn' | 'entries'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (obj: NewPatient): Patient => {
    const newPatient:Patient = {
        ...obj,
        entries: [],
        id: uuid()
    };
    patients.push(newPatient);
    console.log('Added ', newPatient);
    return newPatient;
};
export default {
    getPatients,
    getPatientsNoSsn,
    addPatient,
    findPatient
};
