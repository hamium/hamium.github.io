/*
Hi, if you're reading this, this isn't my code.
I personally use this as my Windows machine's wallpaper because it's so clean.
Please check it out! https://benjamin.halko.ca/win11-circles/ (https://github.com/BenjaminHalko/win11-circles)
All comments that they've left are not removed, incase you want to experiment with it :)
If you wanna know what the lively wallpaper stuff in the code is about:
This was designed by the creator for a live wallpaper software called Lively Wallpaper!

Just an FYI tho:
Stuff I've changed are marked as [ME].
Most changes are to make the background more colorful and fit the entire page instead of the viewable area only.
*/

// Variables
var numCircles = 12; // [ME] Original value was 8

var minHue = 10; // [ME] Original value is 190
var maxHue = 40; // [ME] Original value is 285

var spd = 0.1; // [ME] Original value was 0.05

var startRadius = 100; // [ME] Original value was 200
var endRadius = 500;

// Setup the canvas
document.body.style.background = "black";
document.body.innerHTML = `<canvas id='canvas' style='position:absolute;left:0;top:0;z-index:-1'></canvas>` + document.body.innerHTML; // [ME] Changed position to absolute
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Used for animation
var lastTime = 0;
var circles = [];

// Functions
function createCircles() {
    circles = [];
    for (var i = 0; i < numCircles; i++) {
        var colRand = Math.random();
        circles.push({
            x: Math.round(Math.random() * document.documentElement.scrollWidth), // [ME] Changed to document.documentElement.scrollWidth
            y: Math.round(Math.random() * document.documentElement.scrollHeight), // [ME] Changed to document.documentElement.scrollHeight
            r: i / numCircles,
            colorRand: colRand,
            color: minHue + Math.round(colRand * (maxHue - minHue))
        });
    }
}

function recolor() {
    const tempMaxHue = minHue > maxHue ? maxHue + 360 : maxHue;
    for (let i = 0; i < circles.length; i++) {
        circles[i].color = minHue + Math.round(circles[i].colorRand * (tempMaxHue - minHue));
    }
}

function animate(timeStamp) {
    // Resize the canvas
    canvas.width = document.documentElement.scrollWidth; // [ME] Changed to document.documentElement.scrollWidth
    canvas.height = document.documentElement.scrollHeight; // [ME] Changed to document.documentElement.scrollHeight

    // Calculate the elapsed time since the last frame
    let elapsedTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // If the elapsed time is too large, reset it
    if (elapsedTime > 500) elapsedTime = 1;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // [ME] Changed to canvas.width and canvas.height

    for (let i = 0; i < circles.length; i++) {
        // Scale the animation value based on elapsed time
        circles[i].r += spd * (elapsedTime / 1000);

        if (circles[i].r >= 1) {
            circles[i].r = circles[i].r % 1;
            circles[i].x = Math.round(Math.random() * document.documentElement.scrollWidth); // [ME] Changed to document.documentElement.scrollWidth
            circles[i].y = Math.round(Math.random() * document.documentElement.scrollHeight); // [ME] Changed to document.documentElement.scrollHeight
            circles[i].colorRand = Math.random();
            circles[i].color = minHue + Math.round(circles[i].colorRand * (maxHue - minHue));
        }

        // Calculate the circle's radius
        const radius = startRadius + Math.sin(circles[i].r * Math.PI) * (endRadius - startRadius);

        // Set the fill style to a radial gradient
        ctx.fillStyle = ctx.createRadialGradient(circles[i].x, circles[i].y, 0, circles[i].x, circles[i].y, radius);
        ctx.fillStyle.addColorStop(0, `hsla(${circles[i].color}, 100%, 15%, ${Math.round(Math.min(100, (1 - Math.abs(1 - circles[i].r * 2)) * 140))}%)`);
        ctx.fillStyle.addColorStop(1, 'hsla(' + circles[i].color + ', 100%, 15%, 0)');

        // Create the circle path and fill it
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}  

// Main
createCircles();
requestAnimationFrame(animate);

// Lively Wallpaper
function livelyPropertyListener(name, val) {
    switch(name) {
        case "numCircles":
            numCircles = val;
            createCircles();
            break;
        case "minHue":
            minHue = val;
            recolor();
            break;
        case "maxHue":
            maxHue = val;
            recolor();
            break;
        case "spd":
            spd = val / 200;
            break;
        case "startRadius":
            startRadius = val;
            break;
        case "endRadius":
            endRadius = val;
            break;
    }
}
