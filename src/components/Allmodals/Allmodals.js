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
      showModal: false,
      errorMessage: false
    };
  }

  handleClick = (subbreed) => {
    fetch(`${URL_START}${HOUND}${subbreed}${URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          if (!Array.isArray(result.message)) {
            console.log("alert");
            this.setState({
              errorMessage: true,
              showModal: true
            });
          } else {
            this.setState({
              subbreedURLs: result.message,
              errorMessage: false,
              showModal: true
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
    this.setState({ showModal: false });
  };

  render() {
    const { subbreedURLs, showModal, errorMessage, error } = this.state;
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
        <div>
          <Modal
            centered
            animation={false}
            show={this.props.show}
            onHide={this.props.handleClose}
            dialogClassName="subbreedWrapper"
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.breed} sub-breeds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.subbreeds.map((subbreed) => (
                <Button
                  variant="outline-info"
                  onClick={() => this.handleClick(subbreed)}
                  key={subbreed}
                >
                  {subbreed}
                </Button>
              ))}
            </Modal.Body>
          </Modal>

          <Modal
            centered
            show={showModal}
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
