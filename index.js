import "./categories-btn-item.js";

const getRecipe = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            let recipe = responseJson.categories;

            const categories = document.querySelector('.categories');

            for(let i = 0;i<=8;i++){
                let data = recipe[i];
                const categoriesBtn = document.createElement('categories-btn');
                categoriesBtn.category = data;
                categories.appendChild(categoriesBtn);
                
            }
        })
}

export default getRecipe;







  
  