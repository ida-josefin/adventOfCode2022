const fs = require('fs/promises');

async function readCaloriesData() {
    const caloriesData = await fs.readFile('data.txt', { encoding: 'utf8' });
    return caloriesData;
}

(async ()=>{
    const caloriesData = await readCaloriesData();
    const caloriesPerElfArray = [];

    const calculateCaloriesPerElf = (array) => {
        let elfCalories = 0;
        for (let calorieAmount in array) {
            elfCalories += array[calorieAmount];
        }
        caloriesPerElfArray.push(elfCalories);
        return caloriesPerElfArray;
    }

    const fromStringToNumber = (strings) => {
        for (let i in strings) {
            strings[i] = strings[i]
            .split('\n')
            .map(x => Number(x));
        }
    }

    const calculateTotalCaloriesPerElf = (caloriesPerElf) => {
        for (let i in caloriesPerElf) {
            calculateCaloriesPerElf(caloriesPerElf[i]);
        }
    }

    const sortCaloriesPerElfDescending = () => {
        caloriesPerElfArray.sort((a,b)=>a-b);
    }

    const initialize = () => {
        const caloriesGroupedPerElf = caloriesData.split('\n\n');
        fromStringToNumber(caloriesGroupedPerElf);
        calculateTotalCaloriesPerElf(caloriesGroupedPerElf);
        sortCaloriesPerElfDescending();
        
    }
    initialize();

    const elfWithMostCalories = caloriesPerElfArray[caloriesPerElfArray.length - 1];
    const threeElfsWithTheMostCalories = caloriesPerElfArray[caloriesPerElfArray.length - 1] + caloriesPerElfArray[caloriesPerElfArray.length - 2] + caloriesPerElfArray[caloriesPerElfArray.length - 3];
    }
)();