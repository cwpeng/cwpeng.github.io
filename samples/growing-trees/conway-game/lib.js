class Thing{
	constructor(){}
	draw(x, y){
		ctx.beginPath();
		ctx.arc(x, y, cst.CELL_SIZE/4, 0, 2*Math.PI);
		ctx.fill();
	}
}
class Cell{
	constructor(x, y){
		this.x=x;
		this.y=y;
		this.thing=null; // 定義格子上的物品
		this.env=null; // 紀錄環境資訊
	}
	feel(){
		// 收集週遭的環境資訊
		this.env={
			thingCount:0
		};
		for(let x=this.x-1;x<=this.x+1;x++){
			if(x<0 || x>cst.WIDTH-1){
				continue;
			}
			for(let y=this.y-1;y<=this.y+1;y++){
				if(y<0 || y>cst.HEIGHT-1){
					continue;
				}else if(y===this.y && x===this.x){
					continue;
				}
				if(engine.data[x][y].thing!==null){
					this.env.thingCount++;
				}
			}
		}
	}
	update(){
		// 根據週遭的環境資訊，判斷未來的變化
		const {thingCount}=this.env;
		if(this.thing===null){
			if(thingCount===3){
				this.thing=new Thing();
			}
		}else{
			if(thingCount<2){
				this.thing=null;
			}else if(thingCount>3){
				this.thing=null;
			}
		}
	}
	draw(){
		ctx.strokeRect(
			this.x*cst.CELL_SIZE+0.5, this.y*cst.CELL_SIZE+0.5,
			cst.CELL_SIZE, cst.CELL_SIZE
		);
		if(this.thing!==null){
			this.thing.draw(
				this.x*cst.CELL_SIZE+cst.CELL_SIZE/2,
				this.y*cst.CELL_SIZE+cst.CELL_SIZE/2
			);
		}
	}
}