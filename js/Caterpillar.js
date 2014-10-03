var canvas;

function moveCaterpillar(caterpillar, mousePosition) {
    caterpillar.positionX = mousePosition.x;
    caterpillar.positionY = mousePosition.y;
}


function onMoveEvent() {
    caterpillar.size += 1;
}

$(function(){
    canvas = $('#caterpillar-canvas').get(0);
    window.setInterval(loop, 100);

    function render(){
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#F00546';
        context.fillRect(caterpillar.positionX, caterpillar.positionY, caterpillar.size, 10);
    }

    function update() {
        moveCaterpillar(caterpillar, mousePosition);
        onMoveEvent();
    }

    function loop() {
        update();
        render();
    }

    canvas.addEventListener('mousemove', function(evt) {
        mousePosition.x = evt.clientX;
        mousePosition.y = evt.clientY;
    }, false);
});



var caterpillar = {
        positionX:10,
        positionY:10,
        size: 10};

var mousePosition = {
        x:0,
        y:0
};


