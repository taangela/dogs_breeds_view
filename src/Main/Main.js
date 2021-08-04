import React from "react";
import Allmodals from "../Allmodals/Allmodals.js";
import Form from "../Form/Form.js";
import { Button } from "react-bootstrap";
import "./Main.scss";

const ALL_DOGS_LIST = "https://dog.ceo/api/breeds/list/all";
const BREED_URL_START = "https://dog.ceo/api/breed/";
const BREED_URL_END = "/images/random/3";
const SUBBREED_URL_START = "https://dog.ceo/api/breed/";
const SUBBREED_URL_END = "/list";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allbreeds: [],
      imageURLs: [],
      show: false,
      inputText: "",
      subbreeds: []
    };
  }

  componentDidMount() {
    fetch(`${ALL_DOGS_LIST}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allbreeds: Object.keys(result.message)
          });
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
    fetch(`${SUBBREED_URL_START}${breed}${SUBBREED_URL_END}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          subbreeds: result.message,
          selectedBreed: breed
        });
      });

    fetch(`${BREED_URL_START}${breed}${BREED_URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            imageURLs: result.message,
            show: true
          });
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
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      error,
      isLoaded,
      allbreeds,
      imageURLs,
      show,
      inputText,
      subbreeds,
      selectedBreed
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let filterAllbreeds = allbreeds.filter((breed) => {
        if (inputText === "") {
          return true;
        } else {
          return breed.includes(inputText);
        }
      });
      return (
        <div>
          <Form value={inputText} handleChange={this.handleChange} />
          <div className={"buttonsWrapper"}>
            {filterAllbreeds.map((breed) => (
              <Button
                variant="outline-info"
                onClick={() => this.handleClick(breed)}
                key={breed}
              >
                {breed}
              </Button>
            ))}
          </div>
          <Allmodals
            show={show}
            imageURLs={imageURLs}
            subbreeds={subbreeds}
            breed={selectedBreed}
            handleClose={this.handleClose}
            onClick={this.handleClick}
          />
          ;
        </div>
      );
    }
  }
}

export default Main;
