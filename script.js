document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.img-link');
    const targetImage = document.getElementById('myImage');
  
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Still prevent default navigation
        
        // Get image path from href attribute
        const newSrc = link.getAttribute('href');
        targetImage.src = newSrc;
      });
    });
  });