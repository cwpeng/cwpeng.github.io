class Thing{
	constructor(life){
		this.life=(life===undefined?0:life);
	}
	output(){ // 對外釋放的環境因子
		return {};
	}
	response(totalFactor){ // 接受外部的環境因子
		// 如果 1 < 水 - 沙漠 - 樹，長出新樹
		const water=totalFactor.waterCount-totalFactor.factoryCount-totalFactor.treeCount;
		if(water>4){
			return new Water(water);
		}else if(water>0){
			return new Tree(2);
		}else{
			if(totalFactor.fruitCount>=1){
				return new Tree(2);
			}else{
				return null;
			}
		}
	}
	draw(x, y){}
}
class Tree extends Thing{
	constructor(life){
		super(life);
		this.fruitReady=0;
	}
	output(adjThing){
		let factor={treeCount:1};
		if(this.fruitReady>=10 && adjThing.constructor===Thing){
			factor.fruitCount=1;
			this.fruitReady=0;
		}
		return factor;
	}
	response(totalFactor){
		const water=totalFactor.waterCount-totalFactor.factoryCount-(totalFactor.treeCount/2);
		this.life+=water;
		if(this.life>10){
			this.life=10;
			this.fruitReady++;
			if(this.fruitReady>10){
				this.fruitReady=0;
			}
		}else{
			this.fruitReady--;
			if(this.fruitReady<=0){
				this.fruitReady=0;
			}
		}
		if(this.life<=0){
			return new Thing();
		}else{
			return null;
		}
	}
	draw(x, y){
		let size=cst.CELL_SIZE/2;
		size+=(this.life/10)*size;
		ctx.drawImage(imgs.tree,
			x-size/2, y-size/2,
			size, size
		);
		if(this.fruitReady>3){
			ctx.globalAlpha=this.fruitReady/10;
			ctx.drawImage(imgs.fruit,
				x, y, size/4, size/4
			);
			ctx.globalAlpha=1;
		}
	}
}
class Water extends Thing{
	constructor(life){
		super(life);
	}
	output(){
		return {
			waterCount:1
		};
	}
	response(totalFactor){
		const water=1+((totalFactor.waterCount-totalFactor.factoryCount-(totalFactor.treeCount/2))/2);
		this.life+=water;
		if(this.life>10){
			this.life=10;
		}
		if(this.life<=0){
			return new Thing();
		}else{
			return null;
		}
	}
	draw(x, y){
		let size=cst.CELL_SIZE/2;
		size+=(this.life/10)*size;
		ctx.drawImage(imgs.water,
			x-size/2, y-size/2,
			size, size
		);
	}
}
class Factory extends Thing{
	constructor(life){
		super(life);
	}
	output(){
		return {
			factoryCount:1
		};
	}
	response(env){
		return null;
	}
	draw(x, y){
		let size=cst.CELL_SIZE/2;
		size+=(this.life/10)*size;
		ctx.drawImage(imgs.factory,
			x-size/2, y-size/2,
			size, size
		);
	}
}
class CleanFactory extends Factory{
	output(){
		return {};
	}
	draw(x, y){
		let size=cst.CELL_SIZE/2;
		size+=(this.life/10)*size;
		ctx.drawImage(imgs.cleanFactory,
			x-size/2, y-size/2,
			size, size
		);
	}
}