const slider = document.getElementById("slider2");

// Listen for the animation to finish
slider.addEventListener("animationiteration", () => {
    // Reset to the initial position instantly after each iteration
    slider.style.animation = "none"; // Stop the animation briefly
    void slider.offsetWidth;         // Trigger a reflow to reset
    slider.style.animation = "";      // Restart the animation
});
