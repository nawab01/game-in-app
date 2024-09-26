// category.js
import { domElements } from './domElements.js';
import { storage } from './storage.js';

export const category = {
    populate() {
        const categories = storage.loadCategories();
        domElements.categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            li.addEventListener('click', () => {
                domElements.categoryInput.value = category;
                this.toggleDropdown();
            });
            domElements.categoryList.appendChild(li);
        });
    },
    toggleDropdown() {
        domElements.categoryList.classList.toggle('show');
    },
    add() {
        const newCategory = prompt("Enter a new category:");
        if (newCategory && newCategory.trim()) {
            let categories = storage.loadCategories();
            if (!categories.includes(newCategory)) {
                categories.push(newCategory);
                storage.saveCategories(categories);
                this.populate();
                domElements.categoryInput.value = newCategory;
                alert('New category added successfully!');
            } else {
                alert('This category already exists!');
            }
        }
    }
};