import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routers/diagnoseRouter';
import patientRouter from './routers/patientsRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter) ;


app.get('/api/ping', (_req, res) => {
    console.log('Ping? Pong!');
    res.send('pong');
});
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});