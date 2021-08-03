import React from "react";
import { Modal } from "react-bootstrap";

import "./Mymodal.scss";

class Mymodal extends React.Component {
  render() {
    console.log("mymodal:", this.props);
    return (
      <Modal
        show={this.props.show}
        imageURLs={this.props.imageURLs}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {this.props.imageURLs.map((img) => (
            <div clasName={"imgWrapper"}>
              <img src={img} alt={"dog"} key={img.index} />
            </div>
          ))}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Mymodal;
