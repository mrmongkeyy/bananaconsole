CONSOLE.Object('sniper',{
	canShot:true,radMaxTarget:2,audio:{
		gun:CONSOLE.audio({src:'./more/media/sniperRiffle.mp3'})
	},bestPoint:'0',
	init(){
		this.x = this.engine.canvas.width/2;
		this.y = this.engine.canvas.height/2;
		this.width = 50;
		this.height = 50;
		this.texture = this.engine.assets.img.scope;
	},
	update(){
		if(!this.engine.play)return;
		this.shotHandle();
		this.getMove();
	},
	draw(){
		if(!this.engine.play)return;
		this.engine.g.putImage(this.texture,this.x,this.y,this.width,this.height);
		this.drawText();
	},
	drawText(){
		this.engine.g.text((this.bestPoint.length>4)?this.bestPoint.slice(0,3):this.bestPoint,this.x,this.y-30,{
			fillStyle:'red',font:'20px Monospace',textAlign:'center'
		})
	},
	getMove(){
		let target;
		if(this.engine.mouse){
			target = this.engine.getMouseCanvasOrigin();
		}else if(this.engine.touches.length>0){
			target = this.engine.	getTouchCanvasOrigin();
		}else{
			if(!this.engine.isMouse)target = vector2(this.engine.canvas.width/2+this.width/2,this.engine.canvas.height/2+this.height/2);
			else return
		}
		this.x = target.x-this.width/2;
		this.y = target.y-this.height/2;
	},
	shotHandle(){
		if(!this.engine.isMouse&&this.engine.touchDown){
			this.onTracking = true;
		}
		if(!this.engine.mouse && !this.engine.touchDown && this.onTracking){
			this.shoot();
			this.onTracking = false;
		}
		if(this.engine.isMouse && this.engine.mouseDown && this.canShot){
			this.shoot();
			this.canShot = false;
		}else if(!this.engine.mouseDown){
			this.canShot = true;
		}
	},
	shoot(){
		this.audio.gun.play();
		let targetIn = false;
		this.engine.object.bird.birds.forEach((bird,i)=>{
			const birdPos = bird.getPos();
			const thispos = this.getPos();
			const nVector = thispos.VSubstract(birdPos);
			const r = Math.hypot(nVector.x,nVector.y);
			let fall = (r<this.radMaxTarget)?true:false;
			if(fall){
				bird.down = true;
				this.engine.object.ui.Info.score += Math.ceil((this.radMaxTarget-r)*10);
				this.engine.object.ui.Info.onTarget += 1;
				this.bestPoint = String(r);
				targetIn = true;
			}else if(i===this.engine.object.bird.birds.length-1&&!targetIn){
				this.bestPoint = 'MISS';
			}
		})
		this.engine.object.ui.Info.shootLen += 1;
	}
})