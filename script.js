document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    const totalPages = pages.length;
    let isAnimating = false;

    // Touch handling variables
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize z-indexes
    pages.forEach((page, index) => {
        page.style.zIndex = totalPages - index;
    });

    function nextPage() {
        if (currentPage >= totalPages - 1 || isAnimating) return;

        isAnimating = true;
        const currentEl = pages[currentPage];

        // Add flipped class to trigger CSS transition
        currentEl.classList.add('flipped');

        // Wait for animation to finish before updating state fully logic-wise if needed
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Matches CSS transition time

        currentPage++;
    }

    function prevPage() {
        if (currentPage <= 0 || isAnimating) return;

        isAnimating = true;
        currentPage--;
        const previousEl = pages[currentPage];

        // Remove flipped class to trigger reverse CSS transition
        previousEl.classList.remove('flipped');

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    // Touch Event Listeners
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Mouse Event Listeners for testing on desktop
    document.addEventListener('mousedown', (e) => {
        touchStartX = e.screenX;
    });

    document.addEventListener('mouseup', (e) => {
        touchEndX = e.screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe Left -> Next Page
            nextPage();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe Right -> Previous Page
            prevPage();
        }
    }

    // Allow clicking on the page to turn it as well (only forward for simplicity on click)
    // Left side click for back could be added, but swipe is the requested feature.
    pages.forEach(page => {
        page.addEventListener('click', (e) => {
            // Optional: Detect click side. For now, click behaves as "Next"
            // unless we want to split the screen. 
            // Let's keep click = next for simple "reading" flow, and swipe for back.
            if (!page.classList.contains('flipped')) {
                nextPage();
            }
        });
    });
});
