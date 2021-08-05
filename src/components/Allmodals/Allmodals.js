import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./Allmodals.scss";

const URL_START = "https://dog.ceo/api/breed/";
const URL_END = "/images/random/3";
const HOUND = "hound/";

class Allmodals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      subbreedURLs: [],
      show: false,
      errorMessage: false
    };
  }

  handleClick = (subbreed) => {
    console.log("klik subbred");
    fetch(`${URL_START}${HOUND}${subbreed}${URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          if (!Array.isArray(result.message)) {
            console.log("alert");
            this.setState({
              errorMessage: true,
              show: true
            });
          } else {
            this.setState({
              subbreedURLs: result.message,
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
    const { subbreedURLs, show, errorMessage, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (this.props.subbreeds.length === 0) {
      return (
        <Modal
          show={this.props.show}
          imageURLs={this.props.imageURLs}
          onHide={this.props.handleClose}
          centered
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
            centered
            show={show}
            subbreedURLs={subbreedURLs}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title className={"errorMessageTitle"} />
            </Modal.Header>
            <Modal.Body>
              {errorMessage ? (
                <p className={"errorMessage"}>
                  Sorry, we don't have any photos of this sub-breed
                </p>
              ) : (
                subbreedURLs.map((img) => (
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
