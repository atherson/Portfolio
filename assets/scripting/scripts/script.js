    // Create stars
    function createStars() {
        const scene = document.querySelector('.scene');
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'stars';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 70}%`;  // Only in top 70% of screen
          star.style.animationDelay = `${Math.random() * 1}s`;
          scene.appendChild(star);
        }
      }
  
      // Create clouds
      function createClouds() {
        const scene = document.querySelector('.scene');
        for (let i = 0; i < 5; i++) {
          const cloud = document.createElement('div');
          cloud.className = 'clouds';
          cloud.style.top = `${20 + Math.random() * 20}%`;
          cloud.style.opacity = `${0.1 + Math.random() * 0.2}`;
          cloud.style.animationDuration = `${15 + Math.random() * 10}s`;
          scene.appendChild(cloud);
        }
      }
  
      // Create smoke particles
      function createSmoke() {
        const scene = document.querySelector('.scene');
        for (let i = 0; i < 10; i++) {
          const smoke = document.createElement('div');
          smoke.className = 'smoke';
          scene.appendChild(smoke);
          
          setTimeout(() => {
            smoke.style.opacity = '0.7';
            smoke.style.transform = `translateX(-50%) scale(${2 + Math.random() * 3})`;
            smoke.style.transition = 'all 2s ease-out';
            
            setTimeout(() => {
              smoke.remove();
            }, 2000);
          }, i * 200);
        }
      }
  
      // Launch sequence
      function launchRocket() {
        const rocket = document.querySelector('.rocket');
        const infoOverlay = document.querySelector('.info-overlay');
        
        // Create initial smoke effect
        createSmoke();
        
        // Start launch sequence
        setTimeout(() => {
          rocket.style.transform = 'translateX(-50%) translateY(-1000px)';
          rocket.style.transition = 'all 3s cubic-bezier(0.4, 0, 0.2, 1)';
          
          // Show info overlay after rocket leaves
          setTimeout(() => {
            infoOverlay.style.opacity = '1';
          }, 2000);
        }, 1000);
      }
  
      // Initialize
      createStars();
      createClouds();
  
      // Start launch after a short delay
      setTimeout(launchRocket, 1000);