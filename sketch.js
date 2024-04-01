let input;
let movingTexts = [];

function setup() {
  createCanvas(1642, 818);
  
  // 创建输入框
  input = createInput();
  input.position(20, 20);
  
  // 监听输入框事件
  input.changed(addMovingText);
}

function draw() {
  background(220);
  
  // 更新并显示移动的文字
  for (let i = 0; i < movingTexts.length; i++) {
    movingTexts[i].update();
    movingTexts[i].display();
  }
}

function addMovingText() {
  let textContent = input.value();
  let movingText = new MovingText(random(width), random(height), textContent);
  movingTexts.push(movingText);
  input.value('');
}

class MovingText {
  constructor(x, y, textContent) {
    this.x = x;
    this.y = y;
    this.textContent = textContent;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }
  
  update() {
    // 移动文字位置
    this.x += this.speedX;
    this.y += this.speedY;
    
    // 碰到边界时反弹
    if (this.x <= 0 || this.x >= width) {
      this.speedX *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.speedY *= -1;
    }
  }
  
  display() {
    textSize(20);
    fill(0);
    text(this.textContent, this.x, this.y);
  }
}
let blurAmount = 0;

function setup() {
  createCanvas(400, 400);
  
  // 创建上传按钮
  uploadButton = createFileInput(handleFile);
  uploadButton.position(20, 20);
}

function draw() {
  background(255);
  
  // 显示上传的图片并逐渐模糊
  if (img) {
    image(img, 0, 0, width, height);
    filter(BLUR, blurAmount);
    blurAmount += 0.5;
  }
}

function handleFile(file) {
  // 检查上传的文件是否为图片
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
    blurAmount = 0; // 重置模糊效果
  } else {
    alert('Please upload an image file.');
  }
}