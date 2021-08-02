import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form>
        <label>Breeds search:</label>
        <input
          type="search"
          value={this.props.inputText}
          onChange={this.props.handleChange}
        />
      </form>
    );
  }
}

export default Form;
