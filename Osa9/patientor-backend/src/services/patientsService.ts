
import { Patient } from '../types';
import { NewPatient } from '../types';

import patientsList from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsList as Array<Patient>;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientsNoSsn = (): Omit<Patient, 'ssn'>[] => {
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
        id: uuid()
    };
    patients.push(newPatient);
    console.log('Added ', newPatient);
    return newPatient;
};
export default {
    getPatients,
    getPatientsNoSsn,
    addPatient
};
