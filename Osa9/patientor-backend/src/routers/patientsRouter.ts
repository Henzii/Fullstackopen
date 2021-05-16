import express from 'express';
import patientsService from '../services/patientsService';
import { BaseEntry, Entry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry, Patient, HealthCheckEntry } from '../types';
import toNewPatient from '../utils';
import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send( patientsService.getPatientsNoSsn());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const patient:Patient = patientsService.findPatient(id);
        res.json(patient);
    }catch (e) {
        res.status(401).send(e.message);
    }

});
router.post('/:id/entries', (req, res) => {
    const validateString = (str:unknown): string => {
        if (!str || typeof str !== 'string') {
            throw new Error(`Invalid argument (${str})!`);
        }
        return str;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toNewEntry = (object:any): Entry => {
        const baseEntry:BaseEntry = {
            id: uuid(),
            date: validateString(object.date),
            description: validateString(object.description),
            specialist: validateString(object.specialist),
            diagnosisCodes: object.diagnosisCodes as string[] | undefined

        };
        switch(object.type) {
            case 'Hospital':
                return { ...baseEntry, 
                    type: 'Hospital',
                    discharge: {
                        date: validateString(object.discharge.date),
                        criteria: validateString(object.discharge.criteria)
                    }
                } as HospitalEntry;
            case 'OccupationalHealthcare':
                return { ...baseEntry,
                    type: 'OccupationalHealthcare',
                    employerName: validateString(object.employerName),
                    sickLeave: object.sickLeave as { startDate: string, endDate: string} | undefined
                } as OccupationalHealthCareEntry;
            case 'HealthCheck':
                return { ...baseEntry,
                    type: 'HealthCheck',
                    healthCheckRating: object.healthCheckRating as HealthCheckRating,
                } as HealthCheckEntry;
        }
        throw new Error("Error while parsing entry");
    };

    const id = req.params.id;
    try {
        const newEntry:Entry = toNewEntry(req.body);
        console.log(id);
        const patient = patients.find((p:Patient) => p.id === id);
        patient?.entries.push(newEntry);
        res.json(newEntry);
    } catch(e) {
        console.log(e.message);
        res.status(400).end();
    }

});
router.post('/', (req, res) => {
    
    try {
        const parsedPatient = toNewPatient(req.body);
        const newPatient = patientsService.addPatient(parsedPatient);
        res.json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;