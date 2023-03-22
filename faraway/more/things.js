CONSOLE.Object('things',{
	audio:CONSOLE.audio({src:'./more/media/desertSound.mp3',autoplay:true}),
	init(){
		this.ground = {
			g:this.engine.g,
			x:this.engine.canvas.width/2,
			y:this.engine.canvas.height*9/10,
			w:this.engine.canvas.width,
			h:this.engine.canvas.height*2/10,
			color:'#007de9',
			draw(){
				this.g.rect(this.x,this.y,this.w,this.h,'orange');
			}
		}
	},
	update(){

	},
	draw(){
		this.ground.draw();
	},
})