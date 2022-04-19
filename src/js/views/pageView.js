import View from './View';
import iconsUrl from 'url:../../img/icons.svg';

class PageView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    const _nextBtn = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next"> 
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
          <use href="${iconsUrl}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    const _prevBtn = `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${iconsUrl}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          `;
    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return _nextBtn;
    }
    //Page 1, no other pages
    if (curPage === 1 && numPages === 1) {
      return '';
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return _prevBtn;
    }
    //Middle pages
    else {
      return `${_prevBtn}${_nextBtn}`;
    }
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PageView();
