import "./recipe-item.js";

class Categories extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set category(category) {
    this._category = category;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
                            <style>
                            
                            :host{
                                display: -webkit-box;
                                display: -ms-flexbox;
                                display: flex;
                                width: 60px;
                                background-color: #ffc965;
                                border-radius: 50px;
                                cursor:pointer;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                
                                margin-left: 10px;
                                margin-bottom: 30px;
                                
                              }

                              :host(:hover){
                                background-color: white;
                              }

                              :host(:hover) > span{
                                background-color: salmon;
                              }

                              :host(:hover) > button{
                                font-weight:bold;
                              }
                              
                              button {
                                
                                margin-bottom:10px;
                                border: none;
                                text-shadow: 0px 0px 0px transparent;
                                cursor: pointer;
                                background: none;
                                border-radius: 7px;
                                font-size:8px;
                                font-family: "Poppins",sans-serif;
                              }
                              
                              img{
                                width: 35px;
                                margin-bottom: 5px;
                                padding:10px;
                            }
                        
                            span{
                                border-radius: 50%;
                                background-color: #fff;
                                width: 25px;
                                text-align: center;
                                margin-bottom:10px;
                            }
                            span:hover{
                              background-color: salmon;
                            }
                              
                            .active :host(:hover) > span{
                              background-color: salmon;
                            }
                            
                            </style>
                            <img src="${this._category.strCategoryThumb}" alt="">
                            <button id="btn" href="#btn" data-category=${this._category.strCategory}>${this._category.strCategory}</button> 
                            <span>></span>
                            
                        `;

    const btn = this.shadowDOM.querySelector("#btn");

    this.shadowRoot.addEventListener("click", function () {
      const category = btn.dataset.category;

      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          let meal = responseJson.meals;

          const container = document.querySelector(".container");
          console.log(container);

          if (container.childNodes.length !== 0) {
            while (container.lastElementChild) {
              container.removeChild(container.lastElementChild);
            }
          }

          meal.forEach((meal) => {
            const item = document.createElement("recipe-item");
            item.recipe = meal;
            container.appendChild(item);
          });
        });
    });
  }
}

customElements.define("categories-btn", Categories);
