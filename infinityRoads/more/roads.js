CONSOLE.Object('roads',{
	roads:[
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-100},
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-200},
		{x:CONSOLE.canvasSetting.width/2-65,y:CONSOLE.canvasSetting.height*2/3-300}
	],stuffRadLimit:30,
	length:100,roadWidth:200,roadSegment:1,roadIndex:0,stuffColor:[{name:'dollar',size:15,RadLimit:20},{name:'rook',size:50,RadLimit:30}],
	buildRoads(){
		for(let i=this.roadIndex;i<this.length;i++){
			const y = (i+1)*(-100);
			const road = {x:Math.floor(Math.random()*200+100),y};
			road.stuffX = [road.x+this.roadWidth*2/6,road.x+this.roadWidth*3/6,road.x+this.roadWidth*5/6].getRandom();
			road.stuff = this.stuffColor.getRandom();
			this.roads.push(road);
			if(i===this.length-1)this.roadIndex = i;
		}
	},
	init(){
		this.buildRoads();
		this.car = this.engine.object.car;
	},
	update(){
		if(!this.engine.play)return;
	},
	move(i){
		return;
		if(!this.engine.play)return
		this.roads[i].x -= Math.sin(this.car.rotation*Math.PI/180)*this.car.speed*this.engine.dt;
		this.roads[i].y += Math.cos(this.car.rotation*Math.PI/180)*this.car.speed*this.engine.dt;
		if(this.roads[i].stuff){
			this.roads[i].stuffX -= Math.sin(this.car.rotation*Math.PI/180)*this.car.speed*this.engine.dt;
		}
	},
	collideStuffHandler(name){
		const xevent = {
			engine:this.engine,
			dollar(){
				this.engine.object.car.dollarCount += 1;
				this.engine.object.car.coinSound.play();
			}
		}
		if(xevent[name])xevent[name]();
		else this.car.collideLen += 10;
	},
	buildCircle(cpos,i){
		if(i<this.roads.length && this.roads[i].stuff){
			this.engine.g.putImage(this.engine.assets.img[this.roads[i].stuff.name],this.roads[i].stuffX,this.roads[i].y,this.roads[i].stuff.size,this.roads[i].stuff.size);
			//makeSimple collision check.
			const r = Math.hypot(this.car.x-this.roads[i].stuffX,this.car.y-this.roads[i].y);
			if(r<=this.roads[i].stuff.RadLimit){
				const name = this.roads[i].stuff.name;
				delete this.roads[i].stuff;
				this.collideStuffHandler(name);
			}
		}
		this.engine.g.circle(cpos.x,cpos.y,10,'lightgray');
		this.engine.g.circle(cpos.x+this.roadWidth,cpos.y,10,'lightgray');
		this.engine.g.circle(cpos.x,cpos.y,5,'black');
		this.engine.g.circle(cpos.x+this.roadWidth,cpos.y,5,'black');
	},
	draw(){
		for(let i=0;i<this.roads.length;i++){
			const cpos = this.roads[i];
			let npos;
			if(i!==this.roads.length-1 && this.drawAble(i)){
				npos = this.roads[i+1];
				this.engine.g.line(cpos.x+this.roadWidth/2,cpos.y,npos.x+this.roadWidth/2,npos.y,'white',180);
			}
			this.move(i);
		}
		for(let i=0;i<this.roads.length;i++){
			const cpos = this.roads[i];
			let npos;
			if(i!==this.roads.length-1){
				if(this.drawAble(i)){
					npos = this.roads[i+1];
					this.engine.g.line(cpos.x,cpos.y,npos.x,npos.y,'black',8);
					this.engine.g.line(cpos.x+this.roadWidth,cpos.y,npos.x+this.roadWidth,npos.y,'black',8);
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
				}
			}else{
				this.buildCircle(cpos);
				//win condition.
				if(this.car.y <= cpos.y){
					this.engine.play = false;
					this.engine.object.winMenu.delete = false;
				}
			}
			this.move(i);
		}
	},
	drawAble(i){
		if(this.roads[i].y > (this.engine.viewport.y)+100 && this.roads[i].y < (this.engine.viewport.y)+this.engine.canvas.height)return true;
		return false;
	},
});