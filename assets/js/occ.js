function onAnyChange() {
    var PlayerData = readControls();
    render(PlayerData);
    saveLatestPlayerData();
}


function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}


function onPlayerImageUpload() {
    image = getModelImage();
    setModelImage(image);
    var PlayerData = readControls();
    render(PlayerData);
    saveLatestPlayerData();
}


function onResetToDefault() {
    var PlayerData = defaultPlayerData();
    writeControls(PlayerData);
}


async function onSaveClicked() {
    data = readControls();
    console.log(data);
    data.base64Image = await handleImageUrlFromDisk(data.imageUrl)
    // need to be explicit due to sub arrays
    var attributes = [ 
        'name', 
        'imageUrl',
        'imageProperties',
        'offsetX',
        'offsetY',
        'scalePercent', 
        'cardName',
        'cardText',
        'footer',
        'positionName',
        'ma',
        'st',
        'ag',
        'pa',
        'av', 
        'p_agility',
        'p_general',
        'p_mutations',
        'p_passing',
        'p_strength',
        's_agility',
        's_general',
        's_mutations',
        's_passing',
        's_strength', 
        'teamName',
        'base64Image'
    ];
    var exportObj = JSON.stringify(data, attributes, 4);
    var fileName = "bloodbowl_card_" + data.cardName.replace(/ /g, "_") + ".json";
    console.log(fileName);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getFighterImageUrl();
    data.imageProperties = getModelImageProperties();
    data.cardName = document.getElementById("cardName").value;
    data.teamName = document.getElementById("teamName").value;
    data.footer = document.getElementById("footer").value;
    data.cardText = document.getElementById("cardText").value;
    data.positionName = document.getElementById("positionName").value;
    data.ma = document.getElementById("ma").value;
    data.st = document.getElementById("st").value;
    data.ag = document.getElementById("ag").value;
    data.pa = document.getElementById("pa").value;
    data.av = document.getElementById("av").value;
    data.p_general = document.getElementById("p_general").checked;
    data.p_agility = document.getElementById("p_agility").checked;
    data.p_strength = document.getElementById("p_strength").checked;
    data.p_passing = document.getElementById("p_passing").checked;
    data.p_mutations = document.getElementById("p_mutations").checked;
    data.s_general = document.getElementById("s_general").checked;
    data.s_agility = document.getElementById("s_agility").checked;
    data.s_strength = document.getElementById("s_strength").checked;
    data.s_passing = document.getElementById("s_passing").checked;
    data.s_mutations = document.getElementById("s_mutations").checked;
    return data;
}


function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();
    var PlayerDataName = readControls().name;
    var map = loadPlayerDataMap();
    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (PlayerDataName &&
            key == PlayerDataName) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}


function saveCardAsImage() {
    data = readControls();
    console.log(data);
    var Canvas = document.getElementById('canvas');
    // var dataStr = Canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    var fileName = "bloodbowl_card_" + data.cardName + ".png";
    console.log(fileName);
    var dataStr = Canvas.toDataURL();
    var Anchor = document.createElement('a');
    Anchor.setAttribute('href', dataStr);
    Anchor.setAttribute('download', fileName);
    document.body.appendChild(Anchor); // required for firefox
    Anchor.click();
    Anchor.remove();
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});


async function fileChange(file) {
    // Function to be triggered when file input changes
    // As readJSONFile is a promise, it must resolve before the contents can be read
    // in this case logged to the console
    var saveJson = function (json) {
        writeControls(json);
    };
    readJSONFile(file).then(json =>
        saveJson(json)
    );
}


async function writeControls(PlayerData) {
    // here we check for base64 loaded image and convert it back to imageUrl
    if (PlayerData.base64Image != null) {
        // first convert to blob
        const dataToBlob = async (imageData) => {
            return await (await fetch(imageData)).blob();
        };
        const blob = await dataToBlob(PlayerData.base64Image);
        // then create URL object
        PlayerData.imageUrl = URL.createObjectURL(blob);
        // Now that's saved, clear out the base64 so we don't reassign
        PlayerData.base64Image = null;
    } else {
        PlayerData.imageUrl = null;
    }
    setName(PlayerData.name);
    setModelImage(PlayerData.imageUrl);
    setModelImageProperties(PlayerData.imageProperties);
    $("#cardName")[0].value = PlayerData.cardName;
    $("#teamName")[0].value = PlayerData.teamName;
    $("#footer")[0].value = PlayerData.footer;
    $("#positionName")[0].value = PlayerData.positionName;
    $("#ma")[0].value = PlayerData.ma;
    $("#st")[0].value = PlayerData.st;
    $("#ag")[0].value = PlayerData.ag;
    $("#pa")[0].value = PlayerData.pa;
    $("#av")[0].value = PlayerData.av;
    $("#cardText")[0].value = PlayerData.cardText;
    document.getElementById('p_agility').checked = PlayerData.p_agility;
    document.getElementById('p_general').checked = PlayerData.p_general;
    document.getElementById('p_mutations').checked = PlayerData.p_mutations;
    document.getElementById('p_passing').checked = PlayerData.p_passing;
    document.getElementById('p_strength').checked = PlayerData.p_strength;
    document.getElementById('s_agility').checked = PlayerData.s_agility;
    document.getElementById('s_general').checked = PlayerData.s_general;
    document.getElementById('s_mutations').checked = PlayerData.s_mutations;
    document.getElementById('s_passing').checked = PlayerData.s_passing;
    document.getElementById('s_strength').checked = PlayerData.s_strength;
    // render the updated info
    render(PlayerData);
}
