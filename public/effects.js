function scrollStep() {

  if (window.pageYOffset === 0) {
      clearInterval(intervalId);
  }
  window.scroll(0, window.pageYOffset - 50);
}

function scrollToTop() {
  
  intervalId = setInterval(scrollStep, 16.66);
}

document.querySelector("#toTop").addEventListener("click", scrollToTop);
