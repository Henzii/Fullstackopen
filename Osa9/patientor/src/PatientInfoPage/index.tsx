import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setDiagnoses, setPatient, useStateValue } from '../state';
import { Diagnosis, Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry, Patient } from '../types';
import AddEntryForm from './AddEntryForm';

type ID = {
    id: string;
};


const PatientInfoPage = () => {

    const { id }: ID = useParams<ID>();
    const [{ selectedPatient, diagnosisList }, dispatch] = useStateValue();

    const genderToSign = (gender: Gender): string => {
        if (gender === 'male') return "♂";
        else if (gender === 'female') return "♀";
        else return "X";
    };

    useEffect(() => {
        const getPatientData = async () => {
            console.log('Loading patient...');
            const { data: pDiddy } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatient(pDiddy));
        };
        const getDiagnoses = async () => {
            console.log('Loading diagnoses..');
            const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
            dispatch(setDiagnoses(diagnosesData));
        };
        if (!diagnosisList || diagnosisList.length < 1) {
            void getDiagnoses();
        }
        if (!selectedPatient || selectedPatient.id !== id) {
            void getPatientData();
        }
    }, []);
    if (!selectedPatient) return <h1>Loading patietn...</h1>;
    return (
        <div>
            <h1>{selectedPatient.name} {genderToSign(selectedPatient.gender)}</h1>
            Dob: {selectedPatient.dateOfBirth}<br />
            SSN: {selectedPatient.ssn}<br />
            Occupation {selectedPatient.occupation}
            <AddEntryForm />
            <h2>Entries</h2>
            {selectedPatient.entries.map((e: Entry) => <OneEntry entry={e} key={e.id} />)}
        </div>
    );

};
const OneEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={entry} />;
        case 'OccupationalHealthcare':
            return <Occupational entry={entry} />;
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
    }
};
const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div className="ui card">
            <div className="content">
                <Header as='h2'>{entry.date} <Icon name="hospital" /></Header>
                {entry.description}
                {(entry.diagnosisCodes) ? <DiagnosisCodes codes={entry.diagnosisCodes} /> : null}
                <div>Discharged {entry.discharge.date} / {entry.discharge.criteria}</div>
                <div>{entry.specialist}</div>
            </div>
        </div>
    );
};
const Occupational: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
    return (
        <div className="ui card">
            <div className="content">
                <Header as='h2'>{entry.date} <Icon name="cog" /> {entry.employerName} </Header>
                {entry.description}
                {(entry.diagnosisCodes) ? <DiagnosisCodes codes={entry.diagnosisCodes} /> : null}
                <div>Sickleave: {(entry.sickLeave) ? <span>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</span> : <span>None</span>}</div>
                <div>{entry.specialist}</div>
            </div>
        </div>
    );
};
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const sytamia = (rating: HealthCheckRating) => {
        switch(rating) {
            case HealthCheckRating.Helathy:
                return <Icon name='heart' color='green'/>;
            case HealthCheckRating.LowRisk:
                return <Icon name='heart' color='yellow' />;
            case HealthCheckRating.CriticalRisk:
                return <Icon name='heartbeat' color='red' />;
            default: 
                return <Icon name='heart' color='red' />;
        }
    };
    return (
        <div className="ui card">
            <div className="content">
                <Header as='h2'>{entry.date}<Icon name="doctor" /></Header>
                <div>{sytamia(entry.healthCheckRating)}</div>
                {entry.description}
                {(entry.diagnosisCodes) ? <DiagnosisCodes codes={entry.diagnosisCodes} /> : null}
                <div>{entry.specialist}</div>
            </div>
        </div>
    );
};
const DiagnosisCodes = ({ codes }: { codes: Array<string> }) => {

    const [{ diagnosisList } ] = useStateValue();

    const codeToText = (code: string): string => {
        if (!diagnosisList || diagnosisList?.length < 1) return 'NA';
        const diagnoosi: Diagnosis | undefined = diagnosisList?.find(d => d.code === code);
        if (!diagnoosi) return 'N/A';
        return diagnoosi.name;
    };
    return (
        <ul>
            {codes.map((c: string, i: number) => <li key={`${c}${i}`}><b>{c}</b> {codeToText(c)}</li>)}
        </ul>
    );
};
export default PatientInfoPage;
