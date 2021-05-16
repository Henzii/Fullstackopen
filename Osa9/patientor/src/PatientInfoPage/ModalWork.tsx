import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthCareEntry } from '../types';

type EntryFormValues = Omit<OccupationalHealthCareEntry, 'id'>;

type ErrorTypeSingle = {
    [field: string]: string
};
type ErrorTypeNested = {
    [field: string]: {
        [field: string]: string
    }
};
type ErrorTypes = ErrorTypeSingle | ErrorTypeNested;

const modalWork = (
    { setModal, addEntry }: { setModal: (val: boolean) => void, addEntry: (val: EntryFormValues) => void }) => {

    const [{ diagnosisList }] = useStateValue();
    const onSubmit = (values: EntryFormValues) => {
        addEntry(values);
        setModal(false);
    };
    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{
                description: "",
                specialist: "",
                employerName: '',
                type: 'OccupationalHealthcare',
                date: new Date().toLocaleDateString(),
                sickLeave: {
                    startDate: '',
                    endDate: ''
                }
            }}
            validate={values => {
                const requiredError = "Field is required";
                let errors: ErrorTypes = {};
                const slErrors: { startDate?: string, endDate?: string } = {};
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (values.sickLeave?.startDate && !Date.parse(values.sickLeave.startDate)) {
                    slErrors.startDate = 'Parse error';
                }
                if (values.sickLeave?.endDate && !Date.parse(values.sickLeave.endDate)) {
                    slErrors.endDate = 'Parse error';
                }
                if (slErrors.endDate || slErrors.startDate)
                    errors = {...errors, sickLeave: slErrors};
                return errors;
            }}
        >
            {
                ({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                    return (
                        <Form className="form ui">
                            <Field
                                label="Specialist's name"
                                name="specialist"
                                placeholder="Type specialist's name here"
                                component={TextField}
                            />
                            <Field
                                label="Employer's name"
                                name="employerName"
                                placeholder="Type company's name here nao!"
                                component={TextField}
                            />

                            <DiagnosisSelection
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                diagnoses={Object.values(diagnosisList)}
                            />
                            <Field
                                label="Description"
                                placeholder="Type description"
                                name="description"
                                component={TextField}
                            />
                            <Field
                                label="Sickleave starts"
                                placeholder="Date sickleave starts"
                                name="sickLeave.startDate"
                                component={TextField}
                            />
                            <Field
                                label="Sickleave ends"
                                placeholder="Date sickleave ends"
                                name="sickLeave.endDate"
                                component={TextField}
                            />

                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button color="red" onClick={() => setModal(false)} type="button">Cancel</Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button type="submit" color="green" floated="right" disabled={(!isValid || !dirty )}>Add</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    );
                }
            }
        </Formik>
    );
};

export default modalWork;