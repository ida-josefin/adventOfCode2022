const fs = require('fs/promises');

async function example() {
    const data = await fs.readFile('data.txt', { encoding: 'utf8' });
    return data;
}

(async ()=>{
    const calories = await example();

    //split elves into different strings
    const caloriesArray = calories.split('\n\n');

     //create an array that will store the sum of each elf's calories beginning from the one with the least amount
    const sortedCaloriesArray = [];

    //count the sum of one elf's calories
    const sumArray = (array) => {
        let sum = 0;
        for (let i in array) {
            sum += array[i];
        }
        sortedCaloriesArray.push(sum);
    }

    for (let i in caloriesArray) {
        //put one elf's calories into one row and make the calories strings into numbers
        caloriesArray[i] = caloriesArray[i]
        .split('\n')
        .map(x => Number(x));

        //count the sum of one elfs calories
        sumArray(caloriesArray[i]);
    }

    //sort which elf has the highest amount of calories
    sortedCaloriesArray.sort((a,b)=>a-b);

    console.log('The answer for part one is: ' + sortedCaloriesArray[sortedCaloriesArray.length - 1]);
    console.log('The answer for part two is: ' + (sortedCaloriesArray[sortedCaloriesArray.length - 1] + sortedCaloriesArray[sortedCaloriesArray.length - 2] + sortedCaloriesArray[sortedCaloriesArray.length - 3]));
    }
)();