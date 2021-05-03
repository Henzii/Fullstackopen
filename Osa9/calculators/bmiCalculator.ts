interface HeightAndWeight {
    height: number,
    weight: number
}
export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height/100, 2);
    if (bmi > 25) {
        return "Overweight";
    } else if (bmi > 18.5) {
        return "Normal (healthy weight)";
    } else return "Underweight";
};
const parseArgs = (): HeightAndWeight => {
    if (process.argv.length != 4) throw new Error('Invalid argument count');
    if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3])) ) {
        throw new Error('Invalid argument type');
    }
    return { 
        height: Number(process.argv[2]),
        weight: Number(process.argv[3]) 
    };
};
try {
    const { height, weight } = parseArgs();
    console.log( calculateBmi( height, weight ) );
} catch(e) {
    console.log('Something went wrong, message:', e.message);
}
