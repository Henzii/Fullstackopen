import diagnosesList from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesList as Array<Diagnose>;

export const getDiagnoses = ():Array<Diagnose> => {
    return diagnoses;
};

export default {
    getDiagnoses,
};