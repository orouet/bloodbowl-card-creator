

function getLatestPlayerDataName() {
    return "latestPlayerData";
}


function loadLatestPlayerData() {
    var latestCardName = window.localStorage.getItem("latestCardName");
    if (latestCardName == null) {
        latestCardName = "BloodBowl_Card";
    }
    //console.log("Loading '" + latestCardName + "'...");
    var data = loadPlayerData(latestCardName);
    if (data) {
        //console.log("Loaded data:");
        //console.log(data);
    } else {
        //console.log("Failed to load data, loading defaults.");
        data = defaultPlayerData();
    }
    return data;
}


function loadPlayerData(PlayerDataName) {
    if (!PlayerDataName) {
        return null;
    }
    var map = loadPlayerDataMap();
    if (map[PlayerDataName]) {
        return map[PlayerDataName];
    }
    return null;
}


function loadPlayerDataMap() {
    var storage = window.localStorage.getItem("PlayerDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["BloodBowl_Card"] = defaultPlayerData();
    savePlayerDataMap(map);
    return map;
}


function saveLatestPlayerData() {
    var PlayerData = readControls();
    if (!PlayerData.name) {
        return;
    }
    window.localStorage.setItem("latestCardName", PlayerData.name);
    //savePlayerData(PlayerData);
}


async function savePlayerData(PlayerData) {
    var finishSaving = function () {
        var map = loadPlayerDataMap();
        map[PlayerData.name] = PlayerData;
        window.localStorage.setItem("PlayerDataMap", JSON.stringify(map));
    };
    if (PlayerData != null && PlayerData.name) {
        // handle images we may have loaded from disk...
        PlayerData.imageUrl = await handleImageUrlFromDisk(PlayerData.imageUrl);
        finishSaving();
    }
}


function savePlayerDataMap(newMap) {
    window.localStorage.setItem("PlayerDataMap", JSON.stringify(newMap));
}

