import React from "react";

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
      imageURL: []
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
            imageURL: result.message
          });
          console.log("imageURL", this.state.imageURL);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };
  //https://dog.ceo/api/breed/hound/images/random Fetch!

  render() {
    const { error, isLoaded, items, imageURL } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Ładowanie...</div>;
    } else {
      //console.log("state", this.state);
      //test
      return (
        <div>
          <div>
            {items.map((breed) => (
              //zapisać sobie dlaczego to jest fajne
              <button onClick={() => this.handleClick(breed)} key={breed}>
                {breed}
              </button>
            ))}
          </div>
          <div>
            {imageURL.map((img) => (
              <img src={img} alt={"dog"} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default List;

//<Button onClick={this.choseBreed}>{breed}</Button>
