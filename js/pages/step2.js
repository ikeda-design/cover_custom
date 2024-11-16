let isFront = true;
let currentColor = 'BL';

function initializeStep2() {
  // Step1からの選択内容を読み込んで表示
  const selections = StorageManager.getAllSelections();
  loadCharacterPreview(selections);
  
  // イベントリスナーの設定
  setupEventListeners();
  
  // 初期表示の設定
  document.querySelector('input[name="coverColor"][value="BL"]').checked = true;
  document.querySelector('input[name="titleIcon"][value="kuma"]').checked = true;
}

function loadCharacterPreview(selections) {
  const { face, hair, hairColor, motion, isBabyHairStyle } = selections;
  
  if (face && hair && motion) {
    const faceType = hair === '04' ? 'noear' : '';
    ImageHandler.updateImage('face', `../images/face/face_${face}${faceType}.png`);
    
    if (isBabyHairStyle) {
      ImageHandler.updateImage('hair', `../images/hair/hair_Baby_${hair}.png`);
      document.getElementById('hairBack').style.display = 'none';
    } else {
      ImageHandler.updateHairStyle(hair, hairColor || 'BK', false);
    }
    
    ImageHandler.updateImage('motion', `../images/motion/motion_${motion}.png`);
  }
}

function setupEventListeners() {
  document.getElementById('togglePreview').addEventListener('click', togglePreview);
  
  ['kanjiName', 'hiraganaName', 'romajiName'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateNamePreview);
  });
}

function togglePreview() {
  const coverBack = document.getElementById('coverBack');
  const romajiNameDisplay = document.getElementById('romajiNameDisplay');
  
  if (isFront) {
    ImageHandler.updateImage('coverBack', `../images/back/back_${currentColor}_name.png`);
    coverBack.style.display = 'block';
    romajiNameDisplay.style.display = 'block';
  } else {
    coverBack.style.display = 'none';
    romajiNameDisplay.style.display = 'none';
  }
  
  isFront = !isFront;
}

function updateCoverColor(color) {
  currentColor = color;
  ImageHandler.updateImage('cover', `../images/back/back_${color}.png`);
  if (!isFront) {
    ImageHandler.updateImage('coverBack', `../images/back/back_${color}_name.png`);
  }
}

function updateTitleIcon(icon) {
  ImageHandler.updateImage('titleIcon', `../images/title/title_${icon}.png`);
}

function updateNamePreview() {
  const kanjiName = document.getElementById('kanjiName').value;
  const hiraganaName = document.getElementById('hiraganaName').value;
  const romajiName = document.getElementById('romajiName').value;
  
  document.getElementById('kanjiNameDisplay').textContent = kanjiName;
  document.getElementById('hiraganaNameDisplay').textContent = hiraganaName;
  document.getElementById('romajiNameDisplay').textContent = romajiName;
}

function saveSelectionsAndNavigate() {
  const selections = {
    kanjiName: document.getElementById('kanjiName').value,
    hiraganaName: document.getElementById('hiraganaName').value,
    romajiName: document.getElementById('romajiName').value,
    coverColor: currentColor,
    titleIcon: document.querySelector('input[name="titleIcon"]:checked').value
  };
  
  StorageManager.saveStep2Selections(selections);
  window.location.href = 'page3.html';
}

// ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', initializeStep2);