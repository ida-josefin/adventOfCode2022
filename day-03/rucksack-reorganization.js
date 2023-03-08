const fs = require('fs/promises');

async function readItemsData() {
    const data = await fs.readFile('data.txt', { encoding: 'utf8' });
    return data;
}

(async ()=>{
    const items = await readItemsData();
    const itemsArray = items.split('\n');

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpperCase = alphabet.toUpperCase();

    const checkForDuplicates = (counter, duplicates) => {
        itemsArray.forEach((row) => {
            let firstHalf = row.substring(0, (row.length/2));
            let secondHalf = row.substring((row.length/2), row.length);
    
            for (let i in firstHalf) {
                for (let j in secondHalf) {
                    if (firstHalf[i] == secondHalf[j] && counter < 1) {
                        duplicates.push(firstHalf[i]);
                        counter = 1;
                    } 
                }
            }
            counter = 0;
        })
    }

    const divideIntoGroupsOfThree = () => {
        const threeRows = [];
        for (let i = 0; i < itemsArray.length; i = i+3) {
            const groups = itemsArray[i] + ' '
            .concat(itemsArray[i+1])+ ' '
            .concat(itemsArray[i+2]);
            threeRows.push(groups);
        }
        return threeRows;
    }

    const checkForTriplicates = (counter, triplicates) => {
        const rows = divideIntoGroupsOfThree();
        rows.forEach((row) => {
            groupsOfThree = row.split(' ');

            let firstRow = groupsOfThree[0];
            let secondRow = groupsOfThree[1];
            let thirdRow = groupsOfThree[2];

            for (let i in firstRow) {
                for (let j in secondRow) {
                    for (let k in thirdRow) {
                        if (firstRow[i] == secondRow[j] 
                            && firstRow[i] == thirdRow[k]
                            && counter < 1) {
                            triplicates.push(firstRow[i]);
                            counter = 1;
                        } 
                    }
                }
            }
            counter = 0;
        })
    }

    const checkPriorityPartOne = (duplicates) => {
        let priority = 0;
        for (let i in duplicates) {
            if (alphabet.indexOf(duplicates[i]) > -1 ) {
               priority = priority + alphabet.indexOf(duplicates[i]) + 1;
            } else if (alphabetUpperCase.indexOf(duplicates[i]) > -1) {
                priority = priority + alphabetUpperCase.indexOf(duplicates[i]) + 27;
            }
        }
    }

    const checkPriorityPartTwo = (triplicates) => {
        let priorityPartTwo = 0;
        for (let i in triplicates) {
            if (alphabet.indexOf(triplicates[i]) > -1 ) {
               priorityPartTwo = priorityPartTwo + alphabet.indexOf(triplicates[i]) + 1;
            } else if (alphabetUpperCase.indexOf(triplicates[i]) > -1) {
                priorityPartTwo = priorityPartTwo + alphabetUpperCase.indexOf(triplicates[i]) + 27;
            }
        }
    }

    const initialize = () => {
        const duplicates = [];
        const triplicates = [];
        let count = 0;
        checkForDuplicates(count, duplicates);
        divideIntoGroupsOfThree();
        checkForTriplicates(count, triplicates);
        checkPriorityPartOne(duplicates);
        checkPriorityPartTwo(triplicates);
    }
    initialize();
}
)();