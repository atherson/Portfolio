   // Create stars
   function createStars() {
    const container = document.body;
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        star.style.animation = `twinkle ${duration}s infinite`;
        
        container.appendChild(star);
    }
}

// Parallax effect
function handleParallax(e) {
    const mars = document.getElementById('mars');
    const moon = document.getElementById('moon');
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mouseX - centerX) * 0.01;
    const deltaY = (mouseY - centerY) * 0.01;
    
    mars.style.transform = `translate(${deltaX * 2}px, ${deltaY * 2}px)`;
    moon.style.transform = `translate(${deltaX * 1.5}px, ${deltaY * 1.5}px)`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    document.addEventListener('mousemove', handleParallax);
});