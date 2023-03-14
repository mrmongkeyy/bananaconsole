const config = {
	canvasSetting:{
		width:innerWidth/4,
		height:innerHeight-50,
		backgroundColor:'yellow'
	},
	toLoad:[
		{
			id:'steer',
			type:'img',
			src:'./more/media/steering.png'
		},
		{
			id:'distance',
			type:'img',
			src:'./more/media/distance.png'
		},
		{
			id:'pedal',
			type:'img',
			src:'./more/media/pedal.png'
		},
		{
			id:'break',
			type:'img',
			src:'./more/media/breaking.png'
		}
	],
}
//handling some kind of settings.
if(innerWidth<900){
	config.canvasSetting.width = innerWidth;
	config.canvasSetting.height = innerHeight;
}

const CONSOLE = new consolE(config);