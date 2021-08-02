import React from "react";
import Mymodal from "./Mymodal/Mymodal.js";
import Form from "./Form/Form.js";

const ALL_DOGS_LIST = "https://dog.ceo/api/breeds/list/all";
const BREED_URL_START = "https://dog.ceo/api/breed/";
const BREED_URL_END = "/images/random/3";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      imageURL: [],
      //zmienić nazwę na imageURLs
      show: false,
      inputText: ""
    };
  }

  componentDidMount() {
    fetch(`${ALL_DOGS_LIST}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: Object.keys(result.message)
          });
          console.log("ite", this.state.items);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleClick = (breed) => {
    console.log("key", breed);
    fetch(`${BREED_URL_START}${breed}${BREED_URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            imageURL: result.message,
            show: true
          });
          console.log("show", this.state.imageURL);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
    console.log("input", this.state);
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { error, isLoaded, items, imageURL, show, inputText } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Ładowanie...</div>;
    } else {
      let filterItems = items.filter((breed) => {
        if (inputText === "") {
          return true;
        } else {
          return breed.includes(inputText);
        }
      });
      return (
        <div>
          <Form value={inputText} handleChange={this.handleChange} />
          <div>
            {filterItems.map((breed) => (
              <button onClick={() => this.handleClick(breed)} key={breed}>
                {breed}
              </button>
            ))}
          </div>
          <Mymodal
            show={show}
            imageURL={imageURL}
            handleClose={this.handleClose}
          />
          ;
        </div>
      );
    }
  }
}

export default List;
