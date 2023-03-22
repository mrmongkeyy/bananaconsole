CONSOLE.Object('winMenu',{
	delete:true,
	init(){
		this.x = this.engine.canvas.width/2;
		this.y = this.engine.canvas.height/2;
		this.w = this.engine.canvas.width*0.9;
		this.h = this.engine.canvas.height*0.6;
		this.okButton = {
			x:this.x,
			y:this.y+50,
			w:100,h:50
		}
	},
	update(){
		if(this.clicked(this.okButton)){
			location.reload();
		}
	},
	draw(){
		//draw the box back.
		this.engine.g.rect(this.x-this.engine.viewport.x,this.y+this.engine.viewport.y,this.w+5,this.h+5,'black');
		this.engine.g.rect(this.x-this.engine.viewport.x,this.y+this.engine.viewport.y,this.w,this.h,'white');
		//draw the text.
		this.engine.g.text('You Win.',this.x-this.engine.viewport.x,this.y+this.engine.viewport.y,{
			font:'40px Monospace',fillStyle:'black'
		});
		this.engine.g.rect(this.okButton.x-this.engine.viewport.x,this.okButton.y+this.engine.viewport.y,100,50,'black');
		this.engine.g.text('OK',this.x-this.engine.viewport.x,this.y+63+this.engine.viewport.y,{
			font:'40px Monospace',fillStyle:'white'
		});
	}
})