$(function(){
    var DIRECTION = Object.freeze({
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40
    });

    var canvas,
        context,
        width,
        height,
        STARTING_POSITION,
        STARTING_DIRECTION,
        caterpillar,
        intervalID;


    function init(){
            canvas = $("#caterpillar-canvas")[0];
            context = canvas.getContext("2d");
            width = $("#caterpillar-canvas").width();
            height = $("#caterpillar-canvas").height();
            STARTING_POSITION = new Position(10, 10);
            STARTING_DIRECTION = DIRECTION.RIGHT;
            caterpillar = new Caterpillar(STARTING_DIRECTION);
            intervalID = window.setInterval(loop, 200);

        window.addEventListener('keydown', function(evt) {
            if (Math.abs(caterpillar.movingDirection - evt.which)!=2) {
                if((evt.which == DIRECTION.LEFT) || (evt.which ==DIRECTION.RIGHT) ||
                    (evt.which ==DIRECTION.UP) ||  (evt.which ==DIRECTION.DOWN)) {
                    caterpillar.movingDirection = evt.which;
                }
            }
        }, false);
    }init();

    function render() {
        context.clearRect(0, 0, width, height);
        caterpillar.draw(context);
    }

    function update() {
        caterpillar.move();
    }

    function loop() {
        update();
        render();
    }

    function Grid () {
        var cellWidth =width/10;
        var cellHeight =height/10;
        this.setPosition = function(actualX, actualY){
            var xIndex = Math.round(actualX/cellWidth);
            var yIndex = Math.round(actualY/cellHeight);
            this.position = new Position(xIndex, yIndex);
        };

        this.clash = function(){
            return !(caterpillar.getFirstElement().position.x < width && caterpillar.getFirstElement().position.x > 0
                && caterpillar.getFirstElement().position.y < height && caterpillar.getFirstElement().position.y > 0);
        };
    }

    function Caterpillar (movingDirection){
        this.movingDirection = movingDirection;
        this.move = function(){
            var aCaterpillarElement = this.addNewElement(caterpillarArray[0]);
            switch (this.movingDirection){
                case DIRECTION.LEFT:
                    aCaterpillarElement.position.x -= 20;
                    break;
                case DIRECTION.DOWN:
                    aCaterpillarElement.position.y += 20;
                    break;
                case DIRECTION.RIGHT:
                    aCaterpillarElement.position.x += 20;
                    break;
                case DIRECTION.UP:
                    aCaterpillarElement.position.y -= 20;
                    break;
            }

            if((new Grid().clash()) || ((caterpillarArray.getItemCount(aCaterpillarElement))>1)) {
                clearInterval(intervalID);
                init();
                console.log('Game over');
            }else{
                caterpillarArray.unshift(aCaterpillarElement);
                //destroy last element
                caterpillarArray.pop();
            }
        };
        this.eat = function (){
            size += 1;
        };
        this.draw = function (context){
            for (var i = 0; i < caterpillarArray.length; i++) {
                var radius = (caterpillarArray.length-i)*2;
                caterpillarArray[i].draw(context, 10);
            }
        };
        this.addNewElement = function (element, x_addition, y_addition){
            var aCaterpillarElement = new CaterpillarElement(new Position(element.position.x, element.position.y));

            if(x_addition){
                aCaterpillarElement.position.x += x_addition;
            }if(y_addition){
                aCaterpillarElement.position.y += y_addition;
            }
            return aCaterpillarElement;
        };
        this.getFirstElement = function () {
            return caterpillarArray[0];
        };

        var size = 10;
        var caterpillarArray = [];
        for (var i = 1; i < size; i++) {
            caterpillarArray[0] = new CaterpillarElement(STARTING_POSITION);
            caterpillarArray[i] = this.addNewElement(caterpillarArray[i-1], -20, 0);
        }
    }

    function CaterpillarElement (position){
        this.position = position;

        this.draw = function (context, radius){
            context.beginPath();
            context.arc(this.position.x, this.position.y, radius, 0, 360, false);
            context.fillStyle = 'green';
            context.fill();
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.stroke();
        };
    }

    function Position(x, y){
        this.x = x;
        this.y = y;

        this.getPosition = function(){
            return this;
        }
    }

    Array.prototype.getItemCount = function(item) {
        var counts = 0;
        for(var i = 0; i< this.length; i++) {
            if((this[i].position.x == item.position.x) && (this[i].position.y == item.position.y)){
                counts ++;
            }
        }
        console.log(item.position.x + item.position.y);
       return counts;
    }
});


