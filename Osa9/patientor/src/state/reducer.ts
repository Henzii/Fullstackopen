import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export const setPatientList = ( list:Patient[] ):Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: list
  };
};
export const setDiagnoses = ( diagnoses: Diagnosis[]):Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnoses,
  };
};
export const setPatient = ( patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};
export const addPatient = ( patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};
export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosisList: action.payload
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        selectedPatient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
