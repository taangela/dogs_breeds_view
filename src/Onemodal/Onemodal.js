import React from "react";
import { Modal } from "react-bootstrap";

import "./Onemodal.scss";

class Onemodal extends React.Component {
  render() {
    console.log("k", this.props);
    return (
      <Modal
        show={this.props.show}
        breedurls={this.props.breedurls}
        onHide={this.props.handleClose}
        selectedbreed={this.props.selectedbreed}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedbreed}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {}
          {this.props.breedurls.map((img) => (
            <div clasName={"imgWrapper"} key={img.index}>
              <img src={img} alt={"dog"} />
            </div>
          ))}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Onemodal;
