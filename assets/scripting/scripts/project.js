function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.bottom = '0px'; // Start from the bottom
    const size = 5 + Math.random() * 15;
    bubble.style.width = bubble.style.height = size + 'px';
    bubble.style.animation = `bubble-rise ${3 + Math.random() * 4}s linear infinite`;
    document.querySelector('.container').appendChild(bubble);
    
    bubble.addEventListener('animationend', () => bubble.remove());
}