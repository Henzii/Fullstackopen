import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send( patientsService.getPatientsNoSsn());
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