CONSOLE.Object('gameEndScene',{
	delete:true,
	init(){
		this.x = this.engine.canvas.width/2;
		this.y = this.engine.canvas.height*2/6;
		this.w = this.engine.canvas.width*0.9;
		this.h = this.engine.canvas.height*0.4;
		this.pAbutton = {
			x:this.x,y:this.y+80,w:100,h:50
		}
	},
	update(){
		if(this.clicked(this.pAbutton)){
			location.reload();
		}
	},
	draw(){
		//this.engine.g.rect(this.x,this.y,this.w+10,this.h+10,'black');
		this.engine.g.rect(this.x-this.engine.viewport.x,this.y+this.engine.viewport.y,this.w,this.h,'RGBA(255,255,255,0.9)');
		this.engine.g.text('You lose!',this.x-this.engine.viewport.x,this.y-50+this.engine.viewport.y,{
			font:'40px Monospace',textAlign:'center',fillStyle:'black'
		});
		this.engine.g.text(this.score,this.x-this.engine.viewport.x,this.y+10+this.engine.viewport.y,{
			font:'40px Monospace',textAlign:'center',fillStyle:'black'
		});
		this.engine.g.text('becareful next time!',this.x-this.engine.viewport.x,this.y+35+this.engine.viewport.y,{
			font:'14px Monospace',textAlign:'center',fillStyle:'black'
		});
		//pA button.
		this.engine.g.rect(this.pAbutton.x-this.engine.viewport.x,this.pAbutton.y+this.engine.viewport.y,this.pAbutton.w,this.pAbutton.h,'black');
		this.engine.g.text('AGAIN',this.x-this.engine.viewport.x,this.pAbutton.y+8+this.engine.viewport.y,{
			font:'30px Monospace',textAlign:'center',fillStyle:'white'
		});
	},
	show(score){
		this.score = Math.round(score);
		this.delete = false;
		this.engine.stopAudios();
	}
})