// Step 1: 顔のカスタマイズ
function updateFaceColor(number) {
  updateImage('face', `images/face/face_${number}.png`);
}

let currentHairStyle = '01';
let currentHairColor = 'BK';

function updateHairStyle(style) {
  currentHairStyle = style;
  updateImage('hair', `images/hair/hair_${style}_${currentHairColor}.png`);
}

function updateHairColor(color) {
  currentHairColor = color;
  updateImage('hair', `images/hair/hair_${currentHairStyle}_${color}.png`);
}

function updateMotion(motion) {
  updateImage('motion', `images/motion/motion_${motion}.png`);
}

function updateCoverColor(color) {
  updateImage('cover', `images/back/back_${color}.png`);
}

function updateTitleIcon(icon) {
  updateImage('titleIcon', `images/title/title_${icon}.png`);
}

function updateImage(id, src) {
  const img = document.getElementById(id);
  if (img) {
    img.src = src;
  } else {
    console.error(`Element with id '${id}' not found`);
  }
}

// 選択内容を保存して次のページに遷移
function saveSelections() {
    const face = document.querySelector('input[name="faceColor"]:checked').value;
    const hair = document.querySelector('input[name="hairStyle"]:checked').value;
    const hairColor = document.querySelector('input[name="hairColor"]:checked').value;
    const motion = document.querySelector('input[name="motion"]:checked').value;
  
    // LocalStorageに保存
    localStorage.setItem('face', face);
    localStorage.setItem('hair', hair);
    localStorage.setItem('hairColor', hairColor);
    localStorage.setItem('motion', motion);
  
    // 次のページに遷移
    window.location.href = 'page2.html';
  }
  
  // Step 2: ページを読み込んだときに選択された画像を表示
  window.onload = function() {
    console.log('ページが読み込まれました');
    if (window.location.pathname.endsWith('page2.html')) {
      console.log('page2.htmlが読み込まれました');
      const face = localStorage.getItem('face');
      const hair = localStorage.getItem('hair');
      const hairColor = localStorage.getItem('hairColor');
      const motion = localStorage.getItem('motion');
  
      console.log(`取得した値: face=${face}, hair=${hair}, hairColor=${hairColor}, motion=${motion}`);
  
      if (face && hair && hairColor && motion) {
        console.log('すべての値が存在します。画像を更新します。');
        document.getElementById('face').src = `images/face/face_${face}.png`;
        document.getElementById('hair').src = `images/hair/hair_${hair}_${hairColor}.png`;
        document.getElementById('motion').src = `images/motion/motion_${motion}.png`;
        console.log('画像の更新が完了しました');
      } else {
        console.log('一部の値が欠けています。画像の更新をスキップします。');
      }
    } else {
      console.log('page2.html以外のページが読み込まれました');
    }
  };
  
  // 前のページに戻る
  function goBack() {
    window.history.back();
  }
  