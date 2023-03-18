
const lerp = function(a,b,t){
	return a+(b-a)*t;
}

const vectorR = function(vector,origin,angle){
	const nvector = {x:vector.x-origin.x,y:vector.y-origin.y};
	const nnvector = {
		x:nvector.x*Math.cos(angle)-nvector.y*Math.sin(angle),
		y:nvector.x*Math.sin(angle)+nvector.y*Math.cos(angle)
	}
	return nnvector;
}

const getIntersection = function(a,b,c,d){
	/*
		x = lerp(a.x,b.x,t) = lerp(c.x,d.x,u).
		x = a.x+(b.x-a.x)t = c.x+(d.x-c.x)u.
		x = (a.x-c.x)+(b.x-a.x)t = (d.x-c.x)u.
		y = lerp(a.y,b.y,t) = lerp(c.y,d.y,u).
		y = a.y+(b.y-a.y)t = c.y+(d.y-c.y)u.
		y = (a.y-c.y)+(b.y-a.y)t = (d.y-c.y)u.
		y = (d.x-c.x)(a.y-c.y)+(d.x-c.x)(b.y-a.y)t = (d.y-c.y)(d.x-c.x)u.
		y = (d.x-c.x)(a.y-c.y)+(d.x-c.x)(b.y-a.y)t = (d.y-c.y)(a.x-c.x)+(d.y-c.y)(b.x-a.x)t.
		y = (d.x-c.x)(a.y-c.y)+((d.x-c.x)(b.y-a.y)t)-(d.y-c.y)(a.x-c.x) = (d.y-c.y)(b.x-a.x)t.
		y = (d.x-c.x)(a.y-c.y)-(d.y-c.y)(a.x-c.x) = (d.y-c.y)(b.x-a.x)t-(d.x-c.x)(b.y-a.y)t.
		y = (d.x-c.x)(a.y-c.y)-(d.y-c.y)(a.x-c.x) = ((d.y-c.y)(b.x-a.x)-(d.x-c.x)(b.y-a.y))t.
		t = (d.x-c.x)(a.y-c.y)-(d.y-c.y)(a.x-c.x)/((d.y-c.y)(b.x-a.x)-(d.x-c.x)(b.y-a.y)).
	*/
	const top = (d.x-c.x)*(a.y-c.y)-(d.y-c.y)*(a.x-c.x); 
	const bottom = ((d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y));
	const t = top/bottom;
	if(t<=1 && t>=0)
		return {x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),t}
	return false;
}

class consolE{
	wannaStop = false;
	dt = null;prevtime = Date.now();
	canvasSetting = {
		width:100,height:100,
		backgroundColor:'white'
	}
	maxDelta = 0.03; 
	object = {};
	assets = {
		img:{},//filled with {object}.
		audio:{}
	};
	viewport = {x:0,y:0};
	touches = {};
	constructor(config){
		Object.assign(this,config);
	}
	//core
	preload(afterLoad){
		this.load(this.toLoad||[],afterLoad);
	}
	start(){
		this.preload(
			()=>{
				console.log(this);
				this.setupKeys();
				this.setCanvas();
				this.init();
				this.process();
			}
		);
	}
	init(){
		//give core css style to the game.
		document.head.appendChild(this.makeElement({el:'link',props:{href:'../more/console.style.css',rel:'stylesheet'}}));
		//
		this.object.forEach((obj)=>{
			if(obj.init){
				if(!obj.engine)obj.engine = this;
				obj.init();
			}
		})
	}
	update(){
		this.object.forEach((obj)=>{
			if(obj.update && !obj.delete){
				if(!obj.engine)obj.engine = this;
				obj.update();
			}
		})
	}
	draw(){
		this.cls(this.canvasSetting.backgroundColor);
		this.object.forEach((obj)=>{
			if(obj.draw && !obj.delete){
				if(!obj.engine)obj.engine = this;
				obj.draw();
			}
		})
	}
	cls(color){
		this.g.reset();
		this.g.translate(this.viewport.x,this.viewport.y);
		this.g.fillStyle = color||'white';
	}
	process = () =>{
		this.getDelta();
		this.update();
		if(this.dt<this.maxDelta)this.draw();
		if(this.keys.Escape){this.stop()}
		if(!this.wannaStop)requestAnimationFrame(this.process);	
	}
	stop(){
		this.wannaStop = true;
		this.stopAudios();
	}
	stopAudios(){
		for(let i of this.audios){
			i.stop();
		}
	}
	run(){
		this.init();
	}
	//end
	//additional
	setupKeys(){
		this.keys = {};
		//creating the events.
		document.onkeydown = (e)=>{
			this.keys[e.key] = true;
		}
		document.onkeyup = (e)=>{
			delete this.keys[e.key];
		}
		document.onmousedown = (e)=>{
			this.mouseDown = true;
			this.mouse = e;
		}
		document.onmouseup = (e)=>{
			this.mouseDown = false;
			this.mouse = null;
		}
		document.ontouchstart = (e)=>{
			this.touches = e.touches;
		}
		document.ontouchend = (e)=>{
			this.touches = e.touches;
		}
		document.ontouchmove = (e)=>{
			this.touches = e.touches;
		}
		document.onmousemove = (e)=>{
			this.mouse = e;
		}
	}
	click
	getDelta(){
		const time = Date.now();
		this.dt = (time-this.prevtime)/1000;
		this.prevtime = time;
	}
	Object(id,config){
		this.object[id] = Object.assign({
			x:0,y:0,width:10,height:10,delete:false,
			init(){},update(){},draw(){},id,
			clicked(otObject){
				if(this.engine.mouseDown || this.engine.touches.length>0){
					const mouse = this.engine.mouse||{x:this.engine.touches[0].pageX,y:this.engine.touches[this.engine.touches.length-1].pageY};
					let npos;
					if(otObject){
						if(!otObject.width && otObject.w)otObject.width = otObject.w;
						if(!otObject.height && otObject.h)otObject.height = otObject.h;
						npos = this.normalizePos2Canvas(otObject);
						if(
							(npos.x-otObject.width/2)<mouse.x&&
							(npos.x+otObject.width/2)>mouse.x&&
							(npos.y-otObject.height/2)<mouse.y&&
							(npos.y+otObject.height/2)>mouse.y)return true;
					}else{
						npos = this.normalizePos2Canvas({x:this.x,y:this.y});
						if(
							(npos.x-this.width/2)<mouse.x&&
							(npos.x+this.width/2)>mouse.x&&
							(npos.y-this.height/2)<mouse.y&&
							(npos.y+this.height/2)>mouse.y)return true;	
					}
					
				}
				return false;
			},
			rotate(){
				this.engine.g.translate(this.x,this.y);
				this.engine.g.rotate(this.rotation*Math.PI/180);
			},rotation:0,
			normalizePos2Canvas(pos){
				return {x:pos.x+this.engine.canvas.offsetLeft,y:pos.y+this.engine.canvas.offsetTop}
			},
			getPos(){
				return {x:this.x,y:this.y};
			},
			drawPolly(){
				let pointA,pointB;
				for(let i=0;i<this.polly.length;i++){
					pointA = this.polly[i];
					if(i<this.polly.length-1){
						pointB = this.polly[i+1];
					}else pointB = this.polly[0];
					this.engine.g.line(pointA.x,pointA.y,pointB.x,pointB.y,'red',2);
				}
			}
		},config);
	}
	load(config,afterLoad){
		//config [{}].
		let i = 0;
		const loader = (i)=>{
			const el = this.makeElement({el:config[i].type});
			el.src = config[i].src;
			Object.assign(el,config[i].additional||{});
			el.onload = ()=>{
				this.assets[config[i].type][config[i].id] = el;
				i++;
				if(i<config.length)loader(i);
				else if(afterLoad)afterLoad();
			}
		}
		if(i<config.length)loader(i);
		else if(afterLoad)afterLoad();
	}
	makeElement(config){
		return Object.assign(document.createElement(config.el),config.props);
	}
	setCanvas(){
		this.canvas = this.makeElement({
			el:'canvas',props:this.canvasSetting
		});
		this.g = this.canvas.getContext('2d');
		Object.assign(this.g,this.console.g)
		document.body.appendChild(this.canvas);
	}
	console = {
		g:{
			rect(x,y,w,h,color='white'){
				this.fillStyle = color;
				this.fillRect(x-w/2,y-h/2,w,h);
			},
			circle(x,y,r,color){
				this.beginPath();
				this.fillStyle = color;
				this.arc(x,y,r,0,Math.PI*2);
				this.fill();
			},
			line(x,y,x1,y2,color='black',width='5',lineCap='round'){
				this.beginPath();
				this.strokeStyle = color;
				this.lineWidth = width;
				this.lineCap = lineCap;
				this.moveTo(x,y);
				this.lineTo(x1,y2);
				this.stroke();
			},
			putImage(src,x,y,width,height){
				this.drawImage(src,x-width/2,y-height/2,width,height);
			},
			rotateObject(obj,rotation){
				this.translate(obj.x,obj.y);
				this.rotate(rotation*Math.PI/180);
			},
			text(text,x,y,optional){
				Object.assign(this,optional);
				this.fillText(text,x,y);
				//else this.strokeText(text,x,y);
			},
			box(x,y,w,h){
				
			}
		}
	}
	audio(config){
		const audio = {
			config,stoped:true,useIntrval:false,engine:this,
			init(){
				this.one = new Audio();
				this.one.src = this.config.src;
				this.two = new Audio();
				this.two.src = this.config.src;
				this.playAble = 'one';
				return this;
			},
			play(){
				const cAudio = this[this.playAble];
				cAudio.play();
				this.stoped = false;
				if(this.useInterval)this.intervalUpdate();
			},
			update(){
				if(this.stoped)return
				if(!this.useInterval)this.checkAudio();
			},
			checkAudio(){
				if(this.cTime!=this[this.playAble].currentTime){
					this.cTime = this[this.playAble].currentTime;
					if(this.cTime >= (this.config.limit||this[this.playAble].duration)){
						this[this.playAble].volume = 0.5;
						this.playAble = this.playAble==='one'?'two':'one';
						this[this.playAble].play();
						this[this.playAble].volume = this.volume||1;
					}
				}
			},
			pause(){
				this[this.playAble].pause();
				this.stoped = true;
			},
			stop(){
				this[this.playAble].pause();
				this[this.playAble].currentTime = 0;
				this.stoped = true;
			},
			intervalUpdate(){
				this.interval = setInterval(()=>{
					if(this.stoped)clearInterval(this.interval);
					else this.checkAudio();
				},this.config.limit||this.one.duration-1);
			}
		}.init();
		this.audios.push(audio);
		return audio;
	}
	audios = [];
	getMouseCanvasOrigin(){
		return {
			x:this.mouse.x+this.canvas.offsetLeft,
			y:this.mouse.y+this.canvas.offsetTop
		}
	}
	rectanglePolly(xpos,ypos,w,h,rotation){
		rotation *= -1;
		const points = [];
		const radius = Math.hypot(w,h)/2;
		const alpha = Math.atan2(w,h);
		points.push({
			x:xpos-Math.sin(rotation-alpha)*radius,
			y:ypos-Math.cos(rotation-alpha)*radius
		});
		points.push({
			x:xpos-Math.sin(rotation+alpha)*radius,
			y:ypos-Math.cos(rotation+alpha)*radius
		});
		points.push({
			x:xpos-Math.sin(Math.PI+rotation-alpha)*radius,
			y:ypos-Math.cos(Math.PI+rotation-alpha)*radius
		});
		points.push({
			x:xpos-Math.sin(Math.PI+rotation+alpha)*radius,
			y:ypos-Math.cos(Math.PI+rotation+alpha)*radius
		});
		return points;
	}
	particles(optional={}){
		return Object.assign({
			x:0,y:0,engine:null,parent:null,
			shapes:[],len:1,lifeTime:15,speed:12,initLifeTime:15,
			width:5,height:5,color:'gray',acceL:1,
			beforeShape(){},afterShape(){},shapeOption:{},
			init(){
				this.beforeShape();
				forIn(this.len,()=>{
					this.shapes.push(this.makeShape());
				});
				this.afterShape();
				this.shapes.forEach(shape=>{
					if(shape.init)shape.init();
				})
			},
			update(){
				this.shapes.forEach(shape=>{
					shape.update();
				})
			},
			draw(){
				this.shapes.forEach(shape=>{
					shape.draw();
				})
			},
			makeShape(){
				return Object.assign({
					parent:this.parent,
					x:this.x,initX:this.x,initY:this.y,y:this.y,engine:this.engine,speed:this.speed,
					w:this.width,h:this.height,color:this.color,
					velocity:{x:0,y:0},acceL:this.acceL,lifeTime:this.lifeTime,initLifeTime:this.initLifeTime,
					update(){
						this.move();
						if(this.lifeTime<=0){
							this.y = this.engine.object[this.parent].y;
							this.x = this.engine.object[this.parent].x;
							this.velocity = vector2();
							this.lifeTime = this.initLifeTime;
						}
						this.lifeTime--;
					},
					draw(){
						this.engine.g.rect(this.x,this.y,this.w,this.h,this.color);
					},
					move(){
						this.velocity.x += this.acceL;
						this.velocity.y += this.acceL;
						this.x -= Math.sin(getRad(this.engine.object[this.parent].rotation))*this.velocity.x*this.engine.dt*this.speed;
						this.y += Math.cos(getRad(this.engine.object[this.parent].rotation))*this.velocity.y*this.engine.dt*this.speed;
					}
				},this.shapeOption);
			}
		},optional);
	}
	isInView(vectorPosition){
		if(
			vectorPosition.x>=this.viewport.x && vectorPosition.x<=-(this.viewport.x)+this.canvas.width&&
			vectorPosition.y>=this.viewport.y && vectorPosition.y<=-(this.viewport.y)+this.canvas.height
		)return true;
		return false;
	}
}


