const config = {
	canvasSetting:{
		width:innerWidth/2,
		height:innerHeight-100
	},
	toLoad:[
		{
			id:'scope',
			type:'img',
			src:'./more/media/scope.png'
		},
		{
			id:'bird',
			type:'img',
			src:'./more/media/bird.png'
		},
		{
			id:'cloud',
			type:'img',
			src:'./more/media/cloud.png'
		},
		{
			id:'gun',
			type:'img',
			src:'./more/media/gun.png'
		}
	]
}

//simple handling.
if(innerWidth<900){
	config.canvasSetting.width = innerWidth;
	config.canvasSetting.height = innerHeight;
}
const CONSOLE = new consolE(config);