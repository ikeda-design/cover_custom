class StorageManager {
  static saveStep1Selections(selections) {
    console.log('Saving Step 1 selections:', selections);
    const {face, hair, hairColor, motion, isBabyHairStyle} = selections;
    
    try {
      localStorage.setItem('face', face);
      localStorage.setItem('hair', hair);
      localStorage.setItem('hairColor', hairColor);
      localStorage.setItem('motion', motion);
      localStorage.setItem('isBabyHairStyle', isBabyHairStyle ? 'true' : 'false');
      console.log('Step 1 selections saved successfully');
    } catch (error) {
      console.error('Error saving Step 1 selections:', error);
    }
  }

  static saveStep2Selections(selections) {
    const {kanjiName, hiraganaName, romajiName, coverColor, titleIcon} = selections;
    localStorage.setItem('kanjiName', kanjiName);
    localStorage.setItem('hiraganaName', hiraganaName);
    localStorage.setItem('romajiName', romajiName);
    localStorage.setItem('coverColor', coverColor);
    localStorage.setItem('titleIcon', titleIcon);
  }

  static getAllSelections() {
    return {
      face: localStorage.getItem('face'),
      hair: localStorage.getItem('hair'),
      hairColor: localStorage.getItem('hairColor'),
      motion: localStorage.getItem('motion'),
      isBabyHairStyle: localStorage.getItem('isBabyHairStyle') === 'true',
      kanjiName: localStorage.getItem('kanjiName'),
      hiraganaName: localStorage.getItem('hiraganaName'),
      romajiName: localStorage.getItem('romajiName'),
      coverColor: localStorage.getItem('coverColor'),
      titleIcon: localStorage.getItem('titleIcon')
    };
  }
}

// グローバルスコープで利用可能にする
window.StorageManager = StorageManager;