import React from "react";
import { Modal, Button } from "react-bootstrap";

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
    console.log("klik subbred");
    fetch(`${BREED_URL_START}${HOUND}${subbreed}${BREED_URL_END}`)
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
              subbreedurls: result.message,
              errorMessage: false,
              show: true
            });
          }
        },
        (error) => {
          console.log("error");
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
