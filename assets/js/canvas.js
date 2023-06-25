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
    console.log(ScalingFactor);
    return ScalingFactor;
}


function scalePixelPosition(PixelPosition) {
    var ScalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var ScaledPosition = {
        x: PixelPosition.x * ScalingFactor.x,
        y: PixelPosition.y * ScalingFactor.y
    };
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


function writeScaled(text, PixelPosition) {
    var ScaledPosition = scalePixelPosition(PixelPosition);
    writeValue(getContext(), text, ScaledPosition);
}


function writeValue(Context, text, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {
            x: pos.x / scale.x,
            y: pos.y / scale.y
    };
    Context.save();
    Context.scale(scale.x, scale.y);
    Context.fillText(text, pos.x, pos.y);
    Context.restore();
}