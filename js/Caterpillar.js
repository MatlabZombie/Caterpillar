$(function(){//same as document.ready

    var canvas = $("#caterpillar-canvas")[0],
        context = canvas.getContext("2d"),
        width = $("#caterpillar-canvas").width(),
        height = $("#caterpillar-canvas").height(),
        caterpillar = new Caterpillar(10, 10, 39); // ->
    window.setInterval(loop, 50);

    window.addEventListener('keydown', function(evt) {
        if (Math.abs(caterpillar.movingDirection-evt.which)!=2) {
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
        caterpillar[i] = new CaterpillarElement(positionX+i,positionY+i);
    }

    this.move = function(){
        switch (this.movingDirection){
            case 37:
                positionX --;
                break;
            case 38:
                positionY --;
                break;
            case 39:
                positionX ++;
                break;
            case 40:
                positionY ++;
                break;
        }

        //add one new element
        caterpillar.unshift(new CaterpillarElement(positionX+1,positionY+1));
        //destroy last element
        caterpillar.pop();
    };

    this.eat = function (){
        size += 1;
    };

    this.draw = function (context){
        for (var i = 0; i < caterpillar.length; i++) {
            caterpillar[i].draw(context, i*5);
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






