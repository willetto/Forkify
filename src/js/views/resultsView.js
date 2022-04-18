import View from './View';
import iconsUrl from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    "We couldn't find anything from your search. Please try another one!";
  _message = '';
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(recipe) {
    return `<li class="preview">
    <a class="preview__link" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="${recipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}...</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultsView();
