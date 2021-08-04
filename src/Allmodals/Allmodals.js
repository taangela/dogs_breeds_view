import React from "react";
import { Modal, Button } from "react-bootstrap";
import Onemodal from "../Onemodal/Onemodal.js";

import "./Allmodals.scss";

const BREED_URL_START = "https://dog.ceo/api/breed/";
const BREED_URL_END = "/images/random/3";
const HOUND = "hound/";

class Allmodals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      subbreedurls: [],
      show: false,
      errorMessage: false
    };
  }

  handleClick = (subbreed) => {
    fetch(`${BREED_URL_START}${HOUND}${subbreed}${BREED_URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "Breed not found (sub breed does not exist)") {
            this.setState({
              errorMessage: true,
              show: true
            });
          } else {
            this.setState({
              subbreedsURLs: result.message,
              errorMessage: false,
              show: true
            });
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
  };

  render() {
    const { subbreedurls, show, errorMessage } = this.state;
    if (this.props.subbreeds.length === 0) {
      console.log("ab", this.props);
      return <p>aa</p>;
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
            subbreedurls={subbreedurls}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title />
            </Modal.Header>
            <Modal.Body>
              {errorMessage ? (
                <p>Sorry, we don't have any photos of his sub-breed</p>
              ) : (
                subbreedurls.map((img) => (
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

export default Allmodals;
