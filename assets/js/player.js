function defaultPlayerData() {
    var PlayerData = new Object;
    // console.log(translator.getStr("playerName"));
    // Description
    PlayerData.name = translator.getStr("playerName");
    PlayerData.playerName = translator.getStr("playerName");
    PlayerData.teamName = translator.getStr("teamName");
    PlayerData.positionName = translator.getStr("positionName");
    PlayerData.GP = "50 000";
    // Photo
    PlayerData.imageUrl = null;
    PlayerData.imageProperties = getDefaultModelImageProperties();
    // Stats
    PlayerData.ma = 6;
    PlayerData.st = 3;
    PlayerData.ag = 3;
    PlayerData.pa = 4;
    PlayerData.av = 9;
    // Skills
    PlayerData.p_agility = false;
    PlayerData.p_general = true;
    PlayerData.p_passing = false;
    PlayerData.p_mutations = false;
    PlayerData.p_strength = true;
    PlayerData.s_agility = true;
    PlayerData.s_general = false;
    PlayerData.s_passing = false;
    PlayerData.s_mutations = false;
    PlayerData.s_strength = false;
    // Text
    PlayerData.cardText = translator.getStr("cardText");
    return PlayerData;
}