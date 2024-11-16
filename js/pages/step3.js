function initializeStep3() {
  const selections = StorageManager.getAllSelections();
  loadPreview(selections);
  updateSelectionTexts(selections);
}

function loadPreview(selections) {
  const {
    face, hair, hairColor, motion, isBabyHairStyle,
    coverColor, titleIcon, kanjiName, hiraganaName, romajiName
  } = selections;

  // キャラクター画像の更新
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

  // 表紙の更新
  ImageHandler.updateImage('cover', `../images/back/back_${coverColor}.png`);
  ImageHandler.updateImage('coverBack', `../images/back/back_${coverColor}_name.png`);
  ImageHandler.updateImage('titleIcon', `../images/title/title_${titleIcon}.png`);

  // 名前の更新
  updateNameDisplay(kanjiName, hiraganaName, romajiName);
}

function updateNameDisplay(kanjiName, hiraganaName, romajiName) {
  document.getElementById('kanjiNameDisplay').textContent = kanjiName;
  document.getElementById('hiraganaNameDisplay').textContent = hiraganaName;
  document.getElementById('romajiNameDisplay').textContent = romajiName;
}

function updateSelectionTexts(selections) {
  // 選択内容のテキスト表示を更新
  const selectionTexts = {
    faceColorText: getFaceColorText(selections.face),
    hairStyleText: getHairStyleText(selections.hair, selections.isBabyHairStyle),
    hairColorText: getHairColorText(selections.hairColor, selections.isBabyHairStyle),
    motionText: getMotionText(selections.motion),
    coverColor: getCoverColorText(selections.coverColor),
    titleIconText: getTitleIconText(selections.titleIcon),
    kanjiName: selections.kanjiName || '未入力',
    hiraganaName: selections.hiraganaName || '未入力',
    romajiName: selections.romajiName || '未入力'
  };

  // 各要素のテキストを更新
  Object.entries(selectionTexts).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });
}

// 選択内容のテキスト変換関数
function getFaceColorText(face) {
  const faceColors = {
    '01': '明るい肌',
    '02': '普通の肌',
    '03': '健康的な肌'
  };
  return faceColors[face] || '未選択';
}

function getHairStyleText(hair, isBaby) {
  if (isBaby) {
    return `ベビー髪型${hair}`;
  }
  const hairStyles = {
    '01': 'ショート',
    '02': 'ボブ',
    '03': 'ロング',
    '04': 'ツインテール',
    '05': 'ポニーテール'
  };
  return hairStyles[hair] || '未選択';
}

function getHairColorText(color, isBaby) {
  if (isBaby) return 'なし';
  const hairColors = {
    'BK': '黒',
    'BR': '茶',
    'BL': '青',
    'PI': 'ピンク'
  };
  return hairColors[color] || '未選択';
}

function getMotionText(motion) {
  const motions = {
    '01': 'スマイル',
    '02': 'ウインク',
    '03': 'にこにこ'
  };
  return motions[motion] || '未選択';
}

function getCoverColorText(color) {
  const coverColors = {
    'BL': 'ブルー',
    'BR': 'チャコール',
    'PI': 'ピンク',
    'PU': 'パープル'
  };
  return coverColors[color] || '未選択';
}

function getTitleIconText(icon) {
  const titleIcons = {
    'kuma': 'くま',
    'usagi': 'うさぎ',
    'non': 'なし'
  };
  return titleIcons[icon] || '未選択';
}

function goBack() {
  window.history.back();
}

// ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', initializeStep3);