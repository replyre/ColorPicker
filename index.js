const pickBtn = document.getElementById("pick-btn");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const result = document.getElementById("result");
const pickedColor = document.getElementById("picked-color");

const initEyeDropper = () => {
  if ("EyeDropper" in window) {
    pickBtn.classList.remove("hide");
    const eyeDropper = new window.EyeDropper();
    pickBtn.addEventListener("click", async () => {
      try {
        const colorValue = await eyeDropper.open();
        const hexValue = colorValue.sRGBHex.toLowerCase();
        const rgbValue = hexToRgb(hexValue);
        result.style.display = "grid";
        hexInput.value = hexValue;
        rgbInput.value = rgbValue;
        pickedColor.style.backgroundColor = hexValue;
      } catch {
        swal("Oops!", "EyeDropper is not supported!", "warning");
      }
    });
  } else {
    console.log("hello");
    swal("Oops!", "EyeDropper is not supported!", "warning");
  }
};

fileInput.addEventListener("change", () => {
  console.log(fileInput);
  result.style.display = "none";
  const reader = new FileReader();
  reader.onload = () => {
    image.setAttribute("src", reader.result);
  };
  reader.readAsDataURL(fileInput.files[0]);
});

const copyToClickboard = (textId) => {
  const txtElement = document.getElementById(textId);
  txtElement.select();
  document.execCommand("copy");
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r},${g},${b})`;
};

window.onload = initEyeDropper;
