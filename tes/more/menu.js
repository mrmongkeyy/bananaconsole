CONSOLE.Object('menu',{
	//box.
	init(){
		this.box = {
			x:CONSOLE.canvasSetting.width/2,y:CONSOLE.canvasSetting.height/3,
			color:'RGBA(255,255,255,0.9)',width:300,height:300
		};
		this.button = {
			x:this.box.x,y:this.box.y+30,
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
			this.engine.object.car.audios.play();
		}
	},
	draw(){
		this.drawBox();
		this.drawTitle();
		this.drawButton();
	},
	drawBox(){
		this.engine.g.rect(this.box.x,this.box.y,this.box.width,this.box.height,this.box.color);
	},
	drawTitle(){
		this.engine.g.text('BuggyTrucks',this.box.x,this.box.y-50,{
			font:'45px calibri',fillStyle:'black',textAlign:'center'
		});
	},
	drawButton(){
		this.engine.g.rect(this.button.x,this.button.y,this.button.width,this.button.height,'black');
		this.engine.g.text('PLAY',this.box.x,this.box.y+43,{
			font:'40px Monospace',fillStyle:'white',textAlign:'center'
		});
		this.engine.g.text('From BananaStudio.',this.box.x,this.box.y+83,{
			font:'16px Monospace',fillStyle:'black',textAlign:'center'
		});
		this.engine.g.text('Powered By BananaConsole.',this.box.x,this.box.y+100,{
			font:'16px Monospace',fillStyle:'black',textAlign:'center'
		});
			
	}
});