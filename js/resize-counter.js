// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("counter").style.fontSize = "3vw";
  } else {
    document.getElementById("counter").style.fontSize = "5vw";
  }
}