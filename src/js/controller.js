import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

import * as model from "./model.js";

import View from "./views/View.js";

if (module.hot) {
  module.hot.accept();
}

// Implementing the search query
const controlSearchResults = async function () {
  try {
    View.renderSpinner();

    const query = View.getQuery();
    if (!query) return;

    await model.loadWeather(query);

    View.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    View.renderError();
  }
};

// Initialization function
const init = function () {
  View.addHandlerRenderer(controlSearchResults);
};

init();
