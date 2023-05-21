var Dictionaries = {
    en: {
        Save: "Save",
        cardName: "Default Card Name",
        teamName: "Default Team Name",
        playerName: "Default Player Name",
        positionName: "Default Position Name",
        cardText: "Default Card Text."
    },
    fr: {
        Save:"Enregistrer",
        cardName: "BBC",
        teamName: "Bloomy ChouX",
        playerName: "Chou Fleur",
        positionName: "Human Linemen",
        cardText: "Néant."
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

