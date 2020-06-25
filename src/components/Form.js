import React from "react";

const Form = props => (
  <form onSubmit={props.getWeather}>
    <input type="text" name="city" placeholder="City" />
    <input type="text" name="country" placeholder="Country" />
    <button className="btn btn-primary" type="submit">
      {props.loading && <i className="fas fa-redo-alt fa-spin"> </i>}
      {props.loading && <span>Loading...</span>}
      {!props.loading && <span>Get Weather</span>}
    </button>
  </form>
);

export default Form;
