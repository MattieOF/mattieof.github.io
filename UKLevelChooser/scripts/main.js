const levelCount = 23; // Including secret levels and P-1

const levelDictionary =
{
    1: "0-1: INTO THE FIRE",
    2: "0-2: THE MEATGRINDER",
    3: "0-3: DOUBLE DOWN",
    4: "0-4: A ONE-MACHINE ARMY",
    5: "0-5: CERBERUS",
    6: "0-S: SOMETHING WICKED",
    7: "1-1: HEART OF SUNRISE",
    8: "1-2: THE BURNING WORLD",
    9: "1-3: THE HALLS OF SACRED REMAINS",
    10: "1-4: CLAIR DE LUNE",
    11: "1-S: THE WITLESS",
    12: "2-1: BRIDGEBURNER",
    13: "2-2: DEATH AT 20,000 VOLTS",
    14: "2-3: SHEER HEART ATTACK",
    15: "2-4: COURT OF THE CORPSE KING",
    16: "2-S: ALL-IMPERFECT LOVE SONG",
    17: "3-1: BELLY OF THE BEAST",
    18: "3-2: IN THE FLESH",
    19: "P-1: SOUL SURVIVOR",
    20: "4-1: SLAVES TO POWER",
    21: "4-2: GOD DAMN THE SUN",
    22: "4-3: A SHOT IN THE DARK",
    23: "4-4: CLAIR DE SOLEIL"
}

const secretLevels = [6, 11, 16];
const primeSanctums = [19];
const bossLevels = [5, 10, 15, 18, 23];
const normalLevels = [1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 20, 21, 22];

var prevIndex = -1;

// Set to random level on load
window.onload = function() { getLevel(); };

function getLevel()
{
    var includeSecretsChecked = document.getElementById("includeSecrets").checked;
    var includeBossesChecked = document.getElementById("includeBosses").checked;
    var includePrimeChecked = document.getElementById("includePrime").checked;
    var includeNormalChecked = document.getElementById("includeNormal").checked;

    if (!includeNormalChecked && !includePrimeChecked && !includeBossesChecked && !includeSecretsChecked) 
    {
        alert("No levels selected!");
        return;
    }

    var validLevelIndexes = [];
    if (includeSecretsChecked) validLevelIndexes = validLevelIndexes.concat(secretLevels);
    if (includePrimeChecked) validLevelIndexes = validLevelIndexes.concat(primeSanctums);
    if (includeBossesChecked) validLevelIndexes = validLevelIndexes.concat(bossLevels);
    if (includeNormalChecked) validLevelIndexes = validLevelIndexes.concat(normalLevels);
    
    if (validLevelIndexes.length > 1)
        validLevelIndexes = validLevelIndexes.filter(i => i !== prevIndex); // Remove prevIndex from the valid indexes if it exists
    
    var index = randomNumber(0, validLevelIndexes.length - 1);

    document.getElementById("levelTitle").innerText = levelDictionary[validLevelIndexes[index]];
    document.body.style.background = "#202020 url('images/" + validLevelIndexes[index] + ".png') no-repeat right top";

    prevIndex = validLevelIndexes[index];
}

function randomNumber(min, max)
{
    var val = Math.floor(Math.random() * (max + 1));
    if (val < min) val = min;
    return val;
}
