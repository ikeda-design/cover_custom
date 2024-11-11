// Step 1: 顔のカスタマイズ
function updateFaceColor(number) {
  const hairStyle = document.querySelector('input[name="hairStyle"]:checked').value;
  const faceType = hairStyle === '04' ? 'noear' : '';
  updateImage('face', `images/face/face_${number}${faceType}.png`);
}

let currentHairStyle = '01';
let currentHairColor = 'BK';
let isBabyHairStyle = false;

function updateBabyHairStyle(style) {
  currentHairStyle = style;
  isBabyHairStyle = true;
  updateImage('hair', `images/hair/hair_Baby_${style}.png`);
  updateHairColorAvailability();
  updateHairBack(style, currentHairColor);
}

function updateHairStyle(style) {
  currentHairStyle = style;
  isBabyHairStyle = false;
  currentHairColor = currentHairColor;
  updateImage('hair', `images/hair/hair_${style}_${currentHairColor}.png`);
  updateHairColorAvailability();
  updateHairBack(style, currentHairColor);
  
  // 髪型が変更されたときに顔の画像も更新
  const faceColor = document.querySelector('input[name="faceColor"]:checked').value;
  updateFaceColor(faceColor);
}

function updateHairColor(color) {
  if (!isBabyHairStyle) {
    currentHairColor = color;
    updateImage('hair', `images/hair/hair_${currentHairStyle}_${color}.png`);
    updateHairBack(currentHairStyle, color);
  }
}

function updateHairBack(style, color) {
  const hairBackImg = document.getElementById('hairBack');
  if (!isBabyHairStyle && (style === '04' || style === '05')) {
    hairBackImg.src = `images/hair/hair_${style}_${color}_Back.png`;
    hairBackImg.style.display = 'block';
  } else {
    hairBackImg.style.display = 'none';
  }
}

function updateHairColorAvailability() {
  const hairColorSection = document.getElementById('hairColorSection');
  
  if (isBabyHairStyle) {
    hairColorSection.classList.add('hidden');
    // currentHairColor = '';
  } else {
    hairColorSection.classList.remove('hidden');
  }
}

// ページ読み込み時に初期状態を設定
window.addEventListener('DOMContentLoaded', () => {
  updateHairColorAvailability();
});

function updateMotion(motion) {
  updateImage('motion', `images/motion/motion_${motion}.png`);
}

function updateCoverColor(color) {
  updateImage('cover', `images/back/back_${color}.png`);
  currentColor = color;
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
      const isBabyHairStyle = localStorage.getItem('isBabyHairStyle') === 'true';
  
      console.log(`取得した値: face=${face}, hair=${hair}, hairColor=${hairColor}, motion=${motion}, isBabyHairStyle=${isBabyHairStyle}`);
  
      if (face && hair && motion) {
        console.log('すべての値が存在します。画像を更新します。');
        const faceType = hair === '04' ? 'noear' : '';
        document.getElementById('face').src = `images/face/face_${face}${faceType}.png`;
        
        // ベビーの髪型かどうかを判断
        if (isBabyHairStyle) {
          updateImage('hair', `images/hair/hair_Baby_${hair}.png`);
          document.getElementById('hairBack').style.display = 'none';
        } else {
          updateHairBack(hair, hairColor || 'BK');
          updateImage('hair', `images/hair/hair_${hair}_${hairColor || 'BK'}.png`);
        }
        
        updateImage('motion', `images/motion/motion_${motion}.png`);
        console.log('画像の更新が完了しました');
      } else {
        console.log('一部の値が欠けています。画像の更新をスキップします。');
      }
    } else {
      console.log('page2.html以外のページが読み込まれました');
    }
  };

  function updateNamePreview() {
    const kanjiName = document.getElementById('kanjiName').value;
    const hiraganaName = document.getElementById('hiraganaName').value;
    const romajiName = document.getElementById('romajiName').value;
    
    document.getElementById('kanjiNameDisplay').textContent = kanjiName;
    document.getElementById('hiraganaNameDisplay').textContent = hiraganaName;
    document.getElementById('romajiNameDisplay').textContent = romajiName;
  }
  
  // 前のページに戻る
  function goBack() {
    window.history.back();
  }
  

  // 追加するJavaScriptの変更部分
  let isFront = true; // 表示状態を管理
  let currentColor = 'BL'; // 初期色を設定（例: 'BL'）

  document.getElementById('togglePreview').addEventListener('click', function() {
    const frontPreview = document.querySelector('.step1 .preview');
    const backPreview = document.querySelector('.step2 .preview');
  
    // 裏の画像を色に応じて指定
    const backImageMap = {
      'BL': 'images/back/back_BL_name.png',
      'BR': 'images/back/back_BR_name.png',
      'PI': 'images/back/back_PI_name.png',
      'PU': 'images/back/back_PU_name.png'
    };
  
    // 裏の画像を設定
    backPreview.style.backgroundImage = `url(${backImageMap[currentColor]})`;
    console.log(`裏の画像を設定しました: ${backImageMap[currentColor]}`);
  
    if (isFront) {
      updateImage('coverBack', backImageMap[currentColor]);
      coverBack.style.display = 'block'; // 裏を表示
      romajiNameDisplay.style.display = 'block';

      console.log('表を非表示にし、裏を表示しました。');
    } else {
      coverBack.style.display = 'none'; // 裏を非表示
      romajiNameDisplay.style.display = 'none';
      console.log('裏を非表示にし、表を表示しました。');
    }
    
    isFront = !isFront; // 状態を切り替え
    console.log(`表示状態が切り替わりました: ${isFront ? '表' : '裏'}`);
  });
  