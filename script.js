const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;

//const step = 40;
let step = 40;

let lastX = null;
let lastY = null;
let lastR = null;



function drawGrid() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;

    for (let x = centerX + step; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let x = centerX - step; x > 0; x -= step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = centerY + step; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    for (let y = centerY - step; y > 0; y -= step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    if (lastX !== null && lastY !== null) {
        drawPoint(lastX, lastY);
        drawAngle(lastX, lastY);
    }
}

function drawPoint(x, y) {
    const scale = step;
    const canvasX = centerX + x * scale;
    const canvasY = centerY - y * scale;

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function calculateFunctions() {
    drawGrid();

    const x = Number(document.getElementById('x').value);
    const y = Number(document.getElementById('y').value);
    const r = Number(document.getElementById('r').value);

    if (r === 0) {
        document.getElementById('result').innerText = 'Niepoprawne dane (r nie może być 0)';
        return;
    }

    const sin = y / r;
    const cos = x / r;
    const tg = x !== 0 ? y / x : '∞';
    const ctg = y !== 0 ? x / y : '∞';

    document.getElementById('result').innerText = `
sin = ${sin.toFixed(3)}
cos = ${cos.toFixed(3)}
tg = ${tg !== '∞' ? tg.toFixed(3) : tg}
ctg = ${ctg !== '∞' ? ctg.toFixed(3) : ctg}
`;

    lastX = x;
    lastY = y;
    lastR = r;

    drawPoint(x, y);
    drawAngle(x, y);
}

function drawAngle(x, y) {
    const scale = step;

    const canvasX = centerX + x * scale;
    const canvasY = centerY - y * scale;

    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();

    const angle = Math.atan2(y, x);
    const radius = 40;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, -angle, angle < 0);
    ctx.stroke();
}





function zoomIn() {
    step += 5;
    if (step > 100) step = 100;
    drawGrid();
}
function zoomOut() {
    step -= 5;
    if (step < 10) step = 10;
    drawGrid();
}

drawGrid();
