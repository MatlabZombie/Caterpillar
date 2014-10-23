$(function(){//same as document.ready
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
            canvas = $("#caterpillar-canvas")[0],
            context = canvas.getContext("2d"),
            width = $("#caterpillar-canvas").width(),
            height = $("#caterpillar-canvas").height(),
            STARTING_POSITION = new Position(200, 200),
            STARTING_DIRECTION = DIRECTION.LEFT,
            caterpillar = new Caterpillar(STARTING_POSITION, STARTING_DIRECTION);

        intervalID = window.setInterval(loop, 200);

        window.addEventListener('keydown', function(evt) {
            if (Math.abs(caterpillar.movingDirection - evt.which)!=2) {
                if((evt.which == DIRECTION.LEFT) || (evt.which ==DIRECTION.RIGHT) || (evt.which ==DIRECTION.UP) ||  (evt.which ==DIRECTION.DOWN)) {
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

    var grid = {
        tileWidth :width/10,
        tileHeight :height/10,
        setPosition :function(actualX, actualY){
            var xIndex = Math.round(actualX/tileWidth);
            var yIndex = Math.round(actualY/tileHeight);
            this.position = new Position(xIndex, yIndex);
        },

        clash :function(){
            return !(caterpillar.position.x < width && caterpillar.position.x > 0 && caterpillar.position.y < height && caterpillar.position.y > 0);
        }
    }

    function Caterpillar (position, movingDirection){
        this.position = position;
        this.movingDirection = movingDirection;
        var size = 20;
        var caterpillar = [];
        for (var i = 0; i < size; i++) {
            caterpillar[i] = new CaterpillarElement(new Position(this.position.x-20,this.position.y));
        }

        this.move = function(){
            switch (this.movingDirection){
                case DIRECTION.LEFT:
                    this.position.x -= 20;
                    break;
                case DIRECTION.DOWN:
                    this.position.y += 20;
                    break;
                case DIRECTION.RIGHT:
                    this.position.x += 20;
                    break;
                case DIRECTION.UP:
                    this.position.y -= 20;
                    break;
            }

            if((grid.clash()) /*|| (caterpillar.getItemCount(new CaterpillarElement(new Position(this.position.x,this.position.y)))>1)*/) {
                clearInterval(intervalID);
                init();
                console.log('Game over');
            }else{
                caterpillar.unshift(new CaterpillarElement(new Position(this.position.x,this.position.y)));
                //destroy last element
                caterpillar.pop();
            }
        };

        this.eat = function (){
            size += 1;
        };

        this.draw = function (context){
            for (var i = 0; i < caterpillar.length; i++) {
                var radius = (caterpillar.length-i)*2;
                caterpillar[i].draw(context, 10);
            }
        };
    }

    function CaterpillarElement (position){
        this.draw = function (context, radius){
            context.beginPath();
            context.arc(position.x, position.y, radius, 0, 360, false);
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
    }

    Array.prototype.getItemCount = function(item) {
        var counts = {};
        for(var i = 0; i< this.length; i++) {
            var num = this[i];
            counts[num] = counts[num] ? counts[num]+1 : 1;
        }
        return counts[item] || 0;
    }
});


