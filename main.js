document.addEventListener("DOMContentLoaded", function() {
    injectContent();
    renderPBackground();
    
    setTimeout(currentPageLinks, 100);
});

function renderPBackground() {
    const paragraphs = document.querySelectorAll("*:has(> img[data-background])");
    
    paragraphs.forEach(paragraph => {
        const img = paragraph.querySelector("img[data-background]");
        if (img) {
            paragraph.style.setProperty('--bg-image', `url('${img.src}')`);
        }
    });
}

function injectContent() {
    const components = [
        { selector: 'aside', file: 'aside.html' },
        { selector: 'header', file: 'header.html' },
        { selector: 'footer', file: 'footer.html' }
    ];

    // Load all components
    components.forEach(({ selector, file }) => {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Network response was not ok for ${file}`);
                return response.text();
            })
            .then(html => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = html;
                } else {
                    console.warn(`Element ${selector} not found in document`);
                }
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
            });
    });
}

window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }


function currentPageLinks() {
    const links = document.getElementsByTagName("a");
    const currentUrl = new URL(document.URL);

    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        const href = element.getAttribute("href");

        // Skip non-relevant links
        if (!href || href === "#") continue;

        // Resolve href to absolute URL
        const absoluteHref = new URL(href, document.baseURI).href;

        // Check if current URL includes the resolved href
        if (currentUrl.href === absoluteHref) {
            element.classList.add('current-link');
        }
    };
}