const colorPicker = document.getElementById("color-picker");
const discordIcon = document.getElementById("discord-icon");
const downloadBtn = document.getElementById("download-btn");

// リアルタイムで色変更
colorPicker.addEventListener("input", function (event) {
  const color = event.target.value;
  changeSVGColor(color);
});

// SVGの色を変更する関数
function changeSVGColor(color) {
  const bluePath = discordIcon.querySelectorAll("path")[0];
  bluePath.setAttribute("fill", color);
}

// ダウンロードボタンのイベント
downloadBtn.addEventListener("click", function () {
  downloadPNG();
});

// SVGをPNGとしてダウンロードする関数
function downloadPNG() {
  const svgBlob = new Blob([discordIcon.outerHTML], {
    type: "image/svg+xml",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 4096;
    canvas.height = 4096;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imgURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imgURL;
    a.download = "discord-icon.png";
    a.click();
  };

  img.src = svgUrl;
}
