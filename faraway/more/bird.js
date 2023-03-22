CONSOLE.Object('bird',{
	birds:[],len:10,
	gBirds(){
		forIn(this.len,(i)=>{
			this.birds.push(
				{
					engine:this.engine,getPos:this.getPos,
					speed:20,dir:1,accRvalue:0.1,standRotationTime:10,down:false,
					rotation:0,g:this.engine.g,rotate:this.rotate,width:this.width,height:this.height,
					fallspeed:2,
					init(){
						this.x = Math.floor(Math.random()*this.engine.canvas.width);
						this.y = Math.floor(Math.random()*this.engine.canvas.height/2)+this.engine.canvas.height/2;
						this.texture = this.engine.assets.img.bird;
					},
					move(){
						this.x += Math.sin(getRad(this.rotation))*this.speed*this.engine.dt;
						this.y -= Math.cos(getRad(this.rotation))*this.speed*this.engine.dt;
					},
					newDir(){
						this.dir = [-1,1].getRandom();
					},
					changeDir(){
						this.rotation += this.dir*this.accRvalue;
						this.standRotationTime--;
						if(this.standRotationTime<=0){
							this.newDir();
							this.newTimeStand();
							this.newaccRvalue();
						}
					},
					newTimeStand(){
						this.standRotationStime = [200,300,400,500,600,700,800,900,1000].getRandom();
					},
					newaccRvalue(){
						this.accRvalue = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,2,3].getRandom();
					},
					limitHandle(){
						if(this.y <= 0){
							this.y = this.engine.canvas.height;
						}else if(this.y >= this.engine.canvas.height){
							if(this.down){	
								this.rotation = 0;
								this.down = false;
							}
							this.y = this.engine.canvas.height;
						}
						if(this.x >= this.engine.canvas.width){
							this.x = 0
						}else if(this.x <= 0){
							this.x = this.engine.canvas.width;
						}
					},
					update(){
						if(this.down){
							this.y += this.fallspeed;
							this.rotation = 180;
						}else{
							this.move();
							this.changeDir();
						}
						this.limitHandle();
					},
					draw(){
						this.engine.g.save();
						this.rotate();
						this.engine.g.putImage(this.texture,0,0,this.width,this.height);
						this.engine.g.restore();
					}
				}
			);
		})
	},
	init(){
		this.gBirds();
		this.birds.forEach(bird=>{
			bird.init();
		})
	},
	update(){
		this.birds.forEach(bird=>{
			bird.update();
		})
	},
	draw(){
		this.birds.forEach(bird=>{
			bird.draw();
		})
	}
})