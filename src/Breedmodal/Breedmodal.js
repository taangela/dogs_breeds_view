import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./Breedmodal.scss";

const BREED_URL_START = "https://dog.ceo/api/breed/";
const BREED_URL_END = "/images/random/3";
const HOUND = "hound/";

class Mymodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      subbreedsURLs: [],
      show: false,
      errorMessage: false
    };
  }

  handleClick = (subbreed) => {
    fetch(`${BREED_URL_START}${HOUND}${subbreed}${BREED_URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("aaaa", result.message);
          if (result.message === "Breed not found (sub breed does not exist)") {
            this.setState({
              errorMessage: true,
              show: true
            });
            console.log("em");
          } else {
            this.setState({
              subbreedsURLs: result.message,
              errorMessage: false,
              show: true
            });
            console.log("gdzie ja jestem");
          }
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  handleClose = () => {
    this.setState({ show: false });
    console.log("close");
  };

  render() {
    const { subbreedsURLs, show, errorMessage } = this.state;
    if (this.props.subbreeds.length === 0) {
      return (
        <Modal
          show={this.props.show}
          imageURLs={this.props.imageURLs}
          onHide={this.props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.breed}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {}
            {this.props.imageURLs.map((img) => (
              <div clasName={"imgWrapper"}>
                <img src={img} alt={"dog"} key={img.index} />
              </div>
            ))}
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <div className={"subbreedWrapper"}>
          <p>{this.props.breed} sub-breeds</p>
          {this.props.subbreeds.map((subbreed) => (
            <Button
              variant="outline-info"
              onClick={() => this.handleClick(subbreed)}
              key={subbreed}
            >
              {subbreed}
            </Button>
          ))}
          <Modal
            show={show}
            subbreedsURLs={subbreedsURLs}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title />
            </Modal.Header>
            <Modal.Body>
              {errorMessage ? (
                <p>Sorry, we don't have any photos of his sub-breed</p>
              ) : (
                subbreedsURLs.map((img) => (
                  <div clasName={"imgWrapper"}>
                    <img src={img} alt={"dog"} key={img.index} />
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}

export default Mymodal;
