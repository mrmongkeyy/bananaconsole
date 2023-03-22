CONSOLE.Object('people',{
	peoples:[],peoplesLen:100,
	init(){
		const xValue = random(this.peoplesLen);
		forIn(this.peoplesLen,(i)=>{
			const point = this.engine.object.city.turningPoint.getRandom();
			this.peoples.push({
				engine:this.engine,
				g:this.engine.g,
				x:point.x,y:point.y,
				color:['red','black','blue'].getRandom(),
				w:10,h:10,dir:{x:1,y:0},speed:[30,40,50].getRandom(),
				checkPointR:.5,
				isWanted:(i===xValue)?true:false,
				update(){
					this.move();
					this.checkPointHandle();
					this.limitHandle();
				},
				move(){
					this.x += this.dir.x*this.speed*this.engine.dt;
					this.y += this.dir.y*this.speed*this.engine.dt;
				},
				checkPointHandle(){
					this.engine.object.city.turningPoint.forEach(point=>{
						if((this.x >= point.x-this.checkPointR && this.y >= point.y-this.checkPointR)&&
								(this.x <= point.x+this.checkPointR && this.y <= point.y+this.checkPointR)
							){
							this.dir = [
								{x:-1,y:0},//left
								{x:1,y:0},//right
								{x:0,y:1},//bottom
								{x:0,y:-1},//top
							].getRandom();
						}
					})
				},
				limitHandle(){
					if(this.x > this.engine.canvas.width){
						this.x = 0
					}else if(this.x < 0){
						this.x = this.engine.canvas.width;
					}
					if(this.y > this.engine.canvas.height){
						this.y = 0;
					}else if(this.y < 0){
						this.y = this.engine.canvas.height;
					}
				},
				draw(){
					const thiscolor = (this.isWanted)?'orange':this.color;
					this.g.rect(this.x,this.y,this.w,this.h,thiscolor);
				}
			})
		})
	},
	update(){
		this.peoples.forEach(people=>{
			people.update();
		})
	},
	draw(){
		this.peoples.forEach(people=>{
			people.draw();
		})
	}
})