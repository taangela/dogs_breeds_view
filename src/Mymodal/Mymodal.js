import React from "react";
import { Modal } from "react-bootstrap";

class Mymodal extends React.Component {
  render() {
    console.log("mymodal:", this.props);
    return (
      <Modal
        show={this.props.show}
        imageURL={this.props.imageURL}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {this.props.imageURL.map((img) => (
            <img src={img} alt={"dog"} key={img.index} />
          ))}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Mymodal;
