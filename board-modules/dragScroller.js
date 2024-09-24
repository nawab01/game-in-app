// dragScroller.js
export const DragScroller = {
    init(element) {
        let isDown = false;
        let startX;
        let scrollLeft;

        const handleDragStart = (e) => {
            isDown = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            startX -= element.offsetLeft;
            scrollLeft = element.scrollLeft;
            element.style.cursor = 'grabbing';
        };

        const handleDragEnd = () => {
            isDown = false;
            element.style.cursor = 'grab';
        };

        const handleDragMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.type.includes('mouse') ? e.pageX : e.touches[0].pageX) - element.offsetLeft;
            const walk = (x - startX) * 2;
            element.scrollLeft = scrollLeft - walk;
        };

        element.addEventListener('mousedown', handleDragStart);
        element.addEventListener('mouseleave', handleDragEnd);
        element.addEventListener('mouseup', handleDragEnd);
        element.addEventListener('mousemove', handleDragMove);

        element.addEventListener('touchstart', handleDragStart, { passive: true });
        element.addEventListener('touchend', handleDragEnd);
        element.addEventListener('touchmove', handleDragMove, { passive: false });

        // Set initial cursor style
        element.style.cursor = 'grab';
    }
};