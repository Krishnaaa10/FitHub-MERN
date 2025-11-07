// Scroll performance optimizer for 60-120 FPS
let isScrolling = false;
let scrollTimeout = null;

// Optimize scroll performance
export const optimizeScroll = () => {
  // Add scrolling class to body during scroll
  const handleScroll = () => {
    if (!isScrolling) {
      document.body.classList.add('scrolling');
      isScrolling = true;
    }

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Remove scrolling class after scroll ends
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('scrolling');
      isScrolling = false;
    }, 150);
  };

  // Use passive event listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Optimize touch scrolling on mobile
  let touchStartY = 0;
  let touchEndY = 0;
  
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e) => {
    touchEndY = e.touches[0].clientY;
    // Prevent default only if scrolling up at top or down at bottom
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if ((scrollTop === 0 && touchEndY > touchStartY) || 
        (scrollTop + clientHeight >= scrollHeight && touchEndY < touchStartY)) {
      // Allow native bounce
      return;
    }
  };
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
};

// Optimize animations during scroll
export const optimizeAnimations = () => {
  // Use Intersection Observer for better performance
  const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Only animate when in view
        entry.target.style.willChange = 'transform, opacity';
      } else {
        entry.target.classList.remove('in-view');
        // Remove will-change when not in view
        entry.target.style.willChange = 'auto';
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('[class*="animate"], [class*="fade"], [class*="slide"]');
  animatedElements.forEach(el => observer.observe(el));
};

// Initialize on load
export const initScrollOptimizer = () => {
  if (typeof window !== 'undefined') {
    optimizeScroll();
    optimizeAnimations();
    
    // Request animation frame for smooth scrolling
    let lastScrollTop = 0;
    let ticking = false;
    
    const updateScroll = () => {
      // Your scroll-based updates here
      ticking = false;
    };
    
    const onScroll = () => {
      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }
};

