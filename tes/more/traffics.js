CONSOLE.Object('traffics',{
	cars:[],len:0,personalities:[1,0],roadWidth:120,radLimit:20,
	init(){
		this.roads = this.engine.object.roads.roads;
		this.generateCars();
		this.cars.forEach(car=>{car.init()});
	},
	update(){
		if(!this.engine.play)return
		this.cars.forEach((car)=>{car.update()});
	},
	draw(){
		this.cars.forEach((car)=>{car.draw()});
	},
	generateCars(){
		this.roads.forEach((point,i)=>{
			//point {x,y}.
			if(i>3){
				let put = 1//this.personalities.getRandom();
				if(put){
					this.cars.push(this.newCars(point,i));
				}
			}
		})
	},
	newCars(point,roadI){
		return {
			cars:this.cars,
			x:point.x,
			y:point.y,w:10,h:22,
			roads:this.roads,RadLimit:this.radLimit,
			g:this.engine.g,sidePos:[this.roadWidth*2/6,this.roadWidth*0.5,this.roadWidth*5/6].getRandom(),
			engine:this.engine,
			car:this.engine.object.car,color:['green','yellow','blue'].getRandom(),
			roadI,rotation:0,speed:85,virtualX:0,virtualY:0,
			rotate(){
				this.g.translate(this.x,this.y);
				this.g.rotate(this.rotation*Math.PI/180);
			},
			init(){
				this.x += this.sidePos;
				this.polly = CONSOLE.rectanglePolly(this.x,this.y,this.w,this.h,this.rotation);
			},
			update(){
				this.polly = CONSOLE.rectanglePolly(this.x,this.y,this.w,this.h,this.rotation*Math.PI/180);
				this.move();
				this.collisionCheck();
			},
			collisionCheck(){
				const r = Math.hypot(this.car.x-this.x,this.car.y-this.y);
				if(r<this.RadLimit)this.car.collide()
			},
			draw(){
				if(!this.drawAble())return;
				this.g.save();
				this.rotate();
				this.engine.g.rect(0,0,this.w,this.h,this.color);
				//wheel
				this.engine.g.rect(this.w/2+2,-this.h/4,2,4,'black');
				this.engine.g.rect(-this.w/2-2,-this.h/4,2,4,'black');
				this.engine.g.rect(this.w/2+2,this.h/4,2,4,'black');
				this.engine.g.rect(-this.w/2-2,this.h/4,2,4,'black');
				this.engine.g.rect(0,-this.h/2-2,12,5,'black');
				this.engine.g.rect(0,1,7,14,'black');
				this.engine.g.rect(0,0,7,7,'white');
				this.g.restore();
				if(this.intersectData)this.g.circle(this.intersectData.x,this.intersectData.y,10,'black');
			},
			move(){
				if(this.roadI+1>=this.roads.length)return;
				let nPointRotation = 0;
				if(this.roadI+1<this.roads.length){
					nPointRotation = vector2Dir(vector2(this.x,this.y),{x:this.roads[this.roadI+1].x+this.sidePos,y:this.roads[this.roadI+1].y});
				}
				this.rotation = -nPointRotation*180/Math.PI;
				const movementx = Math.sin(this.rotation*Math.PI/180)*this.speed*this.engine.dt;
				const movementy = Math.cos(this.rotation*Math.PI/180)*this.speed*this.engine.dt;
				this.x -= movementx;
				this.y += movementy;
				if(this.y < this.roads[this.roadI+1].y)this.roadI += 1;
			},
			drawAble(){
				if(this.y > -(this.engine.viewport.y) && this.y < -(this.engine.viewport.y)+this.engine.canvas.height)return true;
				return false;
			}
		}
	}
})