class Cell{
	constructor(x, y){
		this.x=x;
		this.y=y;
		this.thing=new Thing(); // 定義格子上的物品，預設為 Thing 物件
		this.env=null; // 紀錄環境資訊
	}
	feel(){
		// 收集週遭的環境資訊
		this.env=[{
			waterCount:0,
			factoryCount:0,
			treeCount:0,
			fruitCount:0
		}];
		const cells=[];
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
				cells.push(engine.data[x][y]);
			}
		}
		// 打亂順序後再取得環境因子：面對有些環境因子不會同時散佈到所有區塊
		shuffle(cells);
		cells.forEach((cell)=>{
			this.env.push(cell.thing.output(this.thing));
		});
	}
	update(){
		// 綜合週遭的環境因子
		let totalFactor=this.env[0];
		let factor;
		for(let i=1;i<this.env.length;i++){
			factor=this.env[i];
			for(let key in factor){
				totalFactor[key]+=factor[key];
			}
		}
		// 根據週遭的環境資訊，判斷未來的變化
		const newThing=this.thing.response(totalFactor);
		if(newThing!==null){
			this.thing=newThing;
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
class BlockCell extends Cell{
	constructor(x, y){
		super(x, y);
	}
	feel(){}
	update(){}
	draw(){
		ctx.fillRect(
			this.x*cst.CELL_SIZE+0.5, this.y*cst.CELL_SIZE+0.5,
			cst.CELL_SIZE, cst.CELL_SIZE
		);
	}
}