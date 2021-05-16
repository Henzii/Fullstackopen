/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Entry, HealthCheckRating, Patient } from '../types';

import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { Button, Dropdown, Modal, Select } from 'semantic-ui-react';
import { setPatient, useStateValue } from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import HealthRatingBar from '../components/HealthRatingBar';
import ModalHealthCheck from './ModalHealthCheck';
import ModalHospital from './ModalHospital';
import ModalWork from './ModalWork';

type EntryFormValues = Omit<Entry, 'id'>;

const AddEntryForm = () => {

    const [{ diagnosisList, selectedPatient }, dispatch] = useStateValue();
    const [modalOpened, setModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const openModal = (modalType:string) => {
        setModalType(modalType);
        setModal(true);
    };

    const onSubmit = async (values: EntryFormValues) => {
        console.log('Submitting ', values);
        if (!selectedPatient) return;
        try {
            const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${selectedPatient.id}/entries`, values);
            const newPatient: Patient = { ...selectedPatient, entries: selectedPatient.entries.concat(newEntry) };
            dispatch(setPatient(newPatient));

        } catch (e) {
            console.log("Error while aqdding entry, message: ", e.message);
        }
    };
    const modalContent = () => {
        if (modalType === 'Health')
            return <ModalHealthCheck setModal={setModal} addEntry={onSubmit} />;
        else if (modalType === 'Hospital')
            return <ModalHospital setModal={setModal} addEntry={onSubmit} />;
        else if (modalType === 'Work')
            return <ModalWork setModal={setModal} addEntry={onSubmit} />;
    };
    return (
        <div>
            <h2>Add Entry</h2>
            <Button onClick={() => openModal( "Health" ) }>HealthCheck</Button>
            <Button onClick={() => openModal( "Hospital" ) }>Hospital</Button>
            <Button onClick={() => openModal( "Work" )}>Occupational</Button>
            <Modal open={modalOpened} closeIcon onClose={() => setModal(false)}>
                <Modal.Header>Add {modalType} entry</Modal.Header>
                <Modal.Content>
                    {modalContent()}
                </Modal.Content>
            </Modal>

        </div>
    );
};

export default AddEntryForm;
