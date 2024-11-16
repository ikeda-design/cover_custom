class ImageHandler {
  static updateImage(id, src) {
    const img = document.getElementById(id);
    if (img) {
      img.src = src;
    } else {
      console.error(`Element with id '${id}' not found`);
    }
  }

  static updateFaceColor(number, hairStyle) {
    const faceType = hairStyle === '04' ? 'noear' : '';
    this.updateImage('face', `images/face/face_${number}${faceType}.png`);
  }

  static updateHairStyle(style, color, isBaby = false) {
    if (isBaby) {
      this.updateImage('hair', `images/hair/hair_Baby_${style}.png`);
    } else {
      this.updateImage('hair', `images/hair/hair_${style}_${color}.png`);
    }
    this.updateHairBack(style, color, isBaby);
  }

  static updateHairBack(style, color, isBaby) {
    const hairBackImg = document.getElementById('hairBack');
    if (!isBaby && (style === '04' || style === '05')) {
      hairBackImg.src = `images/hair/hair_${style}_${color}_Back.png`;
      hairBackImg.style.display = 'block';
    } else {
      hairBackImg.style.display = 'none';
    }
  }

  static updateMotion(motion) {
    this.updateImage('motion', `images/motion/motion_${motion}.png`);
  }

  static updateCoverColor(color) {
    this.updateImage('cover', `images/back/back_${color}.png`);
    return color;
  }

  static updateTitleIcon(icon) {
    this.updateImage('titleIcon', `images/title/title_${icon}.png`);
  }
}