class Cell{
	constructor(x, y){
		this.x=x;
		this.y=y;
	}
	feel(){
		// 收集週遭的環境資訊
		console.log(this.x, this.y, "feel");
	}
	update(){
		// 根據週遭的環境資訊，判斷未來的變化
		console.log(this.x, this.y, "update");
	}
	draw(){
		console.log(this.x, this.y, "draw");
		ctx.strokeRect(
			this.x*cst.CELL_SIZE+0.5, this.y*cst.CELL_SIZE+0.5,
			cst.CELL_SIZE, cst.CELL_SIZE
		);
	}
}