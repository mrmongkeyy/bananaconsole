CONSOLE.Object('car',{
	x:CONSOLE.canvasSetting.width/2,y:CONSOLE.canvasSetting.height/2,rotationSpeed:2,speed:0,breakSpeed:40,normalSpeed:100,
	normalSpeedRotation:1,rotationBreak:3,steerRotation:0,rotationDiff:0,
	steerRotateBackSpeed:2,carRotating:false,rotationDiffMaxLeft:-100,rotationDiffMaxRight:100,
	width:10,height:25,audios:CONSOLE.audio({src:'./more/media/background2.mp3'}),collideLen:0,
	dollarCount:localStorage['irgame']?JSON.parse(localStorage['irgame']).dollar||0:0,
	humanCount:localStorage['irgame']?JSON.parse(localStorage['irgame']).human||0:0,
	coinSound:CONSOLE.audio({src:'./more/media/coins.mp3'}),
	input(){
		const gobreak = ()=>{
			this.audios.volume = 0.2;
			this.speed = this.breakSpeed;
			this.rotationSpeed = this.rotationBreak;
		}
		if(this.engine.keys.ArrowLeft){
			this.rotation -= this.rotationSpeed;
			this.carRotating = true;
			if(this.rotationDiff>this.rotationDiffMaxLeft)this.rotationDiff -= this.rotationSpeed;
		}
		else if(this.engine.keys.ArrowRight){
			this.rotation += this.rotationSpeed;
			this.carRotating = true;
			if(this.rotationDiff<this.rotationDiffMaxRight)this.rotationDiff += this.rotationSpeed;
		}else this.steeringBack();
		
		if(this.engine.keys.ArrowDown ||this.engine.keys[' '])gobreak();
		else{this.speed = this.normalSpeed;this.rotationSpeed = this.normalSpeedRotation;this.audios.volume = 1;};
		
		//make a functinality of the button.
		if(this.clicked(this.break)){
			gobreak();
		}
	},
	init(){
		this.polly = CONSOLE.rectanglePolly(this.x,this.y,this.width,this.height,this.rotation);
		//define this.steer
		this.steerPos = {x:this.x,y:this.engine.canvas.height*3/4};
		this.steer = this.engine.assets.img.steer;
		this.break = {
			img:this.engine.assets.img.pedal,x:this.engine.canvas.width/8,
			y:this.engine.canvas.height/2,width:50,height:50
		};
		this.distance = this.engine.assets.img.distance;
		this.particles = CONSOLE.particles({acceL:1.1,lifeTime:15,initLifeTime:15,x:this.x,y:this.y,engine:this.engine,parent:this.id});
		this.particles.init();
	},
	update(){
		if(!this.engine.play)return;
		this.input();
		this.updateSteeringRotation();
		this.rotationSet();
		this.rotateCarBySteer();
		this.polly = CONSOLE.rectanglePolly(this.x,this.y,this.width,this.height,this.rotation*Math.PI/180);
		//endgamecondition.
		this.checkEndGame();
		this.distances += 0.1;
		this.particles.update();
		this.move();
	},
	rotationSet(){
		//if(navigator.userAgentData.mobile)this.steerRotation = this.engine.deviceAngle;
		this.touchRotation();
	},
	checkEndGame(){
		if(this.collideLen>=10){
			this.engine.play = false;
			this.engine.object.gameEndScene.show(this.distances);
			localStorage['irgame'] = JSON.stringify({dollar:this.dollarCount||0,human:this.humanCound||0});
		}
	},
	move(){
		const movementx = Math.sin(this.rotation*Math.PI/180)*this.speed*this.engine.dt;
		const movementy = Math.cos(this.rotation*Math.PI/180)*this.speed*this.engine.dt;
		this.x += movementx;
		this.y -= movementy;
		this.engine.viewport.y -= movementy;
		this.engine.viewport.x -= movementx;
	},
	draw(){
		this.particles.draw();
		this.drawCar();
		//if(navigator.userAgentData?!navigator.userAgentData.mobile){
		this.drawSteer();
		this.drawBreak();
		//}
		this.drawDistance();
	},
	drawCar(){
		this.engine.g.save();
		this.rotate();
		this.engine.g.rect(0,0,this.width,this.height,'red');
		//wheel
		this.engine.g.rect(this.width/2+2,-this.height/4,2,4,'black');
		this.engine.g.rect(-this.width/2-2,-this.height/4,2,4,'black');
		this.engine.g.rect(this.width/2+2,this.height/4,2,4,'black');
		this.engine.g.rect(-this.width/2-2,this.height/4,2,4,'black');
		this.engine.g.rect(0,this.height/2-2,12,5,'black');
		this.engine.g.rect(0,-1,7,14,'black');
		this.engine.g.rect(0,0,7,7,'white');
		this.engine.g.restore();
	},
	distances:0,
	drawDistance(){
		this.engine.g.rect(this.engine.canvas.width/2-this.engine.viewport.x,30+this.engine.viewport.y,0.9*this.engine.canvas.width+1,41,'black');
		this.engine.g.rect(this.engine.canvas.width/2-this.engine.viewport.x,30+this.engine.viewport.y,0.9*this.engine.canvas.width,40);
		this.engine.g.putImage(this.distance,this.engine.canvas.width*8/10-this.engine.viewport.x,30+this.engine.viewport.y,30,30);
		this.engine.g.text(Math.round(this.distances),this.engine.canvas.width*6.5/10-this.engine.viewport.x,40+this.engine.viewport.y,{
			font:'25px Arial',fillStyle:'black',textAlign:'center'
		});
		this.engine.g.putImage(this.engine.assets.img.dollar,this.engine.canvas.width*2/10-this.engine.viewport.x,30+this.engine.viewport.y,30,30);
		this.engine.g.text(Math.round(this.dollarCount),this.engine.canvas.width*3.5/10-this.engine.viewport.x,40+this.engine.viewport.y,{
			font:'25px Arial',fillStyle:'black',textAlign:'center'
		});
	},
	setRotation(vector1,vector2){
		const newVector = {x:vector1.x-vector2.x,y:vector1.y-vector2.y};
		this.rotation = Math.atan(Math.sqrt(newVector.x**2+newVector.y**2)/newVector.y)*180/Math.PI-25;
	},
	drawSteer(){
		this.engine.g.circle(this.steerPos.x-this.engine.viewport.x,this.engine.canvas.height*3/4+this.engine.viewport.y,80,'white');
		this.engine.g.save();
		this.engine.g.rotateObject({x:this.steerPos.x-this.engine.viewport.x,y:this.steerPos.y+this.engine.viewport.y},this.steerRotation);
		this.engine.g.putImage(this.steer,0,0,150,150);
		this.engine.g.restore();
	},
	updateSteeringRotation(){
		if(this.carRotating)this.steerRotation = this.rotationDiff;
	},
	steeringBack(){
		this.carRotating = false;
		const dir = (this.steerRotation>0)?-1:1;
		if(Math.round(this.steerRotation)===1 || Math.round(this.steerRotation)===-1)this.steerRotation = 0;
		if(Math.round(this.steerRotation)!=0){
			this.steerRotation += this.steerRotateBackSpeed*dir;
			this.rotationDiff += this.steerRotateBackSpeed*dir;
		}else{
			this.steerRotation = 0;
			this.rotationDiff = 0;
		}
	},
	drawBreak(){
		this.engine.g.rect(this.break.x-this.engine.viewport.x,this.break.y+this.engine.viewport.y,this.break.width+5,this.break.height+10);
		this.engine.g.putImage(this.break.img,this.break.x-this.engine.viewport.x,this.break.y+this.engine.viewport.y,this.break.width,this.break.height);
	},
	touchRotation(){
		let newestTouch,touchX,touchY;
		if(this.engine.touches !=null && this.engine.touches.length>0){
			newestTouch = this.engine.touches[this.engine.touches.length-1];
			touchX = newestTouch.pageX;
			touchY = newestTouch.pageY;
			//getting the len of the touch pos, with the steering origin.
		}else if(this.engine.mouseDown){
			newestTouch = this.engine.mouse;
			touchX = newestTouch.pageX;
			touchY = newestTouch.pageY;
		}else return;
		const normalizeSteerPos = this.normalizePos2Canvas(this.steerPos);
		const nvector = {x:touchX-normalizeSteerPos.x,y:touchY-normalizeSteerPos.y};
		const hypothenus = Math.round(Math.sqrt(
			nvector.x**2+nvector.y**2
		));
		if(hypothenus<100 && hypothenus>40){
			//am gonna work.
			const theta = Math.atan(nvector.y/nvector.x)*360/Math.PI;
			if(theta>=-120 && theta<=120){
				this.steerRotation = theta;
			}
		}
	},
	rotateCarBySteer(){
		this.rotation += this.steerRotation*.03;
	},
	collide(){
		this.collideLen += 1;
	}
});