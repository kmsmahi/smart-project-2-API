
// 1. load Categories
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => displaycategory(data.categories))
    .catch((err) => console.log(err))
};

let cart=[];
let total=0;

// 2. Display Categories in Sidebar
const displaycategory = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    // All Trees Button
    const allTreeDiv = document.createElement('div');
    allTreeDiv.innerHTML = `
        <button onclick="handleCategoryClick(this, 'all')" class="category-btn active-btn  w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all group mb-2">
            <div class="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                <i class="fa-solid fa-seedling text-xl text-green-500 group-hover:text-white"></i>
            </div>
            <span class="font-semibold text-green-700">All Trees</span>
        </button>
        <p class="text-md font-bold text-gray-500 uppercase tracking-widest px-4 mb-2 mt-2">Filter by category</p>
    `;
    categoryContainer.append(allTreeDiv);

    // Dynamic Category Buttons
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button onclick="handleCategoryClick(this,'${category.id}')" class="category-btn active-btn w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-500/10 transition-all group mb-2">
            <div class="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                <i class="fa-solid fa-leaf text-xl text-green-500 group-hover:text-white"></i>
            </div>
            <span class="font-semibold text-green-700">${category.category_name}</span>
        </button>
        `;
        categoryContainer.append(categoryDiv);
    })
};

// 3. Load All Trees
const loadAllTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => displayalltrees(data.plants))
    .catch((err) => console.log(err))
};

// 4. Load Trees by Specific Category
const loadTreesByCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayalltrees(data.plants))
    .catch((err) => console.log(err))
};

// 5. Universal Display Function
const displayalltrees = (trees) => {
    const allTreesContainer = document.getElementById('tree-list-container');
    allTreesContainer.innerHTML = '';

    if(trees.length === 0) {
        allTreesContainer.innerHTML = `<div class="col-span-full text-center py-20 font-bold text-gray-400">No Trees Found in this Category.</div>`;
        return;
    }

    trees.forEach((tree) => {
        const treeDiv = document.createElement('div');
        treeDiv.innerHTML = `
        <div class="card bg-base-100 w-full shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <figure class="card-img h-[200px] w-full overflow-hidden">
                <img src="${tree.image}" alt="${tree.name}" class="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
            </figure>
            <div class="card-body p-5">
                <div class="flex justify-between items-start">
                    <h2 class="card-title text-gray-800 font-bold">${tree.name}</h2>
                    <div class="badge badge-secondary">${tree.category}</div>
                </div>
                <p class="text-sm text-gray-500 line-clamp-2 my-2">${tree.description || "Beautiful tree for your garden."}</p>
                <div class="card-actions items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase font-bold">Price</span>
                        <h2 class="cart-price text-xl font-black text-amber-600">${tree.price} <span class="text-xs text-gray-400 font-medium">BDT</span></h2>
                    </div>
                    <button onclick="addToCart(event,'${tree.id}')" class="btn btn-warning btn-sm rounded-xl">Add to Cart</button>
                </div>
            </div>
        </div>`;
        allTreesContainer.append(treeDiv);
    });
};






loadCategory();

// card-img   card-title  cart-price

const addToCart=(event,id)=>{
    event.stopPropagation();
    const treeCard=event.target.closest('.card');
    const treeImg=treeCard.querySelector('.card-img img').src;
    // console.log(treeImg);
    const treeTitle=treeCard.querySelector('.card-title').innerText;
    // console.log(treeTitle);
    const treeprice=treeCard.querySelector('.cart-price').innerText;
    // console.log(treeprice);
    const tree={
        image:treeImg,
        treeTitle:treeTitle,
        price:parseFloat(treeprice)
    };
    cart.push(tree);
    // console.log(cart);
    total+=tree.price;
    displayCart();
    displayTotal(total);
};

const displayTotal=(val)=>{
    const cartTotal=document.querySelector('.cart-total');
    cartTotal.innerText=val.toFixed(2);
}
const displayCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach((tree, index) => {
        const cartDiv = document.createElement('div');
        cartDiv.innerHTML = `
        <div class="flex items-center gap-3 p-2 mb-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow relative group">
            <div class="flex-shrink-0">
                <img
                    src="${tree.image}"
                    alt="${tree.treeTitle}"
                    class="w-14 h-14 rounded-md object-cover border border-white shadow-sm"
                />
            </div>

            <div class="flex-1 min-w-0">
                <h1 class="text-sm font-bold text-gray-800 truncate">
                    ${tree.treeTitle}
                </h1>
                <p class="text-green-600 font-bold text-xs">
                    $${tree.price} <span class="text-gray-400 font-normal">BDT</span>
                </p>
            </div>

            <button
                onclick="removeFromCart(${index})"
                class="absolute -top-2 -right-2 w-6 h-6 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Remove Item"
            >
                <i class="fa-solid fa-xmark text-xs"></i>
            </button>
             
        </div>
        `;
        cartContainer.append(cartDiv);
    });
};

// cart-total


const removeFromCart=(index)=>{
    const removedTree=cart[index];
    total-=removedTree.price;
    cart.splice(index,1);
    displayCart();
    displayTotal(total);

};
const deleteCart=(e)=>{
    const deleteTree=e.parentNode;
    deleteTree.remove();
};
const handleCategoryClick=(clickedBtn,categoryId)=>{
    const allbtn=document.querySelectorAll('.category-btn');
    allbtn.forEach(btn=>{
        btn.classList.remove('active-btn');
    });
    clickedBtn.classList.add('active-btn');
    if(categoryId==='all'){
        loadAllTrees();
    }else{
        loadTreesByCategory(categoryId);
    }
};
