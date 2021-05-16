import { Field, Formik, Form} from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

type EntryFormValues = Omit<HospitalEntry, 'id'>;

type ErrorTypeSingle = {
    [field: string]: string
};
type ErrorTypeNested = {
    [field: string]: {
        [field: string]: string
    }
};
type ErrorTypes = ErrorTypeSingle | ErrorTypeNested;

const modalHealthCheck = (
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
                type: 'Hospital',
                date: new Date().toLocaleDateString(),
                discharge: {
                    date: "",
                    criteria: "",
                }
            }}
            validate={values => {
                const requiredError = "Field is required";
                let errors: ErrorTypes = {};
                const dateErrors: { date?: string, criteria?: string } = {};
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.discharge.date) {
                    errors = {...errors, discharge: { date: requiredError }};
                }
                if (!Date.parse(values.discharge.date)) {
                    dateErrors.date = 'Parse Error!';
                }
                if (!values.discharge.criteria) {
                    dateErrors.criteria = requiredError;
                }
                if (dateErrors.date || dateErrors.criteria ) {
                    errors = {...errors, discharge: dateErrors };
                }
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
                                label="Discharge date"
                                placeholder="Date patient discharged"
                                name="discharge.date"
                                component={TextField}
                            />
                            <Field 
                                label="Criteria"
                                placeholder="Discharge criteria"
                                name="discharge.criteria"
                                component={TextField}
                            />

                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button color="red" onClick={() => setModal(false)} type="button">Cancel</Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button disabled={(!isValid || !dirty)} type="submit" color="green" floated="right">Add</Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    );
                }
            }
        </Formik>
    );
};

export default modalHealthCheck;