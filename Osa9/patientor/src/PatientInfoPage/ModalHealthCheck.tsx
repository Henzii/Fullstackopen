import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';

type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

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
                type: 'HealthCheck',
                date: new Date().toLocaleDateString(),
                healthCheckRating: 0,
            }}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
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
                                label="Health rating"
                                name="healthCheckRating"
                                min={0}
                                max={3}
                                component={NumberField}
                            />
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button color="red" onClick={() => setModal(false)} type="button">Cancel</Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button type="submit" color="green" floated="right" disabled={(!isValid || !dirty)}>Add</Button>
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