export function createImageFlipAnimation(image1Url, image2Url, containerId, flipDuration = 1000) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
  
    container.style.perspective = '1000px';
    container.innerHTML = `
      <div class="flipper" style="
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform ${flipDuration / 1000}s;
        transform-style: preserve-3d;
      ">
        <img src="${image1Url}" alt="Image 1" class="front" style="
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        ">
        <img src="${image2Url}" alt="Image 2" class="back" style="
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform: rotateY(180deg);
        ">
      </div>
    `;
  
    const flipper = container.querySelector('.flipper');
    let isFlipped = false;
  
    function flip() {
      isFlipped = !isFlipped;
      flipper.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
  
    // Start the animation
    setInterval(flip, flipDuration);
  }