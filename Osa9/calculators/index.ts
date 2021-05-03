import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, validateAndParseArgs } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.post('/exercises', (req, res) => {
    const body = req.body;
    let analyzedData;
    if (body.target == null || body.daily_exercises == null) {
        res.json({ error: 'parameters missing'});
        return;
    }
    try {
        analyzedData = calculateExercises( validateAndParseArgs([body.target, ...body.daily_exercises]) );
    } catch (e) {
        res.json({ error: e.message });
        return;
    }

    res.send( analyzedData );
});

app.get('/bmi', (req, res) => {
    const data = {
        height: Number(req.query.height),
        weight: Number(req.query.weight),
        bmi: ''
    };
    if (isNaN(data.weight) || isNaN(data.height)) {
        res.send( { error: 'Malformatted parameters' } );
    } else {
        data.bmi = calculateBmi(data.height, data.weight);
        res.send(data);
    }
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});