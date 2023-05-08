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


function writeScaled(value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}


function writeValue(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {
            x: pos.x / scale.x,
            y: pos.y / scale.y
    };
    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}