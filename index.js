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
        
    });
    


};
    
loadAllTrees();
loadCategory();