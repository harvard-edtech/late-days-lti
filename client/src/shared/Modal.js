/**
 * A generic popup modal
 * @author Gabe Abrams
 */

// Import React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import BootstrapModal from 'react-bootstrap/Modal';

/*
To use this modal, import it:
import Modal from '../shared/Modal';

Add it in JSX:
<Modal
  title="Are you sure?"
  body="This is a dangerous action!"
  type={Modal.TYPES.OKAY_CANCEL}
  onClose={(button) => {
    if (button === Modal.BUTTONS.OKAY) {
      // Do something
    }
  }}
/>
*/

class Modal extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      // If true, the modal is shown
      visible: false,
    };
  }

  /**
   * Upon mount, wait a moment then animate the modal in
   */
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: true,
      });
    }, 10);
  }

  /**
   * Handles the closing of the modal
   * @param {string} button - the button that was clicked when closing the
   *   modal
   */
  handleClose(button) {
    // Deconstruct props
    const { onClose } = this.props;

    // Update the state
    this.setState({ visible: false });

    // Call the handler after the modal has animated out
    setTimeout(() => {
      onClose(button);
    }, 400);
  }

  /**
   * Renders the modal
   */
  render() {
    // Deconstruct props and state
    const {
      title,
      body,
      type,
    } = this.props;
    const { visible } = this.state;

    // Create footer
    let footer;
    if (type === Modal.TYPES.OKAY_CANCEL) {
      footer = (
        <div>
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.OKAY);
            }}
          >
            Okay
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.CANCEL);
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else if (type === Modal.TYPES.YES_NO) {
      footer = (
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-1"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.YES);
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.NO);
            }}
          >
            No
          </button>
        </div>
      );
    } else if (type === Modal.TYPES.YES_NO_CANCEL) {
      footer = (
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-1"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.YES);
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-1"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.NO);
            }}
          >
            No
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.CANCEL);
            }}
          >
            Cancel
          </button>
        </div>
      );
    } else if (type === Modal.TYPES.BACK_CONTINUE) {
      footer = (
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-1"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.BACK);
            }}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.CONTINUE);
            }}
          >
            Continue
          </button>
        </div>
      );
    } else {
      // Okay modal
      footer = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => {
              this.handleClose(Modal.BUTTONS.OKAY);
            }}
          >
            Okay
          </button>
        </div>
      );
    }

    // Render the modal
    return (
      <BootstrapModal
        show={visible}
        onHide={() => {
          this.handleClose(Modal.BUTTONS.CANCEL);
        }}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>
            {title}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          {body}
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          {footer}
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
}

// Types of buttons that can be clicked
Modal.BUTTONS = {
  YES: 'yes',
  NO: 'no',
  CANCEL: 'cancel',
  CONTINUE: 'continue',
  BACK: 'back',
};

// Types of modals to show
Modal.TYPES = {
  OKAY: 'okay',
  OKAY_CANCEL: 'okay-cancel',
  YES_NO: 'yes-no',
  YES_NO_CANCEL: 'yes-no-cancel',
  BACK_CONTINUE: 'back-continue',
};

// Prop types
Modal.propTypes = {
  // The title of the modal
  title: PropTypes.node.isRequired,
  // The body of the modal
  body: PropTypes.node.isRequired,
  // Handler to call when modal is closed
  onClose: PropTypes.func.isRequired,
  // Type of the modal
  type: PropTypes.string,
};

// Default prop values
Modal.defaultProps = {
  // By default, the modal is an okay modal
  type: Modal.TYPES.OKAY,
};

export default Modal;
