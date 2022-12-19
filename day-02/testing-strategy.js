const fs = require('fs/promises');

async function example() {
    const data = await fs.readFile('data.txt', { encoding: 'utf8' });
    return data;
}

(async ()=>{
    const guide = await example();

    //split data rows into arrays and replace letters with their meaning
    let strategyOneArray = guide.split('\n')
    .map(letter => letter.replace('A', 'rock')
    .replace('B', 'paper')
    .replace('C', 'scissors')
    .replace('X', 'rock')
    .replace('Y', 'paper')
    .replace('Z', 'scissors'));

    //counter for the score
    let scorePartOne = 0;
    let scorePartTwo = 0;

    for (let i in strategyOneArray) {
        //delete spacing
        strategyOneArray[i] = strategyOneArray[i].split(' ');

        //set first element in the array to the competitor weapon
        let competitorWeapon = strategyOneArray[i][0];

        //set second element in the array to the chosen weapon
        let chosenWeapon = strategyOneArray[i][1];

        //set score for draws and wins
        const drawScore = 3;
        const winningScore = 6;

        //
        const weaponScore = (weapon) => {
            const chosenWeaponScore = chosenWeapon === 'rock' ? scorePartOne = scorePartOne + 1
                : chosenWeapon === 'paper' ? scorePartOne = scorePartOne + 2
                : chosenWeapon === 'scissors' ? scorePartOne = scorePartOne + 3
                : console.log('Error');
        }

        if (competitorWeapon === chosenWeapon) {
            scorePartOne = scorePartOne + drawScore;
        } 

        if (competitorWeapon === 'rock' && chosenWeapon === 'paper') { 
            scorePartOne = scorePartOne + winningScore;
            scorePartTwo = scorePartTwo + drawScore + 1;
        } else if (competitorWeapon === 'paper' && chosenWeapon === 'scissors' ) {
            scorePartOne = scorePartOne + winningScore;
            scorePartTwo = scorePartTwo + winningScore + 3;
        } else if (competitorWeapon === 'scissors' && chosenWeapon === 'rock') {
            scorePartOne = scorePartOne + winningScore;
            scorePartTwo = scorePartTwo + 2;
        } else if (competitorWeapon === 'rock' && chosenWeapon === 'scissors') {
            scorePartTwo = scorePartTwo + winningScore + 2;
        } else if (competitorWeapon === 'rock' && chosenWeapon === 'rock') {
            scorePartTwo = scorePartTwo + 3;
        } else if (competitorWeapon === 'paper' && chosenWeapon === 'rock') {
            scorePartTwo = scorePartTwo + 1;
        } else if (competitorWeapon === 'scissors' && chosenWeapon === 'paper') {
            scorePartTwo = scorePartTwo + drawScore + 3;
        } else if (competitorWeapon === 'paper' && chosenWeapon === 'paper') {
            scorePartTwo = scorePartTwo + drawScore + 2;
        } else if (competitorWeapon === 'scissors' && chosenWeapon === 'scissors') {
            scorePartTwo = scorePartTwo + winningScore + 1;
        } else {
            console.log('Something went wrong');
        }
        weaponScore(chosenWeapon);
    }

    console.log('The answer is for part one is: ' + scorePartOne);
    console.log('The answer is for part one is: ' + scorePartTwo);
}
)();