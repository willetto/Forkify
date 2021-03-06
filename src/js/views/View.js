import iconsUrl from 'url:../../img/icons.svg';

export default class View {
  _data;
  _errorMessage = '';
  _message = '';

  /**
   * Render the recieved object to the DOM
   * @param {Object| Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] If false, create markup string only instead of rendering to the DOM.
   * @returns {undefined | string}If rendering, returns nothing. If not rendering, returns markup.
   * @this {Object} View Instance
   * @author Trey Willetto
   * @todo Finish Implementation
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup(this._data);

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newmarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    // console.log(currentElements, newElements);

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (newEl.isEqualNode(curEl)) return;
      //Updates Changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Updates Changed Attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(att =>
          curEl.setAttribute(att.name, att.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${iconsUrl}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
<div class="error">
<div>
  <svg>
    <use href="${iconsUrl}#icon-alert-triangle"></use>
  </svg>
</div>
<p>${message}</p>
</div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
<div class="error">
<div>
  <svg>
    <use href="${iconsUrl}#icon-smile"></use>
  </svg>
</div>
<p>${message}</p>
</div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
