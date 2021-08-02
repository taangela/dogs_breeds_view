import React from "react";
import { Modal } from "react-bootstrap";

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
      show: false,
      inputText: ''
    };
  }

  componentDidMount() {
    fetch(`${ALL_DOGS_LIST}`)
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log('items', result);
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
          console.log("show", this.state.show);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleClose = () => {
    this.setState({ show: false });
    console.log("dzieje się");
  };

  handleChange = (e) => {
    this.setState({inputText: e.target.value});
    console.log('input', this.state );
  }

  render() {
    const { error, isLoaded, items, imageURL, show, inputText } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Ładowanie...</div>;
    } else if (inputText === ''){
      return (
        <div>
          <form>
            <label for="breedsearch">Breeds search:</label>
            <input type="search" value={inputText} onChange={this.handleChange}  />
          </form> 
          <div>
            {items.map((breed) => (
                //zapisać sobie dlaczego to jest fajne
                <button onClick={() => this.handleClick(breed)} key={breed}>
                  {breed}
                </button>
              ))}
          </div>
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div>
                {imageURL.map((img) => (
                  <img src={img} alt={"dog"} key={img.index} />
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <form>
            <label for="breedsearch">Breeds search:</label>
            <input type="search" value={inputText} onChange={this.handleChange}  />
            <input type="submit" value="Submit"/>
          </form> 
          <div>
            {items
              .filter((breed) => { 
                return breed.includes(inputText);
              })
              .map((breed) => (
                <button onClick={() => this.handleClick(breed)} key={breed}>
                  {breed}
                </button>
              ))}
          </div>
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div>
                {imageURL.map((img) => (
                  <img src={img} alt={"dog"} key={img.index} />
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}

export default List;

//<Button onClick={this.choseBreed}>{breed}</Button>
