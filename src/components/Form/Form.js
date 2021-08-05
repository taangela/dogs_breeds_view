import React from "react";
import "./Form.scss";

class Form extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>Breeds search:</label>
          <input
            type="search"
            value={this.props.inputText}
            onChange={this.props.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Form;
