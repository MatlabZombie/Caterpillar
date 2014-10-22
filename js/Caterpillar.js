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
        DIRECTION.LEFT = 12;
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
                if(evt.which == (DIRECTION.LEFT || DIRECTION.RIGHT || DIRECTION.UP ||  DIRECTION.DOWN)) {
                    caterpillar.movingDirection = evt.which;
                }
            }
        }, false);
    }init();

    function render(){
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

    var rules = {
        move: function() {
            if (caterpillar.position.x < width && caterpillar.position.x > 0 && caterpillar.position.y < height && caterpillar.position.y > 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    function Caterpillar (position, movingDirection){
        this.position = position;
        this.movingDirection = movingDirection;
        var size = 5;
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

            if(rules.move()) {
                caterpillar.unshift(new CaterpillarElement(new Position(this.position.x,this.position.y)));
                //destroy last element
                caterpillar.pop();
            }else{
                clearInterval(intervalID);
                init();
                console.log('Game over');
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
});


