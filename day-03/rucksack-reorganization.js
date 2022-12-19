const fs = require('fs/promises');

async function example() {
    const data = await fs.readFile('data.txt', { encoding: 'utf8' });
    return data;
}

(async ()=>{
    const items = await example();
    const itemsArray = items.split('\n');

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpperCase = alphabet.toUpperCase();

    let priority = 0;
    let priorityPartTwo = 0;
    let count = 0;

    const duplicates = [];
    const triplicates = [];
    const threeRows = [];

    // divide row into two parts
    itemsArray.forEach((row) => {
        let firstHalf = row.substring(0, (row.length/2));
        let secondHalf = row.substring((row.length/2), row.length);

        //check for duplicates
        for (let i in firstHalf) {
            for (let j in secondHalf) {
                if (firstHalf[i] == secondHalf[j] && count < 1) {
                    duplicates.push(firstHalf[i]);
                    count = 1;
                } 
            }
        }
        count = 0;
    })

    // divide rows into groups of three
    for (let i = 0; i < itemsArray.length; i = i+3) {
        const groups = itemsArray[i] + ' '
        .concat(itemsArray[i+1])+ ' '
        .concat(itemsArray[i+2]);
        threeRows.push(groups);
    }

    threeRows.forEach((row) => {
        groupsOfThree = row.split(' ');

        let firstRow = groupsOfThree[0];
        let secondRow = groupsOfThree[1];
        let thirdRow = groupsOfThree[2];

        //check for triplicates
        for (let i in firstRow) {
            for (let j in secondRow) {
                for (let k in thirdRow) {
                    if (firstRow[i] == secondRow[j] 
                        && firstRow[i] == thirdRow[k]
                        && count < 1) {
                        triplicates.push(firstRow[i]);
                        count = 1;
                    } 
                }
            }
        }
        count = 0;
    })
  
    //check priority part one
    for (let i in duplicates) {
        if (alphabet.indexOf(duplicates[i]) > -1 ) {
           priority = priority + alphabet.indexOf(duplicates[i]) + 1;
        } else if (alphabetUpperCase.indexOf(duplicates[i]) > -1) {
            priority = priority + alphabetUpperCase.indexOf(duplicates[i]) + 27;
        }
    }

    //check priority part two
    for (let i in triplicates) {
        if (alphabet.indexOf(triplicates[i]) > -1 ) {
           priorityPartTwo = priorityPartTwo + alphabet.indexOf(triplicates[i]) + 1;
        } else if (alphabetUpperCase.indexOf(triplicates[i]) > -1) {
            priorityPartTwo = priorityPartTwo + alphabetUpperCase.indexOf(triplicates[i]) + 27;
        }
    }
    console.log('The answer to part one is: ' + priority);
    console.log('The answer to part one is: ' + priorityPartTwo);
}
)();