var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var randomRange = getRndInteger(70, 100);
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("touchstart", move);
window.addEventListener("mousemove", move1);
function move1(event){
    mouse.x = event.x;
    mouse.y = event.y;
}
function move(event) {
    window.addEventListener("touchmove", function(event){
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    });
}
var colorArr = [
    '#024469',
    '#29F2F2',
    '#04ADBF'
]

function Circle(x, y, velocity, radius) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radiun = Math.random() * Math.PI * 2;
    this.radius = radius;
    this.distFrmCenter = getRndInteger(10, 110);
    this.lastmouse = {
        x: x,
        y: y
    };
    var color = Math.floor(Math.random() * colorArr.length);
    this.animation = function() {
        const lastpoint = {
            x: this.x,
            y: this.y
        }

        this.lastmouse = {
            x: x,
            y: y
        };
        this.radiun += this.velocity;
        this.lastmouse.x += (mouse.x - this.lastmouse.x);
        this.lastmouse.y += (mouse.y - this.lastmouse.y);
        this.x = this.lastmouse.x + Math.cos(this.radiun) * this.distFrmCenter;
        this.y = this.lastmouse.y + Math.sin(this.radiun) * this.distFrmCenter;


        this.draw(lastpoint);
    }
    this.draw = function(lastpoint) {
        c.beginPath();
        c.moveTo(lastpoint.x, lastpoint.y);
        c.lineTo(this.x, this.y);
        c.strokeStyle = colorArr[color];
        c.lineWidth = this.radius;
        c.stroke();
    }

}

var circleArr = [];
for (var i = 0; i < randomRange; i++) {
    var velocity = 0.05;
    var radius = Math.random() + 1;
    circleArr.push(new Circle(window.innerWidth / 2, window.innerHeight / 2, velocity, radius));
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].animation();
    }


}
animate();
