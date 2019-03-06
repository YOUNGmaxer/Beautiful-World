class RoundItem {
  // 初始化圆点自身的属性
  constructor(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 1 + 0.1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = `rgba(255, 255, 255, ${alpha})`;
  }

  // 根据圆点属性在画布上进行绘画
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
}

export default RoundItem;
