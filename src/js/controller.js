import RecipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pageView from './views/pageView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();
    //Update results view to mark selected search result

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    //Load Recipe
    await model.loadRecipe(id);
    z;
    const { recipe } = model.state;
    // console.log(recipe);

    //Rendering Recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    //Load search results
    await model.loadSearchResults(query);
    //Render Results
    resultsView.render(model.getSearchResultsPage());
    //Render Pagination
    pageView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goToPage) {
  model.state.search.page = goToPage;
  resultsView.render(model.getSearchResultsPage());
  //Render Pagination
  pageView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update recipe servings (state)
  model.updateServings(newServings);
  // update the recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  //Add or Remove Book mark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update Recipe View
  recipeView.update(model.state.recipe);
  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //Upload New Recipe Data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render Recipe
    recipeView.render(model.state.recipe);

    //Success Message
    addRecipeView.renderMessage();

    //Render Bookmark View
    bookmarksView.render(model.state.bookmarks);

    //Change URL Hash
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close Modal
    setTimeout(function () {
      addRecipeView.toggleModal();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  pageView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
