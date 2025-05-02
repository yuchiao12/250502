let capture; // 用於存放攝影機影像
let overlay; // 用於存放與攝影機影像相同大小的圖形

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background(101, 67, 33); // 設定畫布背景為深棕色 (RGB 值)
  
  // 初始化攝影機影像
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 初始化與攝影機影像相同大小的圖形
  overlay = createGraphics(capture.width, capture.height);
  overlay.background(255, 0, 0, 100); // 設定圖形背景為半透明紅色
}

function draw() {
  background(101, 67, 33); // 確保背景保持深棕色

  // 顯示攝影機影像
  translate(width / 2, height / 2); // 將原點移到畫布中心
  imageMode(CENTER); // 設定影像模式為中心
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, 0, capture.width, capture.height); // 將影像置中顯示

  // 顯示與攝影機影像相同大小的圖形
  push(); // 保存當前繪圖狀態
  scale(-1, 1); // 水平翻轉 overlay
  image(overlay, -capture.width / 2, -capture.height / 2, capture.width, capture.height); // 將圖形顯示在攝影機影像上方
  pop(); // 恢復繪圖狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整攝影機影像大小
  overlay = createGraphics(capture.width, capture.height); // 重新調整圖形大小
  overlay.background(255, 0, 0, 100); // 設定圖形背景為半透明紅色
}
