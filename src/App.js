import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import Weather from "./components/Weather";
import Form from "./components/Form";

const API_KEY = "d5621a6d563bceceb728b5d38a5a6afd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      pressurre: undefined,
      wind_speed: undefined,
      error: undefined,
      loading: false
    };
  }

  getWeather = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
    );
    const data = await api_call.json();
    console.log(data);

    if (city && country && data.cod !== "404") {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        pressurre: data.main.pressure,
        wind_speed: data.wind.speed,
        error: "",
        loading: false
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        pressurre: undefined,
        wind_speed: undefined,
        error: "Please enter valid city and country names.",
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-5 title-container">
                <Title />
              </div>
              <div className="col-7 form-container overflow-auto">
                <Form
                  getWeather={this.getWeather}
                  loading={this.state.loading}
                />
                <Weather
                  temperature={this.state.temperature}
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  pressure={this.state.pressurre}
                  wind_speed={this.state.wind_speed}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
