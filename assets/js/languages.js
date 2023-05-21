const Dictionaries = {
    en: {
        Save: "Save",
        playerName: "Default Card Name",
        teamName: "Default Team Name",
        playerName: "Default Player Name",
        positionName: "Default Position Name",
        cardText: "Default Card Text.",
        skillsPrimary: "Primary:",
        skillsSecondary: "Secondary:",
        skillsPrimaries: "Primaries:",
        skillsSecondaries: "Secondaries:",
        agility: "agility",
        general: "general",
        mutations: "mutations",
        passing: "passing",
        strength: "strength",
        skillsMin1: "Min 1 skill",
        skillsMax3: "Max 3 skills",
    },
    fr: {
        Save:"Enregistrer",
        playerName: "BBC",
        teamName: "Bloomy ChouX",
        playerName: "Chou Fleur",
        positionName: "Human Linemen",
        cardText: "Néant.",
        skillsPrimary: "Principale : ",
        skillsSecondary: "Secondaire : ",
        skillsPrimaries: "Principales : ",
        skillsSecondaries: "Secondaires : ",
        agility: "agilité",
        general: "général",
        mutations: "mutations",
        passing: "passe",
        strength: "force",
        skillsMin1: "Mininum 1 compétence",
        skillsMax3: "Maximum 3 compétences",
    }
};

//console.log(Dictionaries);

class Translator {
    constructor(Dictionaries, language) {
        this.Dictionary = false;
        if (Dictionaries.hasOwnProperty(language)) {
            console.log("Loading dictionnary '" + language + "'");
            this.Dictionary = Dictionaries[language];
        } else {
            console.log("Cannot load dictionnary " + language + "'");
        }
        return;
    }
    getStr(str) {
        if (this.Dictionary == false) {
            return str;
        } else {
            if (this.Dictionary.hasOwnProperty(str)) {
                return  this.Dictionary[str];
            } else {
                console.log("Cannot find string " + str + " in dictionnary " + language + "'");
                return str;
            }
        }
    }
}

