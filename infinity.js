Array.prototype.getRandom = function(){
	return this[Math.floor(Math.random()*this.length)];
}
Object.prototype.len = function(){
	let x = 0;
	for(let i in this){x++}
	return x-2;
}
Object.prototype.forEach = function(callback){
	let i = 0;
	for(let key in this){
		callback(this[key],i);
		i++;
	}
}
Object.prototype.isVector = function(){
	if(
		this.x && typeof this.x === 'number' &&
		this.y && typeof this.y === 'number'
		)return true;
	return false;
}
Object.prototype.VSubstract = function(vector){
	if(this.isVector()){
		return {x:this.x-vector.x,y:this.y-vector.y}
	}
}
Object.prototype.getVector = function(){
	if(this.isVector()){
		const x = this.x;
		const y = this.y;
		return {x,y};
	}return null;
}
Object.prototype.moveTo = function(vector){
	if(this.isVector()){
		const nvector = this.VSubstract(vector);
		const theta = Math.atan2(nvector.y,nvector.x);
		this.x += Math.cos(theta);
		this.y -= Math.sin(theta);
		return this.getVector();
	}return false;
}
Object.prototype.sameVector = function(vector){
	if(this.isVector()&&vector.isVector()){
		if(Math.round(this.x) === Math.round(vector.x) && Math.round(this.y) === Math.round(vector.y))return true;
		return false;
	}
}
const vector2 = function(x=0,y=0){
	return {x,y};
}
const forIn = function(n,f){
	for(let i=0;i<n;i++)if(f)f(i);
}
const getRad = function(n){return n*Math.PI/180}
const vector2Dir = function(v1,v2){
	return Math.atan2(v2.x-v1.x,v2.y-v1.y);
}
const transformV = function(v1,v2){
	return vector2(v2.x-v1.x,v2.y-v1.y);
}
const getMagnitude = function(vector){
	return Math.hypot(vector.x,vector.y);
}