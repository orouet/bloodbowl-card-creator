function addToImageCheckboxSelector(imgSrc, grid, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${imgSrc}">
        <img src="${imgSrc}" width="50" height="50" alt="" style="background-color:${bgColor};">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${imgSrc}" onchange="onTagRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    grid.appendChild(div);
    return div;
}


function getCanvas() {
    return document.getElementById("canvas");
}


function getContext() {
    return getCanvas().getContext("2d");
}


function getBackgroundImage() {
    return document.getElementById('bg1');
}


function drawBackground() {
    getContext().drawImage(getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}


function drawCardElementFromInput(inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}


function drawCardElementFromInputId(inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}


function drawCardFrame(PlayerData){
    getContext().drawImage(document.getElementById('frame'), 0, 0, getCanvas().width, getCanvas().height);
    if (!document.getElementById("removeBorder").checked) {
        getContext().drawImage(document.getElementById('border'), 0, 0, getCanvas().width, getCanvas().height);
    }
    drawCardName(PlayerData.cardName);
    drawCardTeamName(PlayerData.teamName);
    drawCardGP(PlayerData.footer);
    drawCardPosition(PlayerData.positionName);
    drawCardText(PlayerData.cardText);
    primary = "";
    if (PlayerData.p_agility) {
        primary = primary + "Agility";
    }
    if (primary!="" && PlayerData.p_general) {
        primary = primary + ", ";
    }
    if (PlayerData.p_general) {
        primary = primary + "General";
    }
    if (primary!="" && PlayerData.p_mutations) {
        primary = primary + ", ";
    }
    if (PlayerData.p_mutations) {
        primary = primary + "Mutations";
    }
    if (primary!="" && PlayerData.p_passing) {
        primary = primary + ", ";
    }
    if (PlayerData.p_passing) {
        primary = primary + "Passing";
    }
    if (primary!="" && PlayerData.p_strength) {
        primary = primary + ", ";
    }
    if (PlayerData.p_strength) {
        primary = primary + "Strength";
    }
    secondary = "";
    if (PlayerData.s_agility) {
        secondary = secondary + "Agility";
    }
    if (secondary!="" && PlayerData.s_general) {
        secondary = secondary + ", ";
    }
    if (PlayerData.s_general) {
        secondary = secondary + "General";
    }
    if (secondary!="" && PlayerData.s_mutations) {
        secondary = secondary + ", ";
    }
    if (PlayerData.s_mutations) {
        secondary = secondary + "Mutations";
    }
    if (secondary!="" && PlayerData.s_passing) {
        secondary = secondary + ", ";
    }
    if (PlayerData.s_passing) {
        secondary = secondary + "Passing";
    }
    if (secondary!="" && PlayerData.s_strength) {
        secondary = secondary + ", ";
    }
    if (PlayerData.s_strength) {
        secondary = secondary + "Strength";
    }
    drawCardSkills(primary, secondary);
    // MA
     drawNumber(PlayerData.ma, 130, 255, false);
    // ST
    drawNumber(PlayerData.st, 130, 395, false);
    // AG
    drawNumber(PlayerData.ag, 130, 530, true);
    // PA
    drawNumber(PlayerData.pa, 130, 670, true);
    //AV
    drawNumber(PlayerData.av, 130, 805, true);
}


function drawCardGP(value) {
    getContext().font = '30px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: 90, y: 990 });
}


function drawCardName(value) {
    if (value.length < 18) {
        getContext().font = 'italic 70px brothers-regular';
    } else {
        getContext().font = 'italic 50px brothers-regular';
    }
    var rotation = 6 * Math.PI / 180;
    var Position = {
        x: 48,
        y: 180
    };
    var Decalage = {
        x: 4,
        y: 4
    };
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    getContext().rotate(-rotation);
    //
    getContext().fillStyle = 'black';
    writeScaled(value, { x: 48 + 4, y: 180 + 4 });
    //
    getContext().fillStyle = 'white';
    writeScaled(value, { x: 48, y: 180 });
    //
    getContext().rotate(+rotation);
}


function drawCardPosition(value) {
    getContext().font = '50px brothers-regular';
    getContext().fillStyle = 'white';
    getContext().textAlign = "center";
    getContext().textBaseline = "middle";
    writeScaled(value, { x: 480, y: 1010 });
}


function drawCardSkills(primary, secondary) {
    getContext().font = 'bold 26px franklin-gothic-book';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    x = 265;
    writeScaled("Primary: ", { x: x, y: 890 });
    writeScaled("Secondary: ", { x: x, y: 930 });
    getContext().font = '30px franklin-gothic-book';
    writeScaled(primary, { x: x+95, y: 890 });
    writeScaled(secondary, { x: x+125, y: 930 });
}


function drawCardText(value) {
    getContext().font = '36px franklin-gothic-book';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    if (value.length > 90) {
        lineHeight = 30;
    } else {
        lineHeight = 42;
    }
    fitWidth = 500;
    // Trying to get a bold and italic check going
    text_array = (splitWordWrap(getContext(), value, fitWidth));
    printWithMarkup(getContext(), text_array, 265, 730, lineHeight);
}


function drawCardTeamName(value) {
    getContext().font = 'italic 40px brothers-regular';
    getContext().fillStyle = 'black';
    getContext().textAlign = "left";
    getContext().textBaseline = "middle";
    getContext().rotate(-6 * Math.PI / 180);
    writeScaled(value, { x: 60 +4, y: 125+4 });
    getContext().fillStyle = 'white';
    writeScaled(value, { x: 60, y: 125 });
    getContext().rotate(+6 * Math.PI / 180);
}


function drawModel(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: 590 + imageProps.offsetX, y: imageProps.offsetY });
            var scale = imageProps.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);
            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}


function drawNumber(num,x, y, plus) {
    if (num < 1 || num > 11 ) {
        num = '-';
        plus = false;
    }
    if (num > 9) {
        getContext().drawImage(document.getElementById('sf1'), x - 15, y, 35, 70);
        x = x + 35 - 15;
        num = num - 10;
    }
    elementId = 'sf' + num;
    if (num == 1) {
        width = 35;
        x = x + 9;
    } else {
        width = 53;
    }
    getContext().drawImage(document.getElementById(elementId), x, y, width, 70);
    if (plus) {
        getContext().drawImage(document.getElementById('sf+'), x+width, y, 39, 70);
    }
}


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}


async function getBase64ImgFromUrl(imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}


function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}


function getFighterImageUrl() {
    var imageSelect = $("#fighterImageUrl")[0].value;
    // if (imageSelect.files.length > 0) {
    //return URL.createObjectURL(imageSelect.files[0]);
    // }
    return imageSelect;
}


function getImage(element) {
    return $(element).find("img")[0];
}


function getLabel(element) {
    return $(element).prop("labels")[0];
}


function getLatestPlayerDataName() {
    return "latestPlayerData";
}


function getModelImage() {
    var imageSelect = $("#imageSelect")[0];
    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }
    return null;
}


function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}


function getName() {
    //var textInput = $("#saveNameInput")[0];
    return "BloodBowl_Card";
}


async function handleImageUrlFromDisk(imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }
    return imageUrl;
}


function loadLatestPlayerData() {
    var latestCardName = window.localStorage.getItem("latestCardName");
    if (latestCardName == null) {
        latestCardName = "BloodBowl_Card";
    }
    console.log("Loading '" + latestCardName + "'...");
    var data = loadPlayerData(latestCardName);
    if (data) {
        console.log("Loaded data:");
        console.log(data);
    } else {
        console.log("Failed to load data, loading defaults.");
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


function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}


function printAtWordWrap(context, text, x, y, lineHeight, fitWidth) {
    var lines = text.split('\n');
    lineNum = 0;
    for (var i = 0; i < lines.length; i++) {
        fitWidth = fitWidth || 0;
        if (fitWidth <= 0) {
            context.fillText(lines[i], x, y + (lineNum * lineHeight));
            lineNum ++;
        }
        var words = lines[i].split(' ');
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
            var str = words.slice(0, idx).join(' ');
            var w = context.measureText(str).width;
            if (w > fitWidth) {
                if (idx == 1) {
                    idx = 2;
                }
                context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineNum * lineHeight));
                lineNum ++;
                words = words.splice(idx - 1);
                idx = 1;
            } else {
                idx ++;
            }
        }
        if (idx > 0) {
            context.fillText(words.join(' '), x, y + (lineNum * lineHeight));
            lineNum++;
        }
    }
}


function printWithMarkup(context, text_array, x, y, lineHeight) {
    // table code style --> font style
    // Text comes in as an array
    // need to split it into lines
    for (line in text_array) {
        if (text_array[line].startsWith("**")) {
            printText = text_array[line].replace("**", '');
            context.font = 'bold 38px frutiger-light';
            context.fillStyle = '#5B150F';
            context.fillText(printText, x, y + (line * lineHeight));
            context.font = '36px frutiger-light';
            context.fillStyle = 'black';
        } else {
            context.fillText(text_array[line], x, y + (line * lineHeight));
        }
    }
}


function render(PlayerData) {
    console.log("Render:");
    console.log(PlayerData);
    // First the textured background
    getContext().drawImage(document.getElementById('bg1'), 0, 0, getCanvas().width, getCanvas().height);
    if (PlayerData.imageUrl) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: 100 + PlayerData.imageProperties.offsetX, y: PlayerData.imageProperties.offsetY });
            var scale = PlayerData.imageProperties.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);
            drawCardFrame(PlayerData);
        };
        image.src = PlayerData.imageUrl;
    }
    // next the frame elements
    drawCardFrame(PlayerData);
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


function setModelImage(image) {
    console.log("setModelImage:" + image);
    $("#fighterImageUrl")[0].value = image;
    //  if (image != null) {
    // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
    //    imageSelect.value = image;
    // }
    // else {
    //    imageSelect.value = null;
    // }
}


function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}


function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}


function splitWordWrap(context, text, fitWidth) {
    // this was modified from the print version to only return the text array
    return_array = [];
    var lines = text.split('\n');
    lineNum = 0;
    for (var i = 0; i < lines.length; i++) {
        fitWidth = fitWidth || 0;
        if (fitWidth <= 0) {
            return_array.push(lines[i]);
            lineNum ++;
        }
        var words = lines[i].split(' ');
        var idx = 1;
        while (words.length > 0 && idx <= words.length) {
            var str = words.slice(0, idx).join(' ');
            var w = context.measureText(str).width;
            if (w > fitWidth) {
                if (idx == 1) {
                    idx = 2;
                }
                return_array.push(words.slice(0, idx - 1).join(' '));
                lineNum ++;
                words = words.splice(idx - 1);
                idx = 1;
            } else {
                idx ++;
            }
        }
        if (idx > 0) {
            return_array.push(words.join(' '));
            lineNum ++;
        }
    }
    return return_array;
}
