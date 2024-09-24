// Step 1: 選択内容を保存して次のページに遷移
function saveSelections() {
    const skin = document.querySelector('input[name="skinColor"]:checked').value;
    const hair = document.querySelector('input[name="hairStyle"]:checked').value;
    const hairColor = document.querySelector('input[name="hairColor"]:checked').value;
    const expression = document.querySelector('input[name="expressionStyle"]:checked').value;
  
    // LocalStorageに保存
    localStorage.setItem('skin', skin);
    localStorage.setItem('hair', hair);
    localStorage.setItem('hairColor', hairColor);
    localStorage.setItem('expression', expression);
  
    // 次のページに遷移
    window.location.href = 'page2.html';
  }
  
  // Step 2: ページを読み込んだときに選択された画像を表示
  window.onload = function() {
    if (window.location.pathname.endsWith('page2.html')) {
      const skin = localStorage.getItem('skin');
      const hair = localStorage.getItem('hair');
      const hairColor = localStorage.getItem('hairColor');
      const expression = localStorage.getItem('expression');
  
      if (skin && hair && hairColor && expression) {
        document.getElementById('skin').src = 'images/' + skin;
        document.getElementById('hair').src = 'images/' + hair;
        document.getElementById('hairColor').src = 'images/' + hairColor;
        document.getElementById('expression').src = 'images/' + expression;
      }
    }
  };
  
  // 背景色の更新
  function updateBackgroundColor(color) {
    document.getElementById('preview').style.backgroundColor = color;
  }
  
  // アイコンの更新
  function updateImage(elementId, imageFile) {
    document.getElementById(elementId).src = 'images/' + imageFile;
  }
  
  // 前のページに戻る
  function goBack() {
    window.history.back();
  }
  