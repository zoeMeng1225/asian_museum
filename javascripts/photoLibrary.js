const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* 遍历图片并添加至缩略图区 */

for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "images/pic" + [i] + ".png");
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", changeImgs);

  function changeImgs() {
    displayedImage.setAttribute("src", "images/pic" + [i] + ".png");
  }
}

btn.onclick = function() {
  if (btn.textContent == "Turn Dark")
  {
    btn.textContent = "Turn light";
    overlay.style.backgroundColor = "rgba(8,6,6,0.6)";

  }else if(btn.textContent == "Turn light")
  {
    btn.textContent = "Turn Dark";
    overlay.style.backgroundColor = "rgba(255,255,255,0)";

  }}