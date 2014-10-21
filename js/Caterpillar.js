$(function(){
    var canvas = $("#caterpillar-canvas")[0];
    var context = canvas.getContext("2d");
    var width = $("#caterpillar-canvas").width();
    var height = $("#caterpillar-canvas").height();
    var caterpillar = new Caterpillar(10, 10);
    window.setInterval(loop, 50);

    canvas.addEventListener('mousedown', function(evt) {
        Mouse.x = evt.clientX;
        Mouse.y = evt.clientY;
    }, false);

    function render(){
        context.clearRect(0, 0, width, height);
        context.beginPath();
        caterpillar.draw(context);
    };

    function update() {
        caterpillar.move();
    };

    function loop() {
        update();
        render();
    };
});

function Caterpillar (positionX, positionY){
    this.positionX = positionX;
    this.positionY = positionY;
    var size = 5;
    var caterpillar = new Array();
    for (var i = 0; i < size; i++) {
        caterpillar[i] = new CaterpillarElement();
    }

    this.move = function(){
        //find Position of new CaterpillarElement
        if(positionX<Mouse.x){
            positionX += 1;
        }else{
            positionX -= 1;
        }

        if(positionY<Mouse.y){
            positionY += 1;
        }else{
            positionY -= 1;
        }
        //add one new element
        caterpillar.unshift(new CaterpillarElement(positionX,positionY))
        //destroy last element
        caterpillar.pop();
    };

    this.eat = function (){
        size += 1;
    };

    this.draw = function (context){
        for (var i = 0; i < caterpillar.length; i++) {
            caterpillar[i].draw(context);
        }
    };
};

function CaterpillarElement (positionX, positionY){
    var  radius = 5;
    this.position = function(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    };

    this.draw = function (context){
        context.arc(positionX, positionY, radius, 0, 360, false);
        context.fillStyle = 'green';
        context.fill();
    };
};

function Mouse (){
        this.x = 0;
        this.y = 0;
};


