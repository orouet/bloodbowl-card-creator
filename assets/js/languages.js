var Dictionaries = {
    en: {
        Save: "Save",
        cardName: "BloodBowlCard",
        teamName: "Team Name",
        playerName: "Card Name",
        positionName: "Linemen",
        cardText: "Body Text."
    },
    fr: {
        Save:"Enregistrer",
        cardName: "BBC",
        teamName: "Nom de l'équipe",
        playerName: "Nom de la carte",
        positionName: "Trois-quart",
        cardText: "Liste des skills."
    }
};

//console.log(Dictionaries);

class Translator {
    constructor(Dictionaries, language) {
        this.Dictionary = false;
        if (Dictionaries.hasOwnProperty(language)) {
            this.Dictionary = Dictionaries[language];
        }
        return;
    }
    getStr(str) {
        if (this.Dictionary == false) {
            return str;
        } else {
            if (this.Dictionary.hasOwnProperty(str)) {
                return  this.Dictionary[str];
            }
        }
    }
}

var translator = new Translator(Dictionaries, "en");
