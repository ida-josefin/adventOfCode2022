const fs = require('fs/promises');

async function readStrategyData() {
    const strategyData = await fs.readFile('data.txt', { encoding: 'utf8' });
    return strategyData;
}

(async ()=>{
    const guide = await readStrategyData();
    let strategyArray;

    const replaceLettersWithWeapon = () => {
        strategyArray = guide.split('\n')
        .map(letter => letter.replace('A', 'rock')
        .replace('B', 'paper')
        .replace('C', 'scissors')
        .replace('X', 'rock')
        .replace('Y', 'paper')
        .replace('Z', 'scissors'));
    }
    replaceLettersWithWeapon();

    let scorePartOne = 0;
    let scorePartTwo = 0;

    for (let i in strategyArray) {
        strategyArray[i] = strategyArray[i].split(' ');

        let competitorWeapon = strategyArray[i][0];
        let chosenWeapon = strategyArray[i][1];

        //For part two
        let chosenStrategy = strategyArray[i][1];

        const drawScore = 3;
        const winningScore = 6;

        const weaponScore = {
            rock: 1,
            paper: 2,
            scissors: 3
        };

        const addWeaponScore = (weapon) => {
            if(weapon === 'rock') {
                scorePartOne += weaponScore.rock;
            } else if (weapon === 'paper'){
                scorePartOne += weaponScore.paper;
            } else if (weapon === 'scissors') {
                scorePartOne += weaponScore.scissors;
            }
        }
        addWeaponScore(chosenWeapon);
        
        const winsOver = {
            paper: 'rock',
            scissors: 'paper',
            rock: 'scissors'
        };

        if(winsOver[chosenWeapon] === competitorWeapon) {
            scorePartOne += winningScore;
        } else if (competitorWeapon === chosenWeapon) {
            scorePartOne = scorePartOne + drawScore;
        }

        const strategy = {
            rock: 'lose',
            paper: 'draw',
            scissors: 'win'
        };

        const loseOver = {
            paper: 'scissors',
            scissors: 'rock',
            rock: 'paper'
        };
        
        if(strategy[chosenStrategy] === 'draw') {
            chosenStrategy = competitorWeapon;
            scorePartTwo += drawScore;
        } else if (strategy[chosenStrategy] === 'win') {
            chosenStrategy = loseOver[competitorWeapon];
            scorePartTwo += winningScore;
        } else if (strategy[chosenStrategy] === 'lose') {
            chosenStrategy = winsOver[competitorWeapon];
        }
        scorePartTwo += weaponScore[chosenStrategy]
    }
}
)();