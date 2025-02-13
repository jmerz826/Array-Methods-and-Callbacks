const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(item => item['Year'] === 2014 && item['Stage'] === 'Final');

// console.log(finals2014);

//(a) Home Team name for 2014 world cup final
// console.log('1a ' + finals2014[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final

//(c) Home Team goals for 2014 world cup final

//(d) Away Team goals for 2014 world cup final

//(e) Winner of 2014 world cup final */
// console.log('1e ' + finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {

    const result = data.filter(el => el['Stage'] === 'Final');
    return result;
}

// console.log(getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, getFinalsCb) {
    const years = getFinalsCb(arr).map(el => (el['Year']));

    return years;
}

// console.log(getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, getFinalsCb) {
    return getFinalsCb(arr).map(el => el['Home Team Goals'] > el['Away Team Goals'] ? el['Home Team Name'] : el['Away Team Name']);
}

// console.log(getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, getYearsCb, getWinnersCb) {
    const winners = getWinnersCb(arr, getFinals);
    const years = getYearsCb(arr, getFinals);

    const result = [];

    for (let i = 0; i < winners.length; i++){
        result.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }

    return result;
}
getWinnersByYear(fifaData, getYears, getWinners);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(arr) {   
    const averageGoals = arr.reduce(function (acc, item) {
        return acc + item['Home Team Goals'] + item['Away Team Goals'];
    }, 0);
    return (averageGoals / arr.length).toFixed(2);
}

// console.log(getAverageGoals(fifaData));




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    // Init counter set to 0. will increment each time forEach loop finds a match
    let winCount = 0;

    data.forEach(function (el) {
        if (el['Stage'] === 'Final') {
            if ((teamInitials === el['Home Team Initials'] && el['Home Team Goals'] > el['Away Team Goals']) || (teamInitials === el['Away Team Initials'] && el['Away Team Goals'] > el['Home Team Goals'])) {
                ++winCount;
            }
        }
        });
    return winCount;
}

// console.log(getCountryWins(fifaData, 'BRA'));


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const finalsData = data.filter(item => item['Stage'] === 'Final');
    let goalObj = {};
    let appearancesObj = {}

    finalsData.forEach(function (game) {
        if (goalObj[game['Away Team Initials']] === undefined) {
            goalObj[game['Away Team Initials']] = game['Away Team Goals'];
        } else {
            goalObj[game['Away Team Initials']] += game['Away Team Goals'];
        }
        if (goalObj[game['Home Team Initials']] === undefined) {
            goalObj[game['Home Team Initials']] = game['Home Team Goals'];
        } else {
            goalObj[game['Home Team Initials']] += game['Home Team Goals'];
        }
    });
    console.log(goalObj);

    finalsData.forEach(function (game) {
        if (appearancesObj[game['Away Team Initials']] === undefined) {
            appearancesObj[game['Away Team Initials']] = 1;
        } else {
            appearancesObj[game['Away Team Initials']]++;
        }
        if (appearancesObj[game['Home Team Initials']] === undefined) {
            appearancesObj[game['Home Team Initials']] = 1;
        } else {
            appearancesObj[game['Home Team Initials']]++;
        }
    });

    console.log(appearancesObj);

    const averageGoals = [];
    const goalArr = Object.values(goalObj);
    const appearanceArr = Object.values(appearancesObj);
    console.log(appearanceArr);




    // let winner = Object.keys(goalObj).reduce((a,b) => goalObj[a] > goalObj[b] ? a : b)
        
    // return winner;
}

console.log(getGoals(fifaData));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
