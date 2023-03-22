CONSOLE.Object('city',{
	cities:[],
	turningPoint:[],lenCity:3,
	gCities(){
		//for columns.
		const columnLen = this.lenCity;
		const gap = 50;
		forIn(columnLen,(i)=>{
			//for rows.
			const rowLen = this.lenCity;
			const h = this.engine.canvas.height/(columnLen);
			const w = this.engine.canvas.width/rowLen;
			forIn(rowLen,(j)=>{
				const box = {
					h:h-gap,
					w:w-gap,
					y:this.engine.canvas.height*(i+1)/(columnLen*2)+h/2*i,
				}
				this.turningPoint.push({
					x:w*(j),
					y:h*(i)
				})
				if(i===columnLen-1 || j===rowLen-1){
					this.turningPoint.push({
						x:w*(j+1),
						y:h*(i+1)
					})
				}
				box.x = this.engine.canvas.width*(j+1)/(rowLen*2)+w/2*j;
				this.cities.push(box);
			})
		})
	},
	init(){
		this.gCities();
	},
	update(){

	},
	draw(){
		this.cities.forEach(city=>{
			this.engine.g.rect(city.x,city.y,city.w,city.h,'black');
			this.engine.g.rect(city.x,city.y,city.w-5,city.h-5,'lightgray');
		})
	}
})