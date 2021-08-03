import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./Breedmodal.scss";

const BREED_URL_START = "https://dog.ceo/api/breed/";
const BREED_URL_END = "/images/random/3";
const HOUND = "hound/";

class Mymodal extends React.Component {
  handleClick = (subbreed) => {
    console.log("dup", subbreed);
  };

  render() {
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
        </div>
      );
    }
  }
}

export default Mymodal;
