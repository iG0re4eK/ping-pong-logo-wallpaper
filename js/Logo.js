export class Logo {
  constructor(
    x,
    y,
    width,
    height,
    minX,
    minY,
    maxX,
    maxY,
    color,
    speed,
    context,
    imageSrc,
    scale,
  ) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.width = width * this.scale;
    this.height = height * this.scale;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.color = color;
    this.speed = speed;
    this.context = context;

    this.speedX = this.speed * this.randomDirection();
    this.speedY = this.speed * this.randomDirection();

    this.image = new Image();
    this.image.src = imageSrc;
    this.imageLoaded = false;

    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  randomDirection() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  draw() {
    if (this.imageLoaded) {
      this.context.save();

      this.context.drawImage(
        this.image,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height,
      );

      this.context.globalCompositeOperation = "source-atop";

      this.context.fillStyle = this.color;
      this.context.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height,
      );

      this.context.restore();
    } else {
      this.context.fillStyle = "#ccc";
      this.context.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height,
      );
    }
  }

  move(deltaTIme) {
    if (deltaTIme === 0 || !deltaTIme) return;

    const normalizedDelta = deltaTIme / 1000;

    this.x += this.speedX * normalizedDelta;
    this.y += this.speedY * normalizedDelta;

    console.log(this.speedX, this.speedY, normalizedDelta);

    if (this.x + this.width / 2 >= this.maxX) {
      this.x = this.maxX - this.width / 2;
      this.speedX = -this.speedX;
    } else if (this.x - this.width / 2 <= this.minX) {
      this.x = this.minX + this.width / 2;
      this.speedX = -this.speedX;
    }

    if (this.y + this.height / 2 >= this.maxY) {
      this.y = this.maxY - this.height / 2;
      this.speedY = -this.speedY;
    } else if (this.y - this.height / 2 <= this.minY) {
      this.y = this.minY + this.height / 2;
      this.speedY = -this.speedY;
    }
  }
}
