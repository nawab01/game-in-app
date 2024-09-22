export class CategoryManager {
    constructor(domElements, uiManager) {
        this.dom = domElements;
        this.uiManager = uiManager;
    }

    init() {
        this.populateCategoryList();
    }

    populateCategoryList() {
        const categories = JSON.parse(localStorage.getItem('categories')) || ['All', 'FIFA', 'Cards', 'Chess', 'Board Games', '1 v 1\'s', 'Charades', 'Team vs Team'];
        this.dom.categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            li.addEventListener('click', () => {
                this.dom.categoryInput.value = category;
                this.toggleCategoryDropdown();
            });
            this.dom.categoryList.appendChild(li);
        });
    }

    toggleCategoryDropdown() {
        this.dom.categoryList.classList.toggle('show');
    }

    addNewCategory() {
        const newCategory = prompt("Enter a new category:");
        if (newCategory && newCategory.trim()) {
            let categories = JSON.parse(localStorage.getItem('categories')) || ['All', 'FIFA', 'Cards', 'Chess', 'Board Games', '1 v 1\'s', 'Charades', 'Team vs Team'];
            if (!categories.includes(newCategory)) {
                categories.push(newCategory);
                localStorage.setItem('categories', JSON.stringify(categories));
                this.populateCategoryList();
                this.dom.categoryInput.value = newCategory;
                alert('New category added successfully!');
            } else {
                alert('This category already exists!');
            }
        }
    }
}