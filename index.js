
let cart = [];
let total = 0;

//Load Categories
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategory(data.categories))
        .catch((err) => console.error("Category Load Error:", err));
};

//Display Categories
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

// "All Trees" Button
    const allBtn = document.createElement('button');
    allBtn.className = "category-btn active-btn w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 transition-all mb-2 border border-transparent";
    allBtn.innerHTML = `<i class="fa-solid fa-seedling text-green-600"></i> <span class="font-semibold">All Trees</span>`;
    allBtn.onclick = (e) => handleCategoryClick(allBtn, 'all');
    categoryContainer.appendChild(allBtn);

//Dynamic Category Buttons
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = "category-btn w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 transition-all mb-2 border border-transparent";
        btn.innerHTML = `<i class="fa-solid fa-leaf text-green-500"></i> <span class="font-semibold">${category.category_name}</span>`;
        btn.onclick = (e) => handleCategoryClick(btn, category.id);
        categoryContainer.appendChild(btn);
    });
};

//Load Trees
const loadAllTrees = () => {
    loadSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => {
            loadSpinner(false);
            displayTrees(data.plants);
        })
        .catch((err) => loadSpinner(false));
};

const loadTreesByCategory = (id) => {
    loadSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            loadSpinner(false);
            displayTrees(data.plants);
        });
};

//Display Trees
const displayTrees = (trees) => {
    const container = document.getElementById('tree-list-container');
    container.innerHTML = '';

    if (!trees || trees.length === 0) {
        container.innerHTML = `<div class="text-center py-10 text-gray-400">No plants found in this category.</div>`;
        return;
    }

    trees.forEach((tree) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="loadModal('${tree.id}')" class="card card-side bg-white shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all overflow-hidden">
            <figure class="w-1/3">
                <img src="${tree.image}" alt="${tree.name}" class="h-full w-full object-cover"/>
            </figure>
            <div class="card-body w-2/3 p-4">
                <div class="flex justify-between">
                    <h2 class="card-title text-green-900">${tree.name}</h2>
                    <div class="badge badge-outline">${tree.category}</div>
                </div>
                <p class="text-sm text-gray-500 line-clamp-2">${tree.description || 'A beautiful addition to your green space.'}</p>
                <div class="card-actions justify-between items-center mt-4">
                    <p class="text-xl font-bold text-amber-600">${tree.price} <span class="text-xs">BDT</span></p>
                    <button onclick="addToCart(event, '${tree.id}', '${tree.name}', ${tree.price}, '${tree.image}')" 
                            class="btn btn-warning btn-sm">Add to Cart</button>
                </div>
            </div>
        </div>`;
        container.appendChild(div);
    });
};



//Cart Logic
const addToCart = (event, id, name, price, img) => {
    event.stopPropagation();
    cart.push({ id, name, price, img });
    total += price;
    updateCartUI();
};

const updateCartUI = () => {
    const container = document.getElementById('cart-container');
    const totalEl = document.querySelector('.cart-total');
    container.innerHTML = '';

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "flex items-center gap-3 p-2 bg-gray-50 rounded-lg relative group";
        div.innerHTML = `
            <img src="${item.img}" class="w-12 h-12 rounded object-cover">
            <div class="flex-1">
                <p class="text-sm font-bold truncate">${item.name}</p>
                <p class="text-xs text-green-600">${item.price} BDT</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-trash-can"></i>
            </button>`;
        container.appendChild(div);
    });
    totalEl.innerText = total.toFixed(2);
};

const removeFromCart = (index) => {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
};

//Helpers
const handleCategoryClick = (btn, id) => {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active-btn', 'bg-green-100'));
    btn.classList.add('active-btn', 'bg-green-100');
    id === 'all' ? loadAllTrees() : loadTreesByCategory(id);
};

const loadSpinner = (show) => {
    document.getElementById('loading-spinner').classList.toggle('hidden', !show);
};

//Initialize
loadCategory();
loadAllTrees();