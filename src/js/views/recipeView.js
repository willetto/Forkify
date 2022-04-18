import iconsUrl from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  render(data) {
    this.#clear;
    this.#data = data;
    const markup = this.#generateMarkup(this.#data);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this.#parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `<div class="spinner">
    <svg>
      <use href="${iconsUrl}#icon-loader"></use>
    </svg>
  </div>`;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  addHandlerRender(handler) {
    // window.addEventListener('hashchange', controlRecipes);
    // window.addEventListener('load', controlRecipes);
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  #generateMarkup(recipe) {
    return `
          <figure class="recipe__fig">
            <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${recipe.title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${iconsUrl}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                recipe.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${iconsUrl}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                recipe.servings
              }</span>
              <span class="recipe__info-text">servings</span>
  
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${iconsUrl}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${iconsUrl}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated">
              <svg>
                <use href="${iconsUrl}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${iconsUrl}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
              ${recipe.ingredients.map(this.#generateIngredientMarkup).join('')}
            </ul>
          </div>
  
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                recipe.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${recipe.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${iconsUrl}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>  `;
  }
  #generateIngredientMarkup(ingredient) {
    return `
<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${iconsUrl}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''
  }
  </div>
  <div class="recipe__description">
  <span class="recipe__unit">${ingredient.unit}</span>
  ${ingredient.description}
  </div>
</li>`;
  }
}

export default new RecipeView();
