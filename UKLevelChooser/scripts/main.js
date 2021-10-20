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

// Set to random level on load
window.onload = function() { getLevel(); };

function getLevel()
{
    if (document.getElementById("includeSecrets").checked == false && document.getElementById("includePrime").checked == false && 
        document.getElementById("includeBosses").checked == false && document.getElementById("includeNormal").checked == false) 
    {
        alert("No levels selected!");
        return;
    }

    var index = -1;

    do
    {
        index = randomNumber(1, levelCount);
    } while (validIndex(index) == false);

    document.getElementById("levelTitle").innerText = levelDictionary[index];
    document.body.style.background = "#202020 url('images/" + index + ".png') no-repeat right top";
}

function validIndex(index)
{
    // TODO: Better solution would be concatenating all selected lists together
    // when needed, and choosing a random element from that
    
    if (index < 1 || index > levelCount) return false;
    if (document.getElementById("includeNormal").checked == false && normalLevels.includes(index)) return false;
    if (document.getElementById("includeSecrets").checked == false && secretLevels.includes(index)) return false;
    if (document.getElementById("includePrime").checked == false && primeSanctums.includes(index)) return false;
    if (document.getElementById("includeBosses").checked == false && bossLevels.includes(index)) return false;
    return true;
}

function randomNumber(min, max)
{
    var val = Math.floor(Math.random() * (max + 1));
    if (val < min) val = min;
    return val;
}
