CONSOLE.Object('car',{
	x:CONSOLE.canvasSetting.width/2,y:CONSOLE.canvasSetting.height/2,rotationSpeed:2.0,speed:70,breakSpeed:40,normalSpeed:70,
	normalSpeedRotation:1,rotationBreak:3,steerRotation:0,rotationDiff:0,
	steerRotateBackSpeed:2,carRotating:false,rotationDiffMaxLeft:-100,rotationDiffMaxRight:100,
	width:15,height:20,audios:CONSOLE.audio({src:'./more/media/background2.mp3'}),collideLen:0,
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
	},
	update(){
		if(!this.engine.play)return;
		this.input();
		this.updateSteeringRotation();
		this.touchRotation();
		this.rotateCarBySteer();
		this.polly = CONSOLE.rectanglePolly(this.x,this.y,this.width,this.height,this.rotation*Math.PI/180);
		if(this.collideLen>=10){
			this.engine.stop();
			alert('You lose the game!');
			location.reload();
		}
		this.distances += 0.1;
	},
	draw(){
		this.drawCar();
		this.drawSteer();
		this.drawBreak();
		this.drawDistance();
	},
	drawCar(){
		this.engine.g.save();
		this.rotate();
		this.engine.g.rect(0,0,this.width,this.height,'lightgray');
		this.engine.g.rect(0,-15,15,10,'black');
		this.engine.g.rect(0,-1,10,15,'gray');
		this.engine.g.rect(0,-19,12,2,'gray');
		this.engine.g.restore();
	},
	distances:0,
	drawDistance(){
		this.engine.g.rect(this.engine.canvas.width*2/8,30,120,40);
		this.engine.g.putImage(this.distance,this.engine.canvas.width*1/8,30,30,30);
		this.engine.g.text(Math.round(this.distances),this.engine.canvas.width*2/8,40,{
			font:'25px Arial',fillStyle:'black',textAlign:'center'
		});
	},
	setRotation(vector1,vector2){
		const newVector = {x:vector1.x-vector2.x,y:vector1.y-vector2.y};
		this.rotation = Math.atan(Math.sqrt(newVector.x**2+newVector.y**2)/newVector.y)*180/Math.PI-25;
	},
	drawSteer(){
		this.engine.g.circle(this.x,this.engine.canvas.height*3/4,80,'white');
		this.engine.g.save();
		this.engine.g.rotateObject({x:this.steerPos.x,y:this.steerPos.y},this.steerRotation);
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
		this.engine.g.rect(this.break.x,this.break.y,this.break.width+5,this.break.height+10);
		this.engine.g.putImage(this.break.img,this.break.x,this.break.y,this.break.width,this.break.height);
	},
	touchRotation(){
		let newestTouch,touchX,touchY;
		if(this.engine.touches.length>0){
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
	collisionDetect(){
		const data = this.engine.g.getImageData(0,0,this.engine.canvasSetting.width,this.engine.canvasSetting.height);
		return data;
	},
	collide(){
		this.drawPolly();
		this.collideLen += 1;
	}
});