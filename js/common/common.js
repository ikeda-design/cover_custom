function updateImage(id, src) {
    const img = document.getElementById(id);
    if (img) {
      img.src = src;
    } else {
      console.error(`Element with id '${id}' not found`);
    }
  }
  
  function goBack() {
    window.history.back();
  }