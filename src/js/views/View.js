import iconsUrl from 'url:../../img/icons.svg';

export default class View {
  _data;
  _errorMessage = '';
  _message = '';
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._clear();
    this._data = data;
    const markup = this._generateMarkup(this._data);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
}
