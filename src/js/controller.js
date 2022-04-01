import view from "./views/view.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

import * as model from "./model.js";

if (module.hot) {
  module.hot.accept();
}

// Implementing the search query
const controlSearchResults = async function () {
  try {
    view.renderSpinner();

    const query = view.getQuery();
    if (!query) return;

    await model.loadWeather(query);

    view.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    view.renderError();
  }
};

// Initialization function
const init = function () {
  view.addHandlerRenderer(controlSearchResults);
};

init();
