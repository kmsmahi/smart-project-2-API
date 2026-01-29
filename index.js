// function for loading categories
const loadCategory=()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res)=>res.json())
    .then((data)=>displaycategory(data.categories))
    .catch((err)=>console.log(err))
};
// function for displaying categories
const displaycategory=(categories)=>{
    const categoryContainer=document.getElementById('category-container');
    categoryContainer.innerHTML='';
    // all trees button add manually started
    const allTreeDiv=document.createElement('div');
        allTreeDiv.innerHTML=`
        <button onclick="loadAllTrees()" class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-green-500/10 border border-transparent hover:border-green-500/30 transition-all duration-300 group text-left">
        <div class="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
        <i class="fa-solid fa-seedling text-xl text-green-500 group-hover:text-white"></i>
        </div>
        <span class="font-semibold text-green-700 group-hover:text-green-600">All Trees</span>
        </button>
        <p class="text-md font-bold text-gray-500 uppercase tracking-widest px-4 mb-2 mt-2">Filter by category</p>
        `;
        categoryContainer.append(allTreeDiv);
    // all trees button add manually ended

    // displaying categories dynamically
    categories.forEach(category=>{
        const categoryDiv=document.createElement('div');
        categoryDiv.innerHTML=`
        <button class="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-green-500/10 border border-transparent hover:border-green-500/30 transition-all duration-300 group text-left">
        <div class="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
        <i class="fa-solid fa-seedling text-xl text-green-500 group-hover:text-white"></i>
        </div>
        <span class="font-semibold text-green-700 group-hover:text-green-600">${category.category_name}</span>
        </button>
        `;
        categoryContainer.append(categoryDiv);
    })
};
// category part completed

// function for loading all trees
const loadAllTrees=()=>{
    fetch('https://openapi.programming-hero.com/api/plants')
    .then((res)=>res.json())
    .then((data)=>displayalltrees(data.plants))
    .catch((err)=>console.log(err))
};
// function for displaying all trees
const displayalltrees=(trees)=>{
    const allTreesContainer=document.getElementById('tree-list-container');
    allTreesContainer.innerHTML='';
    trees.forEach((tree)=>{
     const treeDiv=document.createElement('div');
     treeDiv.innerHTML=`
     <div class="card bg-base-100 w-full max-w-sm shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
     <figure class="h-[200px] w-full overflow-hidden">
     <img
      src="${tree.image}"
      alt="${tree.name}"
      class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
     </figure>

     <div class="card-body p-5">
     <div class="flex justify-between items-start">
      <h2 class="card-title text-gray-800 font-bold">
        ${tree.name}
      </h2>
      <div class="badge badge-secondary">${tree.category}</div>
     </div>

     <p class="text-sm text-gray-500 line-clamp-2 my-2">
      ${tree.description || "A beautiful, healthy tree perfect for your garden or indoor space."}
     </p>

     <div class="card-actions items-center justify-between mt-4 pt-4 border-t border-gray-100">
     <div class="flex flex-col">
        <span class="text-[10px] text-gray-400 uppercase font-bold">Price</span>
        <h2 class="text-xl font-black text-amber-600">
          $${tree.price} <span class="text-xs text-gray-400 font-medium">BDT</span>
        </h2>
      </div>
      
      <button class="btn btn-warning btn-sm md:btn-md rounded-xl shadow-md hover:shadow-amber-200">
        <i class="fa-solid fa-cart-plus"></i>
        Add
      </button>
      </div>
     </div>
     </div>
     `;
          allTreesContainer.append(treeDiv);
    });
    


};
    
// loadAllTrees();
loadCategory();