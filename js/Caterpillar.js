$(function(){
    window.setInterval(loop, 50);
    var caterpillar = new Caterpillar();
    var canvas = $('#caterpillar-canvas').get(0);

    canvas.addEventListener('mousedown', function(evt) {
        mousePosition.x = evt.clientX;
        mousePosition.y = evt.clientY;
    }, false);

    function render(){
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        caterpillar.grow(context);
    }

    function update() {
        caterpillar.eat();
        caterpillar.move();
    }

    function loop() {
        update();
        render();
    }
});

function Caterpillar (){
        this.positionX = 10;
        this.positionY = 10;
        this.size = 10;

        this.move = function(){
            if(this.positionX<mousePosition.x){
                this.positionX += 1;
            }else{
                this.positionX -+ 1;
            }

            if(this.positionY<mousePosition.y){
                this.positionY += 1;
            }else{
                this.positionY -= 1;
            }
        };

        this.eat = function (){
            this.size += 1;
        };

        this.grow = function (context) {
            for (var i = 0; i < this.size; i++) {
            context.arc(this.positionX+(i*10), this.positionY, 5+i, 0, 360, false);
            context.fillStyle = 'green';
            context.fill();
            }
        };
};

function mousePosition (){
    this.x = 50;
    this.y = 50;
};


