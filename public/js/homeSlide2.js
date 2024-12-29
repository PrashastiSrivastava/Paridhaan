 // JavaScript for continuous, seamless scrolling
 const slider = document.getElementById('slider');
 const slide = slider.children[0];

 // Clone the slide to create a seamless loop effect
 const clone = slide.cloneNode(true);
 slider.appendChild(clone);

 let scrollAmount = 0; // Initial scroll position
 const speed = 1; // Pixels per frame

 function seamlessScroll() {
     scrollAmount += speed; // Move the image to the right

     // Reset scroll position when the first slide is fully out of view
     if (scrollAmount >= 0) {
         scrollAmount = -slide.offsetWidth; // Reset to start off-screen on the left
     }

     slider.style.transform = `translateX(${scrollAmount}px)`;
     requestAnimationFrame(seamlessScroll); // Call this function continuously
 }

 // Start the scroll animation
 seamlessScroll();