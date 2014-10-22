$(function(){//same as document.ready

    var canvas = $("#caterpillar-canvas")[0],
        context = canvas.getContext("2d"),
        width = $("#caterpillar-canvas").width(),
        height = $("#caterpillar-canvas").height(),
        caterpillar = new Caterpillar(width-10, 10, 37); // ->
    window.setInterval(loop, 100);

    window.addEventListener('keydown', function(evt) {
        if (Math.abs(caterpillar.movingDirection - evt.which)!=2) {
            caterpillar.movingDirection = evt.which;
        }
    }, false);

    function render(){
        context.clearRect(0, 0, width, height);
        context.beginPath();
        caterpillar.draw(context);
    }

    function update() {
        caterpillar.move();
    }

    function loop() {
        update();
        render();
    }
});


function Caterpillar (positionX, positionY, movingDirection){
    this.movingDirection = movingDirection;
    var size = 5;
    var caterpillar = [];
    for (var i = 0; i < size; i++) {
        caterpillar[i] = new CaterpillarElement(positionX-(20*i),positionY, i);
    }

    this.move = function(){
        switch (this.movingDirection){
            case Direction.LEFT:
                positionX -= 20;
                break;
            case Direction.DOWN:
                positionY += 20;
                break;
            case Direction.RIGHT:
                positionX += 20;
                break;
            case Direction.UP:
                positionY -= 20;
                break;
        }

        //add one new element
        caterpillar.unshift(new CaterpillarElement(positionX,positionY));
        //destroy last element
        caterpillar.pop();
    };

    this.eat = function (){
        size += 1;
    };

    this.draw = function (context){
        for (var i = 1; i <= caterpillar.length; i++) {
            var radius = (caterpillar.length-i)*5;
            caterpillar[i].draw(context, radius);
        }
    };
}

function CaterpillarElement (positionX,positionY){

    this.draw = function (context, radius){
        context.arc(positionX, positionY, radius, 0, 360, false);
        context.fillStyle = 'green';
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.stroke();
    };
}

var Direction = Object.freeze({
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40
});



