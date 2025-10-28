const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const sprite = new Image();
sprite.src = "thiswillbechangedlater.png";

const spriteState = {
    x: 300,
    y: 220,
    width: 64,
    height: 64,
    velocityX: 3,
    velocityY: 2,
    loaded: false,
};

sprite.addEventListener("load", () => {
    spriteState.loaded = true;
});

const fallbackPattern = (() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = spriteState.width;
    offscreen.height = spriteState.height;
    const offCtx = offscreen.getContext("2d");

    offCtx.fillStyle = "#1e90ff";
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
    offCtx.strokeStyle = "#ffffff";
    offCtx.lineWidth = 6;
    offCtx.strokeRect(3, 3, offscreen.width - 6, offscreen.height - 6);
    offCtx.moveTo(0, 0);
    offCtx.lineTo(offscreen.width, offscreen.height);
    offCtx.moveTo(offscreen.width, 0);
    offCtx.lineTo(0, offscreen.height);
    offCtx.stroke();

    return offscreen;
})();

function update() {
    spriteState.x += spriteState.velocityX;
    spriteState.y += spriteState.velocityY;

    if (spriteState.x <= 0 || spriteState.x + spriteState.width >= canvas.width) {
        spriteState.velocityX *= -1;
        spriteState.x = clamp(spriteState.x, 0, canvas.width - spriteState.width);
    }
    if (spriteState.y <= 0 || spriteState.y + spriteState.height >= canvas.height) {
        spriteState.velocityY *= -1;
        spriteState.y = clamp(spriteState.y, 0, canvas.height - spriteState.height);
    }
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (spriteState.loaded) {
        context.drawImage(
            sprite,
            spriteState.x,
            spriteState.y,
            spriteState.width,
            spriteState.height,
        );
    } else {
        context.drawImage(
            fallbackPattern,
            spriteState.x,
            spriteState.y,
            spriteState.width,
            spriteState.height,
        );
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
