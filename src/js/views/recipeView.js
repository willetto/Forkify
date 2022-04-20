import iconsUrl from 'url:../../img/icons.svg';
import { SERVING_INCREMENT } from '../config';
import { Fraction } from 'fractional';
import View from './View';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = "We couldn't find that recipe. Please try another one!";
  _message = '';
  addHandlerRender(handler) {
    // window.addEventListener('hashchange', controlRecipes);
    // window.addEventListener('load', controlRecipes);
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const updateTo = +btn.dataset.updateServings;
      if (updateTo > 0) handler(updateTo);
    });
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup(recipe) {
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
                <button data-update-servings= "${
                  this._data.servings - SERVING_INCREMENT
                }" class="btn--tiny btn--decrease-servings">
                  <svg>
                    <use href="${iconsUrl}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button data-update-servings= "${
                  this._data.servings + SERVING_INCREMENT
                }" class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${iconsUrl}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
              <use href="${iconsUrl}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="${iconsUrl}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
              ${recipe.ingredients.map(this._generateIngredientMarkup).join('')}
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
  _generateIngredientMarkup(ingredient) {
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
