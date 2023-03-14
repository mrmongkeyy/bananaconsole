CONSOLE.Object('roads',{
	roads:[
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-100},
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-200},
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-300}
	],
	length:1000,roadWidth:120,roadSegment:1,roadIndex:0,
	buildRoads(){
		for(let i=this.roadIndex;i<this.length;i++){
			const y = (i+1)*(-100);
			this.roads.push({x:Math.floor(Math.random()*200+100),y});
			if(i===this.length-1)this.roadIndex = i;
		}
	},
	init(){
		this.buildRoads();
	},
	update(){
		this.car = this.engine.object.car;
	},
	move(i){
		if(!this.engine.play)return
		this.roads[i].x -= Math.sin(this.car.rotation*Math.PI/180)*this.car.speed*this.engine.dt;
		this.roads[i].y += Math.cos(this.car.rotation*Math.PI/180)*this.car.speed*this.engine.dt;
	},
	buildCircle(cpos,i){
		this.engine.g.circle(cpos.x,cpos.y,15,'lightgray');
		this.engine.g.circle(cpos.x+this.roadWidth,cpos.y,15,'lightgray');
		this.engine.g.circle(cpos.x,cpos.y,10,'black');
		this.engine.g.circle(cpos.x+this.roadWidth,cpos.y,10,'black');
	},
	draw(){
		for(let i=0;i<this.roads.length;i++){
			const cpos = this.roads[i];
			let npos;
			if(i!==this.roads.length-1 && this.drawAble(i)){
				npos = this.roads[i+1];
				this.engine.g.line(cpos.x+this.roadWidth/2,cpos.y,npos.x+this.roadWidth/2,npos.y,'white',150);
			}
			this.move(i);
		}
		for(let i=0;i<this.roads.length;i++){
			const cpos = this.roads[i];
			let npos;
			if(i!==this.roads.length-1){
				if(this.drawAble(i)){
					npos = this.roads[i+1];
					this.engine.g.line(cpos.x,cpos.y,npos.x,npos.y,'black',10);
					this.engine.g.line(cpos.x+this.roadWidth,cpos.y,npos.x+this.roadWidth,npos.y,'black',10);
					this.buildCircle(cpos,i);
					this.buildCircle(npos,i);

					//emplem the intersection methode.
					if(this.car.y <= cpos.y && this.car.y >= npos.y){
						for(let i=0;i<this.car.polly.length;i++){
							const endpoint = (i+1)%this.car.polly.length;
							const intersectLeft = getIntersection(this.car.polly[i],this.car.polly[endpoint],{x:cpos.x+10,y:cpos.y},{x:npos.x+10,y:npos.y});
							const intersectRight = getIntersection(this.car.polly[i],this.car.polly[endpoint],{x:cpos.x+this.roadWidth-10,y:cpos.y},{x:npos.x+this.roadWidth-10,y:npos.y});
							if(intersectLeft || intersectRight){
								this.car.collide();
							}
						}
					}
					//if(cpos.y+2>=this.car.y && cpos.y<=this.car.y){
						//this.roadSegment += 1;
						//if(this.roadSegment > 10)this.buildRoads();
					//}
				}
			}else this.buildCircle(cpos);
			this.move(i);
		}
	},
	drawAble(i){
		return this.roads[i].y > this.engine.canvas.height/4-50 && this.roads[i].y < this.engine.canvas.height*3/4;
	}
});