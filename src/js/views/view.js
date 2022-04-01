import icons from "url:../../img/icons.svg";

// A Class for rendering the weather stack to the UI;
class View {
  _parentEl = document.querySelector(".container");
  _searchEl = document.querySelector(".search");
  _messageError = "Please insert a valid name of City ;)";
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRenderer(handler) {
    this._searchEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  getQuery() {
    const query = this._searchEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchEl.querySelector(".search__field").value = "";
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
         <svg>
           <use href="${icons}#icon-loader"></use>
         </svg>
    </div>
    `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this._messageError) {
    const markup = `
        <div class="error">
              <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
              </div>
              <p>${message}</p>
          </div>
    `;

    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div class="search_result">
        <div class="header_description">
          <span class="current_weather_time"
            ><h2>CURRENT WEATHER</h2>
            <p class="time">${this._data[1].current_weather.time}</p></span
          >
          <span class="icon_description"
            ><svg class="weather_icon">
              <use href="${icons}#icon-smile"></use>
            </svg>
            <p class="name">${this._data[0].results[0].name}</p>
            <p class="temperature">${this._data[1].current_weather.temperature}<sup>&#8451;</sup></p>
            <p class="weather_description">SUNNY</p>
          </span>
        </div>
        <div class="detailed_data">
          <ul class="weather_data left_side_data">
            <li class="list">
              <p class="parameter">Max UV Index</p>
              <span class="unit">2 Low</span>
            </li>
            <li class="list">
              <p class="parameter">Wind</p>
              <span class="unit">${this._data[1].current_weather.windspeed} km/h</span>
            </li>
            <li class="list">
              <p class="parameter">Wind Gusts</p>
              <span class="unit">0 km/h</span>
            </li>
            <li class="list">
              <p class="parameter">Humidity</p>
              <span class="unit">$</span>
            </li>
          </ul>
          <ul class="weather_data right_side_data">
            <li class="list">
              <p class="parameter">Dew Point</p>
              <span class="unit">6</span>
            </li>
            <li class="list">
              <p class="parameter">Pressure</p>
              <span class="unit">1022</span>
            </li>
            <li class="list">
              <p class="parameter">Cloud Cover</p>
              <span class="unit">0%</span>
            </li>
            <li class="list">
              <p class="parameter">Visibility</p>
              <span class="unit">16 km</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

export default new View();
