var hashes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

window.onhashchange = SwitchToStateUrl;
var SPAStateH = {};

function SwitchToStateUrl() {
    var URLHash = window.location.hash;
    var StateStr = URLHash.substr(1);

    if (StateStr != "") {
        var PartsA = StateStr.split("_")
        SPAStateH = { pagename: PartsA[0] };
    } else
        SPAStateH = { pagename: 'one' };

    switch (SPAStateH.pagename) {
        case 'one':
            menuItems[0].checked = true;
            moveBlocks();
            break;
        case 'two':
            menuItems[1].checked = true;
            moveBlocks();
            break;
        case 'three':
            menuItems[2].checked = true;
            moveBlocks();
            break;
        case 'four':
            menuItems[3].checked = true;
            moveBlocks();
            break;
        case 'five':
            menuItems[4].checked = true;
            moveBlocks();
            break;
        case 'six':
            menuItems[5].checked = true;
            moveBlocks();
            break;
        case 'seven':
            menuItems[6].checked = true;
            moveBlocks();
            break;
        case 'eight':
            menuItems[7].checked = true;
            moveBlocks();
            break;
        case 'nine':
            menuItems[8].checked = true;
            moveBlocks();
            break;
    }
}

function SwitchToState(hashName) {
    var StateStr = hashName;
    location.hash = StateStr;
    console.log(StateStr);
}

SwitchToStateUrl();