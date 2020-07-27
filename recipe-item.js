class Recipe extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
    
  

  set recipe(recipe) {
    this._recipe = recipe;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `<style>
        
        :host {
            width: 258px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            -webkit-box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
                    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            background-color: #fff;
            border-radius: 0 0 30px 30px;
            margin: 20px 0;
          }
          
          img {
            margin: 0 auto 16px auto;
            padding-top: 24px;
            display: block;
            width: 210px;
          }
          
          h6 {
            margin: 0 auto 16px auto;
            text-align: center;
            padding: 10px;
          }
          
          button {
            width: 258px;
            height: 53px;
            background-color: #ffc965;
            border-radius: 0 0 27px 27px;
            padding: 12px 24px 12px 24px;
            -webkit-box-shadow: 0px 0px 0px transparent;
                    box-shadow: 0px 0px 0px transparent;
            border: 0px solid transparent;
            text-shadow: 0px 0px 0px transparent;
            color: white;
            font-size: 16px;
            font-weight: bold;
            
          }

          button:hover{
            background-color: #ebba5f;
            cursor: pointer;
          }

          button:active{
            background-color: #dfa944;
          }
        
        </style>
        
                                    
        <div class="list-menu">
          <img src="${this._recipe.strMealThumb}" alt="recipe">
          <h6>${this._recipe.strMeal}</h6>
          <button data-id=${this._recipe.idMeal}>See Recipe</button>
        </div>`;

    const button = this.shadowDOM.querySelectorAll('button');

    button.forEach(e => {
      e.addEventListener('click', function () {
        
        const id = this.dataset.id;
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(response => {
            return response.json();
          })
          .then(responseJson => {

            let m = responseJson.meals;

            const modal = document.querySelector(".modal");

            let cards = '';
            m.forEach(m => cards += showModal(m));
            
            modal.innerHTML = cards;
            toggleModal();

            const closeButton = document.querySelector(".close-button");
            closeButton.addEventListener("click", toggleModal);

            function toggleModal() {
              modal.classList.toggle("show-modal");
            }
          })
      });
    })
  }
}




function showModal(m) {
  return ` 
  <div class="modal-content">
      <div class="img"><img src="${m.strMealThumb}" alt="">  
      </div>
      <div class="sectionA">
          <div class="title">
          <hr class='hrTop'>
              <h1>${m.strMeal}</h1>
              <hr>
          </div>
          <div class="article">
              <div class="ingridients">
                  <h3>Ingridients</h3>
                  <p class="pIngridients">${m.strMeasure1} ${m.strIngredient1} </p>
                  <p class="pIngridients">${m.strMeasure2} ${m.strIngredient2} </p>
                  <p class="pIngridients">${m.strMeasure3} ${m.strIngredient3} </p>
                  <p class="pIngridients">${m.strMeasure4} ${m.strIngredient4} </p>
                  <p class="pIngridients">${m.strMeasure5} ${m.strIngredient5} </p>
                  <p class="pIngridients">${m.strMeasure6} ${m.strIngredient6} </p>
                  <p class="pIngridients">${m.strMeasure7} ${m.strIngredient7} </p>
                  <p class="pIngridients">${m.strMeasure8} ${m.strIngredient8} </p>
                  <p class="pIngridients">${m.strMeasure9} ${m.strIngredient9} </p>
                  <p class="pIngridients">${m.strMeasure10} ${m.strIngredient10} </p>
                  <p class="pIngridients">${m.strMeasure11} ${m.strIngredient11} </p>
                  <p class="pIngridients">${m.strMeasure12} ${m.strIngredient12} </p>
                  <p class="pIngridients">${m.strMeasure13} ${m.strIngredient13} </p>
                  <p class="pIngridients">${m.strMeasure14} ${m.strIngredient14} </p>
                  <p class="pIngridients">${m.strMeasure15} ${m.strIngredient15} </p>
                  <p class="pIngridients">${m.strMeasure16} ${m.strIngredient16} </p>
                  <p class="pIngridients">${m.strMeasure17} ${m.strIngredient17} </p>
                  <p class="pIngridients">${m.strMeasure18} ${m.strIngredient18} </p>
                  <p class="pIngridients">${m.strMeasure19} ${m.strIngredient19} </p>
                  <p class="pIngridients">${m.strMeasure20} ${m.strIngredient20} </p>
              </div>
              <div class="instructions">
                  <h3>Instructions</h3>
                  <p class="pInstruction">${m.strInstructions}</p>

              </div>
          </div>

          <span class="close-button">&times;</span>
      `
}

customElements.define("recipe-item", Recipe);