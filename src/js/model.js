import { async } from "regenerator-runtime";
import { getJSON } from "./helpers";

export const state = {
  current: {},
  search: {
    query: "",
    results: [],
  },
};

// Loading weather information
export const loadWeather = async function (query) {
  try {
    state.search.query = query;

    const allData = await getJSON(query);
    console.log(allData);
    state.search.results = allData;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};
