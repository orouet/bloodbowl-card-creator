function drawImage(scaledPosition, scaledSize, image) {
    if (image != null) {
        if (image.complete) {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        } else {
            image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        }
    }
}


function drawImageSrc(scaledPosition, scaledSize, imageSrc) {
    if (imageSrc != null) {
        var image = new Image();
        image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}


function getScalingFactor(Canvas, Background) {
    var ScalingFactor = {
        x: Canvas.width / Background.width,
        y: Canvas.height / Background.height
    };
    //console.log(ScalingFactor);
    return ScalingFactor;
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


function printWithMarkup(Context, text_array, x1, y1, lineHeight) {
    // table code style --> font style
    // Text comes in as an array
    // need to split it into lines
    for (line in text_array) {
        Context.font = '36px frutiger-light';
        Context.fillStyle = 'black';
        if (text_array[line].startsWith("**")) {
            printText = text_array[line].replace("**", '');
            context.font = 'bold 38px frutiger-light';
            context.fillStyle = '#5B150F';
        } else {
            printText = text_array[line]
        }
        y2 = y1 + (line * lineHeight);
        //context.fillText(printText, x1, y2);
        writeScaled(Context, printText, {x: x1, y: y2});
    }
}


function scalePixelPosition(PixelPosition) {
    //console.log(PixelPosition);
    var ScalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var ScaledPosition = {
        x: PixelPosition.x * ScalingFactor.x,
        y: PixelPosition.y * ScalingFactor.y
    };
    //console.log(ScaledPosition);
    return ScaledPosition;
}


function splitWordWrap(Context, text, fitWidth) {
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
            var w = Context.measureText(str).width;
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


function writeScaled(Context, text, PixelPosition, border = false) {
    //console.log(text)
    //console.log(PixelPosition)
    var ScaledPosition = scalePixelPosition(PixelPosition);
    //console.log(ScaledPosition)
    writeValue(Context, text, ScaledPosition, border);
}


function writeValue(Context, text, ScaledPosition, border = false) {
    var ScalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    Position = {
            x: ScaledPosition.x / ScalingFactor.x,
            y: ScaledPosition.y / ScalingFactor.y
    };
    //console.log(Position)
    Context.save();
    Context.scale(ScalingFactor.x, ScalingFactor.y);
    if (border) {
        Context.strokeText(text, Position.x, Position.y);
    }
    Context.fillText(text, Position.x, Position.y);
    Context.restore();
}


