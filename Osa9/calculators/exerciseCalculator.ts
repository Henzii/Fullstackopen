interface TrainingStats {
    days: number,
    trainingDays: number,
    target: number,
    average: number,
    rating: number,
    ratingDesc: string
}
interface ParsedArgs {
    target: number,
    hours: Array<number>,
}
export const calculateExercises = ({ hours, target }: ParsedArgs): TrainingStats => {
    const average = hours.reduce((p, c) => (p + c), 0) / hours.length;
    let rating = 1;
    let ratingDesc = 'Try not to fail next time.';
    const comp = average - target;
    if (comp > 0.5) {
        rating = 3;
        ratingDesc = 'Well done, keep up the good work!';
    }
    else if (comp > -0.5) {
        ratingDesc = 'Meh.. You could do better.';
        rating = 2;
    }

    return {
        days: hours.length,
        trainingDays: hours.filter(d => d > 0).length,
        target,
        average,
        rating,
        ratingDesc,
    };
};
export const validateAndParseArgs = (args: Array<string>): ParsedArgs => {
    
    const hours = [];

    const checkIfValidNumer = (num: string) => {
        if (isNaN(Number(num))) throw new Error(`malformatted parameters`);
    };

    if (args.length < 2) throw new Error('parameters missing');
//    else if (process.argv.length > 50) throw new Error('Too many parameters')

    checkIfValidNumer(args[0]);

    for(let i=1;i<args.length;i++) {
        checkIfValidNumer(args[i]);
        hours.push(Number(args[i]));
    }
    return {
        hours,
        target: Number(args[0]),
    };
};
try {
    const [ , , ...thisIneed ] = process.argv;
    const args = validateAndParseArgs(thisIneed);
    console.log(calculateExercises(args));
} catch (e) {
    console.log(`Something went wrong, message: ${e.message}`);
}