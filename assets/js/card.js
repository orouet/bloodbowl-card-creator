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


function getBackgroundImage() {
    return document.getElementById('bg1');
}


function getCanvas() {
    return document.getElementById("canvas");
}


function getContext() {
    return getCanvas().getContext("2d");
}


function drawBackground() {
    getContext().drawImage(getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}


function drawCardElementFromInput(inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(Context, value, pixelPosition);
}


function drawCardElementFromInputId(inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}


function drawCharacteristic(Context, text, x1, y1) {
    var Position = {
        x: x1,
        y: y1
    };
    rotation = 90 * Math.PI / 180;
    Context.font = '20px brothers-regular';
    Context.fillStyle = 'white';
    Context.textAlign = "left";
    Context.textBaseline = "alphabetic";
    //Context.rotate(rotation);
    writeScaled(Context, text, Position);
    //Context.rotate(- rotation);
}


function drawCharacteristicData(Context, number, x1, y1, plus = false) {
    if (number < 1 || number > 11 ) {
        number = '-';
        plus = false;
    } else {
        text = number;
    }
    Context.font = '100px brothers-regular';
    Context.fillStyle = '#0e457d';
    Context.textAlign = "left";
    Context.textBaseline = "alphabetic";
    Context.strokeStyle = 'white';
    Context.lineWidth = 8;
    writeScaled(Context, text, { x: x1, y: y1 }, true);
    if (plus) {
        if (number < 10) {
            offset = 60;
        } else {
            offset = 90;
        }
        Context.font = '60px brothers-regular';
        Context.lineWidth = 6;
        writeScaled(Context, "+", { x: x1 + offset, y: y1 - 40 }, true);
    }
}


function drawCardFrame(Context, border = false) {
    Context.drawImage(document.getElementById('frame'), 0, 0, getCanvas().width, getCanvas().height);
    if (border) {
        Context.drawImage(document.getElementById('border'), 0, 0, getCanvas().width, getCanvas().height);
    }
}


function drawCard(PlayerData) {
    Context = getContext();
    border = !document.getElementById("removeBorder").checked;
    drawCardFrame(Context, border);
    drawCardPlayerName(Context, PlayerData.playerName);
    drawCardTeamName(Context, PlayerData.teamName);
    drawCardGP(Context, PlayerData.GP);
    drawCardPosition(Context, PlayerData.positionName);
    drawCardText(Context, PlayerData.cardText);
    let primaries = [];
    let secondaries = [];
    if (PlayerData.p_agility) {
        primaries.push(translator.getStr("agility"));
    }
    if (PlayerData.p_general) {
        primaries.push(translator.getStr("general"));
    }
    if (PlayerData.p_mutations) {
        primaries.push(translator.getStr("mutations"));
    }
    if (PlayerData.p_passing) {
        primaries.push(translator.getStr("passing"));
    }
    if (PlayerData.p_strength) {
        primaries.push(translator.getStr("strength"));
    }
    if (PlayerData.s_agility) {
        secondaries.push(translator.getStr("agility"));
    }
    if (PlayerData.s_general) {
        secondaries.push(translator.getStr("general"));
    }
    if (PlayerData.s_mutations) {
        secondaries.push(translator.getStr("mutations"));
    }
    if (PlayerData.s_passing) {
        secondaries.push(translator.getStr("passing"));
    }
    if (PlayerData.s_strength) {
        secondaries.push(translator.getStr("strength"));
    }
    drawCardSkills(Context, primaries, secondaries);
    // Characteristics
    characX = 70;
    // MA
    drawCharacteristic(Context, translator.getStr("ma"), characX, 320);
    drawCharacteristicData(Context, PlayerData.ma, 120, 320, false);
    // ST
    drawCharacteristic(Context, translator.getStr("st"), characX, 460);
    drawCharacteristicData(Context, PlayerData.st, 120, 460, false);
    // AG
    drawCharacteristic(Context, translator.getStr("ag"), characX, 590);
    drawCharacteristicData(Context, PlayerData.ag, 120, 590, true);
    // PA
    drawCharacteristic(Context, translator.getStr("pa"), characX, 732);
    drawCharacteristicData(Context, PlayerData.pa, 120, 732, true);
    // AV
    drawCharacteristic(Context, translator.getStr("av"), characX, 870);
    drawCharacteristicData(Context, PlayerData.av, 120, 870, true);
}


function drawCardGP(Context, value) {
    Context.font = '30px brothers-regular';
    Context.textAlign = "center";
    Context.textBaseline = "middle";
    Context.fillStyle = 'white';
    writeScaled(Context, value, { x: 150, y: 990 });
}


function drawCardPlayerName(Context, value) {
    if (value.length < 18) {
        Context.font = 'italic 70px brothers-regular';
    } else {
        Context.font = 'italic 50px brothers-regular';
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
    Context.textAlign = "left";
    Context.textBaseline = "middle";
    Context.lineWidth = 0;
    Context.rotate(- rotation);
    //
    Context.fillStyle = 'black';
    writeScaled(Context, value, { x: 48 + 4, y: 180 + 4 });
    //
    Context.fillStyle = 'white';
    writeScaled(Context, value, { x: 48, y: 180 });
    //
    Context.rotate(+ rotation);
}


function drawCardPosition(Context, value) {
    Position = {
        x: 480,
        y: 1010
    };
    Context.font = '50px brothers-regular';
    Context.textAlign = "center";
    Context.textBaseline = "middle";
    Context.fillStyle = 'white';
    Context.lineWidth = 0;
    writeScaled(Context, value, Position);
}


function drawCardSkills(Context, primaries, secondaries) {
    let primaryTitle = "";
    let primaryText = "";
    let secondaryTitle = "";
    let secondaryText = "";
    primaryText = primaries.join(",");
    secondaryText = secondaries.join(",");
    Context.fillStyle = 'black';
    Context.textAlign = "left";
    Context.textBaseline = "middle";
    let x = 265;
    let y = 890;
    // Primaries
    if (primaries.length < 2 ) {
        primaryTitle = translator.getStr("skillsPrimary");
    } else {
        primaryTitle = translator.getStr("skillsPrimaries");
    }
    Context.font = 'bold 26px franklin-gothic-book';
    writeScaled(Context, primaryTitle, { x: x, y: y });
    let primaryTitleW = Context.measureText(primaryTitle).width;
    //console.log(primaryTitleW)
    if (primaries.length == 0) {
        primaryText = translator.getStr("skillsMin1");
    }
    if (primaries.length > 3) {
        primaryText = translator.getStr("skillsMax3");
    }
    Context.font = '26px franklin-gothic-book';
    writeScaled(Context, primaryText, { x: x + primaryTitleW, y: 890 });
    let primaryTextW = Context.measureText(primaryText).width;
    //console.log(primaryTextW)
    // secondaries
    if (secondaries.length < 2) {
        secondaryTitle = translator.getStr("skillsSecondary");
    } else {
        secondaryTitle = translator.getStr("skillsSecondaries");
    }
    Context.font = 'bold 26px franklin-gothic-book';
    writeScaled(Context, secondaryTitle, { x: x, y: 930 });
    let secondaryTitleW = Context.measureText(secondaryTitle).width;
    //console.log(secondaryTitleW)
    if (secondaries.length == 0) {
        secondaryText = translator.getStr("skillsMin1");
    }
    if (secondaries.length > 3) {
        secondaryText = translator.getStr("skillsMax3");
    }
    Context.font = '26px franklin-gothic-book';
    writeScaled(Context, secondaryText, { x: x + secondaryTitleW, y: 930 });
    let secondaryTextW = Context.measureText(secondaryText).width;
    //console.log(secondaryTextW)
}


function drawCardText(Context, value) {
    Context.font = '36px franklin-gothic-book';
    Context.fillStyle = 'black';
    Context.textAlign = "left";
    Context.textBaseline = "middle";
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


function drawCardTeamName(Context, value) {
    rotation = 6 * Math.PI / 180
    Context.font = 'italic 40px brothers-regular';
    Context.textAlign = "left";
    Context.textBaseline = "middle";
    Context.lineWidth = 0;
    Context.rotate(- rotation);
    Context.fillStyle = 'black';
    writeScaled(Context, value, { x: 60 + 4, y: 125 + 4 });
    Context.fillStyle = 'white';
    writeScaled(Context, value, { x: 60, y: 125 });
    Context.rotate(+ rotation);
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
    var imageSelect = $("#playerImageURL")[0].value;
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


function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}


function render(PlayerData) {
    //console.log("Render:");
    //console.log(PlayerData);
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
            drawCard(PlayerData);
        };
        image.src = PlayerData.imageUrl;
    }
    // next the frame elements
    drawCard(PlayerData);
}


function setModelImage(image) {
    //console.log("setModelImage:" + image);
    $("#playerImageURL")[0].value = image;
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

