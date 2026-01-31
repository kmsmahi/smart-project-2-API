
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
                    <div class="badge badge-outline 
                    text-[10px] md:text-xs 
                    px-2 py-3 md:px-3 md:py-4 
                    whitespace-nowrap max-w-fit">
                   ${tree.category}
                </div>
                </div>
                <p class="text-sm text-gray-500 line-clamp-2">${tree.description || 'A beautiful addition to your green space.'}</p>
                <div class="card-actions justify-between items-center mt-4">
                    <p class="text-xl font-bold text-amber-600">${tree.price} <span class="text-xs">BDT</span></p>
                    <button onclick="event.stopPropagation(); addToCart(event, '${tree.id}', '${tree.name}', ${tree.price}, '${tree.image}')" 
                    class="btn btn-warning btn-sm">Add to Cart</button>
                </div>
            </div>
        </div>`;
        container.appendChild(div);
    });
};

// modal logic
const loadModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            // The API returns the object inside the "plants" key
            if (data.status && data.plants) {
                displayModal(data.plants);
            } else {
                console.error("Plant not found in API response", data);
            }
        })
        .catch(err => console.error('Error loading modal:', err));
};

const displayModal = (tree) => {
    const modalDetails = document.getElementById('tree-detail-container');
    
    modalDetails.innerHTML = `
        <div class="relative overflow-hidden rounded-3xl mb-6 group">
            <img src="${tree.image}" alt="${tree.name}" 
                 class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-green-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                <i class="fa-solid fa-leaf mr-1"></i> ${tree.category}
            </span>
        </div>

        <div class="px-2">
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">${tree.name}</h2>
                <div class="text-right">
                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-tighter">Price</span>
                    <span class="text-3xl font-black text-green-600">${tree.price}<small class="text-sm ml-1 text-gray-500 font-medium">BDT</small></span>
                </div>
            </div>

            <p class="text-gray-500 leading-relaxed mb-8 border-l-4 border-green-100 pl-4 italic">
                "${tree.description}"
            </p>

            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="bg-green-50 p-4 rounded-2xl flex items-center gap-3">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                        <i class="fa-solid fa-droplet"></i>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase font-bold text-green-800/50">Watering</p>
                        <p class="text-sm font-bold text-gray-700">Regular</p>
                    </div>
                </div>
                <div class="bg-orange-50 p-4 rounded-2xl flex items-center gap-3">
                    <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                        <i class="fa-solid fa-sun"></i>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase font-bold text-orange-800/50">Sunlight</p>
                        <p class="text-sm font-bold text-gray-700">Full Sun</p>
                    </div>
                </div>
            </div>

            <button class="w-full bg-gray-900 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-green-200">
                <i class="fa-solid fa-cart-plus"></i>
                Add to Collection
            </button>
        </div>
    `;

    const myModal = document.getElementById('my_modal_1');
    myModal.showModal();
}

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
        // Added 'justify-between' and removed 'relative' to ensure space for the button
        div.className = "flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 group transition-all";
        
        div.innerHTML = `
            <img src="${item.img}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-gray-800 truncate">${item.name}</p>
                <p class="text-xs font-semibold text-green-600">${item.price} BDT</p>
            </div>
            <button onclick="removeFromCart(${index})" 
                class="text-red-500 p-2 hover:bg-red-50 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Remove item">
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