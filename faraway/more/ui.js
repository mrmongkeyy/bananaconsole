CONSOLE.Object('ui',{
	init(){
		this.box = {
			engine:this.engine,
			g:this.engine.g,
			x:this.engine.canvas.width/2,
			y:this.engine.canvas.height*1/15,
			w:this.engine.canvas.width*0.9,
			h:50,
			color:'RGB(255,255,255,.5)',
			draw(){
				this.g.rect(this.x,this.y,this.w,this.h,this.color);
			}
		}
		this.Info = {
			engine:this.engine,shootLen:-1,
			g:this.engine.g,
			scx:this.engine.canvas.width/15,
			scy:this.engine.canvas.height*1/13,
			acx:this.engine.canvas.width*14/15,
			acy:this.engine.canvas.height*1/13,
			w:this.engine.canvas.width*0.9,
			h:50,
			color:'black',
			score:0,
			onTarget:0,
			acc:100,
			draw(){
				this.g.text('SCORE: '+this.score,this.scx,this.scy,{
					font:'20px Monospace',fillStyle:this.color,textAlign:'left'
				});
				this.g.text('ACC: '+this.getAccuration()+'%',this.acx,this.acy,{
					font:'20px Monospace',fillStyle:this.color,textAlign:'right'
				});
			},
			getAccuration(){
				if(this.shootLen==0)return 100;
				return Math.round((this.onTarget/this.shootLen)*100);
			}
		}
	},
	update(){

	},
	draw(){
		this.box.draw();
		this.Info.draw();
	}
})