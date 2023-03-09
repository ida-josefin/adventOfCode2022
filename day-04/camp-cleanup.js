const fs = require('fs/promises');

async function readSectionAssignments() {
    const data = await fs.readFile('data.txt', { encoding: 'utf8' });
    return data;
}

(async ()=>{
    const items = await readSectionAssignments();
    let arrayOfPairs = items.split('\n');
    let count = 0;
    let countTwo = 0;

    
    for (let index = 0; index < arrayOfPairs.length; index++) {
        const pair = arrayOfPairs[index];
        let placeOfComa = pair.indexOf(',');
        let firstRange = pair.slice(0, placeOfComa);
        let secondRange = pair.slice(placeOfComa + 1);

        let firstRangePlaceOfHyphen = firstRange.indexOf('-');
        let firstNumberInFirstRange = Number(firstRange.slice(0, firstRangePlaceOfHyphen));
        let secondNumberInFirstRange = Number(firstRange.slice(firstRangePlaceOfHyphen + 1));

        let secondRangePlaceOfHyphen = secondRange.indexOf('-');
        let firstNumberInSecondRange = Number(secondRange.slice(0, secondRangePlaceOfHyphen));
        let secondNumberInSecondRange = Number(secondRange.slice(secondRangePlaceOfHyphen + 1));

        if(firstNumberInFirstRange >= firstNumberInSecondRange && secondNumberInFirstRange <= secondNumberInSecondRange ||
            firstNumberInSecondRange >= firstNumberInFirstRange && secondNumberInSecondRange <= secondNumberInFirstRange) {
            count = count +1;
        }

        let arrayOfNumbersInFirstRange = [firstNumberInFirstRange];
        for (let j = firstNumberInFirstRange +1; j < secondNumberInFirstRange + 1; j++) {
            arrayOfNumbersInFirstRange.push(j);
        }

        let arrayOfNumbersInSecondRange = [firstNumberInSecondRange];
        for (let j = firstNumberInSecondRange +1; j < secondNumberInSecondRange + 1; j++) {
            arrayOfNumbersInSecondRange.push(j);
        }
        let counter = 0;

        const checkForCommonElements = () => {
            for(let a = 0; a < arrayOfNumbersInFirstRange.length; a++) {
                for(let b = 0; b < arrayOfNumbersInSecondRange.length; b++) {
                    if(arrayOfNumbersInFirstRange[a] === arrayOfNumbersInSecondRange[b] && counter < 1) {
                        countTwo = countTwo + 1;
                        counter = 1;
                    }
                }
            }
        }   
        checkForCommonElements();
    }
    console.log(count);
    console.log(countTwo);

}
)();
