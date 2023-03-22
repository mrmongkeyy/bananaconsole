CONSOLE.Object('menu',{
	init(){
		this.box = {
			texture:this.engine.assets.img.gun,
			x:this.engine.canvas.width/2,
			y:this.engine.canvas.height/2,
			w:this.engine.canvas.width*.7,
			h:this.engine.canvas.height*3/4,
			g:this.engine.g,
			engine:this.engine,
			color:'RGB(255,255,255,0.5)',
			draw(){
				this.g.rect(this.x,this.y,this.w,this.h,this.color);
				this.g.putImage(this.texture,this.x,this.y-70,100,100);
				this.g.text('FARAWAY!',this.x,this.y+30,{
					font:'40px Monospace',fillStyle:'black',textAlign:'center'
				})
			}
		},
		this.button = {
			g:this.engine.g,
			x:this.engine.canvas.width/2,
			y:this.engine.canvas.height/2+90,
			w:100,h:50,color:'orange',
			draw(){
				this.g.rect(this.x,this.y,this.w,this.h,this.color);
				this.g.text('GO',this.x,this.y+10,{
					fillStyle:'white',font:'30px Monospace',textAlign:'center'
				});
				this.g.text('FROM INFINITYDREAMS.',this.x,this.y+100,{
					fillStyle:'black',font:'15px Monospace',textAlign:'center'
				})
			}
		}
	},
	update(){
		if(this.clicked(this.button)){
			this.engine.play = true;
			this.delete = true;
			this.engine.object.things.audio.play();
		}
	},
	draw(){
		this.box.draw();
		this.button.draw();
	}
})