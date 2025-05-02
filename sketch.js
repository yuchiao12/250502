let capture; // 用於存放攝影機影像
let overlayGraphics; // 用於存放與攝影機影像相同大小的圖形

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background(139, 69, 19); // 設定畫布背景為棕色 (RGB 值)
  
  // 初始化攝影機影像
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與攝影機影像相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 繪製 overlayGraphics 的內容
}

function draw() {
  background(139, 69, 19); // 確保背景保持棕色

  // 顯示攝影機影像
  translate(width / 2, height / 2); // 將原點移到畫布中心
  scale(-1, 1); // 水平翻轉影像，讓影像看起來像鏡子
  image(capture, -capture.width / 2, -capture.height / 2); // 將影像置中顯示

  // 顯示 overlayGraphics 在視訊畫面上方
  image(overlayGraphics, -capture.width / 2, -capture.height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整攝影機影像大小

  // 重新建立與攝影機影像相同大小的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 重新繪製 overlayGraphics 的內容
}

function drawOverlayGraphics() {
  overlayGraphics.clear(); // 清除先前的內容
  overlayGraphics.background(0); // 設定背景為黑色

  // 每隔 20 單位繪製圓
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從攝影機影像中取樣對應位置的顏色
      let col = capture.get(x, y);
      overlayGraphics.fill(col); // 設定圓的顏色為取樣的顏色
      overlayGraphics.noStroke(); // 移除圓的邊框
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製寬高為 15 的圓，置於單位格的中心
    }
  }
}
