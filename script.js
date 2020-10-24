//Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66',
    '#75E5F0',
    '#FF80ED',
    '#F7347A'
];

//Event Listeners
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

//Utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

//Objects
    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = randomIntFromRange(50,120);
        this.lastMouse = {x: x, y: y};

    this.update = ()=> {
        const lastPoint = {x: this.x, y: this.y};

        //Move points over time
        this.radians += this.velocity;

        //Drag Effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Circular Motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        
        this.draw(lastPoint);
    };

    this.draw = lastPoint=> {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = this.color;
        // c.fill();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    };
}

//Implementation
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 200; i++) {
        const radius = (Math.random() * 8) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
}

//Animation loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();
