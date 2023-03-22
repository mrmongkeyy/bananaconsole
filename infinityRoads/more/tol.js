/*CONSOLE.Object('longStreet',{
	distances:CONSOLE.canvasSetting.height,
	points:[],dir:1,time:10,value:0,gap:1,lerpI:0,
	init(){
		//making the lines.
		forIn(this.distances,(i)=>{
			this.points.push({
				x:lerp(100,200,this.lerpI),
				y:i
			});
			this.lerpI += this.gap*this.dir*0.0001;
			if(this.lerpI>1){
				this.dir = -this.dir;
				//this.lerpI = 0;
				//this.gap = 0.001;
			}else if(this.lerpI<0){
				this.dir = -this.dir;
				//this.gap = 0.001;
			}
			this.gap += 2;
		})
		//console.log(this.points);
	},
	draw(){
		this.points.forEach((point)=>{
			this.engine.g.circle(point.x,point.y,5,'black');
		})
	}
})*/