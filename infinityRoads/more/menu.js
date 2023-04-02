CONSOLE.Object('menu',{
	//box.
	init(){
		this.box = {
			x:CONSOLE.canvasSetting.width/2,y:CONSOLE.canvasSetting.height/3,
			color:'RGB(255,255,255,1)',width:CONSOLE.canvasSetting.width*0.9,height:CONSOLE.canvas.height*0.3
		};
		this.button = {
			x:this.box.x,y:this.box.y,
			width:125,height:50,
		};
		this.buttonClear = {
			x:this.box.x+this.engine.canvas.offsetLeft,
			y:this.box.y+this.engine.canvas.offsetTop,
			width:this.box.width,height:this.box.height
		};
	},
	update(){
		if(this.clicked(this.button)){
			this.delete = true;
			this.engine.play = true;
			this.engine.object.car.audios.useInterval = true;
			//this.engine.object.car.audios.play();
		}
	},
	draw(){
		this.engine.g.rect(this.box.x,this.box.y,this.box.width+1,this.box.height+1,'black');
		this.drawBox();
		this.drawTitle();
		this.drawButton();
	},
	drawBox(){
		this.engine.g.rect(this.box.x,this.box.y,this.box.width,this.box.height,this.box.color);
	},
	drawTitle(){
		this.engine.g.text('"THE INFINITY ROADS"',this.box.x,this.box.y-50,{
			font:`${(this.engine.canvas.width*0.075<20)?this.engine.canvas.width*0.075:20}px Monospace`,fillStyle:'black',textAlign:'center'
		});
	},
	drawButton(){
		this.engine.g.rect(this.button.x,this.button.y,this.button.width,this.button.height,'black');
		this.engine.g.text('PLAY',this.box.x,this.box.y+13,{
			font:`40px Monospace`,fillStyle:'white',textAlign:'center'
		});
		this.engine.g.text('INFINITYDREAMS, 2023.',this.box.x,this.box.y+63,{
			font:`${this.engine.canvas.width*0.05<15?this.engine.canvas.width*0.05:15}px Monospace`,fillStyle:'black',textAlign:'center'
		});
		this.engine.g.text('Powered By BananaConsole.',this.box.x,this.box.y+80,{
			font:`${this.engine.canvas.width*0.05<15?this.engine.canvas.width*0.05:15}px Monospace`,fillStyle:'black',textAlign:'center'
		});
			
	}
});