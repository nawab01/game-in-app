// interactionHandler.js
import { GameManager } from './gameManager.js';

export const InteractionHandler = {
    addGameItemListeners(gameItem, gameId, onDelete) {
        let startX, startY;
        const swipeThreshold = 100;
        let isScrolling = false;

        function handleStart(e) {
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            isScrolling = false;
        }

        function handleMove(e) {
            if (!startX || !startY) return;

            const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = Math.abs(startY - currentY);

            if (diffY > 10 && diffY > Math.abs(diffX)) {
                isScrolling = true;
                return;
            }

            if (!isScrolling && diffX > 0) {
                e.preventDefault();
                gameItem.style.transform = `translateX(-${Math.min(diffX, swipeThreshold)}px)`;
                gameItem.style.opacity = 1 - (diffX / swipeThreshold);
            }
        }

        function handleEnd(e) {
            if (!startX) return;

            const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (!isScrolling) {
                if (diffX > swipeThreshold) {
                    gameItem.style.transform = `translateX(-${window.innerWidth}px)`;
                    gameItem.style.opacity = '0';
                    setTimeout(() => onDelete(gameId), 300);
                } else if (diffX < 10) {
                    GameManager.loadGame(gameId);
                } else {
                    gameItem.style.transform = 'translateX(0)';
                    gameItem.style.opacity = '1';
                }
            }

            startX = null;
            startY = null;
        }

        gameItem.addEventListener('touchstart', handleStart, { passive: true });
        gameItem.addEventListener('touchmove', handleMove, { passive: false });
        gameItem.addEventListener('touchend', handleEnd);

        gameItem.addEventListener('mousedown', handleStart);
        gameItem.addEventListener('mousemove', handleMove);
        gameItem.addEventListener('mouseup', handleEnd);
        gameItem.addEventListener('mouseleave', handleEnd);
    },

    addTabWrapperListeners(tabWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;

        function handleDragStart(e) {
            isDown = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            startX -= tabWrapper.offsetLeft;
            scrollLeft = tabWrapper.scrollLeft;
        }

        function handleDragEnd() {
            isDown = false;
        }

        function handleDragMove(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.type.includes('mouse') ? e.pageX : e.touches[0].pageX) - tabWrapper.offsetLeft;
            const walk = (x - startX) * 3;
            tabWrapper.scrollLeft = scrollLeft - walk;
        }

        tabWrapper.addEventListener('mousedown', handleDragStart);
        tabWrapper.addEventListener('mouseleave', handleDragEnd);
        tabWrapper.addEventListener('mouseup', handleDragEnd);
        tabWrapper.addEventListener('mousemove', handleDragMove);

        tabWrapper.addEventListener('touchstart', handleDragStart, { passive: true });
        tabWrapper.addEventListener('touchend', handleDragEnd);
        tabWrapper.addEventListener('touchmove', handleDragMove, { passive: false });
    }
};