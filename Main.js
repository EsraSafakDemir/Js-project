// stick değişkenleri
var stickLeft = document.getElementById('stickLeft');
var stickRight = document.getElementById('stickRight');
// ball değişkeni
var ball = document.getElementById('ball');

var CONSTS = {
  gameSpeed: 20,
    score1: 0,
    score2: 0,
    stick1Speed: 0,
    stick2Speed: 0,
    
};

function start() {
    draw();
    setEvents();
    roll();
    loop();
}


stickLeft.style.top = window.innerHeight/2 + 'px';
stickRight.style.top = window.innerHeight/2 + 'px';
ball.style.top = window.innerHeight/2 + 'px';
ball.style.left = (window.innerWidth/2) - (16/2) + 'px';

var ballTopSpeed = 0; 
var ballLeftSpeed = 0; 
var gameSpeed = 20;

function pxAdd(numb){
	return numb + 'px';
}

//  çubuklar
document.onkeydown = function(e){
	switch(e.keyCode){
		// sol çubuk
		case 87:
			if(parseInt(stickLeft.style.top) <= 0){
				stickLeft.style.top = stickLeft.style.top;
			}else{
				stickLeft.style.top = pxAdd(parseInt(stickLeft.style.top) - 30);
			}
			break;
		case 83:
			if(parseInt(stickLeft.style.top) + 85 >= window.innerHeight){
				stickLeft.style.top = stickLeft.style.top;
			}else{
				stickLeft.style.top = pxAdd(parseInt(stickLeft.style.top) + 30);
			}
			break;
		case 38:
			if(parseInt(stickRight.style.top) <= 0){
				stickRight.style.top = stickRight.style.top;
			}else{
				stickRight.style.top = pxAdd(parseInt(stickRight.style.top) - 30);
			}
			break;
		case 40:
			if(parseInt(stickRight.style.top) + 85 >= window.innerHeight){
				stickRight.style.top = stickRight.style.top;
			}else{
				stickRight.style.top = pxAdd(parseInt(stickRight.style.top) + 30);
			}
			break;
		default: 
	}
}


// oyunun sürekli devam etmesi için gerekli yapı
function loop(){
	// topun alacağı değerler
	ball.style.top = pxAdd(parseInt(ball.style.top) + ballTop);
 	ball.style.left = pxAdd(parseInt(ball.style.left) + ballLeft);
 	
 	// top üst ve alt bloklara çarparsa, X ekseninde geri seksin
	if(parseInt(ball.style.top) <= 0 || parseInt(ball.style.top) + 16 >= window.innerHeight){
		ballTop *= -1;
	}

	// top sağ ve sol çubuklara çarparsa, Y ekseninde geri seksin
	if(parseInt(ball.style.left) <= 0 + 16 && parseInt(ball.style.top)  >= parseInt(stickLeft.style.top) && parseInt(ball.style.top) <= parseInt(stickLeft.style.top) + 85){
		ballLeft *= -1;
	}else if(parseInt(ball.style.left) + 16 >= window.innerWidth - 12 && parseInt(ball.style.top) >= parseInt(stickRight.style.top) && parseInt(ball.style.top) <= parseInt(stickRight.style.top) + 85){
		ballLeft *= -1;		
	}
}

setInterval(gameLoop, 10);

function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -66;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
        });
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left = 110;

            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width) {
            	CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll();
            }

            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                roll();
            }
        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 350;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    start();
})();