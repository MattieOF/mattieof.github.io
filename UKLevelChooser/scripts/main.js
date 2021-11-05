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
    23: "4-4: CLAIR DE SOLEIL",
    24: "4-S: CLASH OF THE BRANDICOOT",
}

const secretLevels = [6, 11, 16, 24];
const primeSanctums = [19];
const bossLevels = [5, 10, 15, 18, 23];
const normalLevels = [1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 20, 21, 22];

var prevIndex = -1;
var uiVisible = true;
var currentIndex = 0;

// Set to random level on load
window.onload = function() { getLevel(); };

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) return;

    switch (event.code)
    {
        case "KeyU":
            toggleUI();
            break;
        case "ArrowRight":
            next();
            break;
        case "ArrowLeft":
            previous();
            break;
        case "Enter":
        case "Space":
            getLevel();
            break;
    }
}, true);

function getLevel()
{
    var validLevelIndexes = getValidIndexes();

    if (validLevelIndexes.length == 0) 
    {
        alert("No levels selected!");
        return;
    }
    
    if (validLevelIndexes.length > 1)
        validLevelIndexes = validLevelIndexes.filter(i => i !== prevIndex); // Remove prevIndex from the valid indexes if it exists
    
    var index = randomNumber(0, validLevelIndexes.length - 1);
    setLevel(validLevelIndexes[index]);
}

function getValidIndexes()
{
    var includeSecretsChecked = document.getElementById("includeSecrets").checked;
    var includeBossesChecked = document.getElementById("includeBosses").checked;
    var includePrimeChecked = document.getElementById("includePrime").checked;
    var includeNormalChecked = document.getElementById("includeNormal").checked;

    var validLevelIndexes = [];
    if (includeSecretsChecked) validLevelIndexes = validLevelIndexes.concat(secretLevels);
    if (includePrimeChecked) validLevelIndexes = validLevelIndexes.concat(primeSanctums);
    if (includeBossesChecked) validLevelIndexes = validLevelIndexes.concat(bossLevels);
    if (includeNormalChecked) validLevelIndexes = validLevelIndexes.concat(normalLevels);
    return validLevelIndexes;
}

function setLevel(index)
{
    console.log("Setting level to " + index);
    document.getElementById("levelTitle").innerText = levelDictionary[index];
    document.body.style.background = "#202020 url('images/" + index + ".png') no-repeat left top";
    document.body.style.backgroundSize = "cover";

    prevIndex = index;
    currentIndex = index;
}

function randomNumber(min, max)
{
    var val = Math.floor(Math.random() * (max + 1));
    if (val < min) val = min;
    return val;
}

function toggleUI()
{
    var elements = [document.getElementById("settings"), document.getElementById("button"), document.getElementById("header")];

    if (uiVisible) {
        elements.forEach(element => {element.style.display = "none";});
    } else {
        elements.forEach(element => {element.style.display = "";});
    }

    uiVisible = !uiVisible;
}

function next()
{
    var validIndexes = getValidIndexes();
    validIndexes.sort(function(a, b) {return a - b});
    var prevIndex = validIndexes.findIndex(element => {return element == currentIndex});
    if (prevIndex != validIndexes.length - 1)
    {
        setLevel(validIndexes[prevIndex + 1]);
    }
}

function previous()
{
    var validIndexes = getValidIndexes();
    validIndexes.sort(function(a, b) {return a - b});
    var prevIndex = validIndexes.findIndex(element => {return element == currentIndex});
    if (prevIndex != 0)
    {
        setLevel(validIndexes[prevIndex - 1]);
    }
}
