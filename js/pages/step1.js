let currentHairStyle = '01';
let currentHairColor = 'BK';
let isBabyHairStyle = false;

function initializeStep1() {
  // 初期値の設定
  document.querySelector('input[name="faceColor"][value="01"]').checked = true;
  document.querySelector('input[name="hairStyle"][value="01"]').checked = true;
  document.querySelector('input[name="hairColor"][value="BK"]').checked = true;
  document.querySelector('input[name="motion"][value="01"]').checked = true;

  updateHairColorAvailability();
}

function updateFaceColor(number) {
  const hairStyle = document.querySelector('input[name="hairStyle"]:checked').value;
  const faceType = hairStyle === '04' ? 'noear' : '';
  ImageHandler.updateImage('face', `images/face/face_${number}${faceType}.png`);
}

function updateBabyHairStyle(style) {
  currentHairStyle = style;
  isBabyHairStyle = true;
  ImageHandler.updateImage('hair', `images/hair/hair_Baby_${style}.png`);
  updateHairColorAvailability();
  ImageHandler.updateHairBack(style, currentHairColor, true);
}

function updateHairStyle(style) {
  currentHairStyle = style;
  isBabyHairStyle = false;
  ImageHandler.updateHairStyle(style, currentHairColor, false);
  updateHairColorAvailability();
  
  // 髪型が変更されたときに顔の画像も更新
  const faceColor = document.querySelector('input[name="faceColor"]:checked').value;
  updateFaceColor(faceColor);
}

function updateHairColor(color) {
  if (!isBabyHairStyle) {
    currentHairColor = color;
    ImageHandler.updateHairStyle(currentHairStyle, color, false);
  }
}

function updateMotion(motion) {
  ImageHandler.updateImage('motion', `images/motion/motion_${motion}.png`);
}

function updateHairColorAvailability() {
  const hairColorInputs = document.querySelectorAll('input[name="hairColor"]');
  const hairColorSection = document.getElementById('hairColorSection');
  
  if (isBabyHairStyle) {
    hairColorSection.classList.add('hidden');
    hairColorInputs.forEach(input => input.disabled = true);
  } else {
    hairColorSection.classList.remove('hidden');
    hairColorInputs.forEach(input => input.disabled = false);
  }
}

// 選択内容を保存して次のページに遷移
function saveSelections() {
  const face = document.querySelector('input[name="faceColor"]:checked').value;
  const hair = document.querySelector('input[name="hairStyle"]:checked').value;
  const motion = document.querySelector('input[name="motion"]:checked').value;

  // ベビーの髪型かどうかを判断
  const hairColor = isBabyHairStyle ? '' : (document.querySelector('input[name="hairColor"]:checked')?.value || 'BK');

  // LocalStorageに保存
  localStorage.setItem('face', face);
  localStorage.setItem('hair', hair);
  localStorage.setItem('hairColor', hairColor);
  localStorage.setItem('motion', motion);
  localStorage.setItem('isBabyHairStyle', isBabyHairStyle ? 'true' : 'false'); // 文字列しか保存できないためtrue,falseを文字列で保存

  // 次のページに遷移
  window.location.href = 'pages/page2.html';
}

// ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', initializeStep1);