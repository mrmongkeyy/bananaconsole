CONSOLE.Object('cloud',{
	clouds:[],cloudLen:5,
	gClouds(){
		forIn(this.cloudLen,()=>{
			this.clouds.push({
				texture:this.texture,
				engine:this.engine,
				g:this.engine.g,
				x:Math.floor(Math.random()*this.engine.canvas.width),
				y:Math.floor(Math.random()*this.engine.canvas.height*3/4),
				w:[250,300].getRandom(),
				h:[150].getRandom(),
				speed:[1,2,3,4,5].getRandom(),
				dir:[-1,1].getRandom(),
				draw(){
					this.g.putImage(this.texture,this.x,this.y,this.w,this.h);
				},
				move(){
					this.x += this.dir*this.engine.dt*this.speed;
				},
				handleLimit(){
					if(this.x+this.w/2 < 0)this.x = this.engine.canvas.width;
					else if(this.x-this.w/2 > this.engine.canvas.width)this.x = 0;
				},
				update(){
					this.move();
					this.handleLimit();
				}
			});
		})
	},
	init(){
		this.texture = this.engine.assets.img.cloud;
		this.gClouds();
	},
	update(){
		this.clouds.forEach(cloud=>{
			cloud.update();
		})
	},
	draw(){
		this.clouds.forEach(cloud=>{
			cloud.draw();
		})
	}
})