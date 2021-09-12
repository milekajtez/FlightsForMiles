import React from "react";
import Modal from "react-modal";

function FlightMoreInfo(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.flightInfoIsOpen}
      closeTimeoutMS={500}
      className="new-member-inner-reg"
      onRequestClose={() => props.setFlightInfo(!props.flightInfoIsOpen)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <div
        className="reg-box"
        style={{ color: "white", backgroundColor: "#202932" }}
      >
        <h2>FLIGHT MORE INFO</h2>
        <div style={{ textAlign: "center" }}>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: '25px' }}>Flight time (hours)</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.flightTime}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: '25px' }}>Flight length (km)</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.flightLengthKM}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white" }}>Number of transfers</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.numberOfTransfers}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: '25px' }}>All transfers</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.allTransfers}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: '25px' }}>Plane name</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.planeName}</p>
          </span>
          <span className="user-box" style={{ display: "inline-block" }}>
            <h5 style={{ color: "white", fontSize: '25px' }}>Lugage weight (kg)</h5>
            <p style={{fontSize: '20px'}}>{props.currentFlight.lugageWeight}</p>
          </span>
          <div>
            <span className="user-box" style={{ display: "inline-block" }}>
              <h5 style={{ color: "white", fontSize: '25px' }}>Additional informations</h5>
              <p style={{fontSize: '20px'}}>{props.currentFlight.additionalInformation}</p>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FlightMoreInfo;

/*
*
<div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Left Sidebar</h4>
                </div>

                <div class="modal-body">
                    <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </p>
                </div>

            </div><!-- modal-content -->
        </div><!-- modal-dialog -->
    </div><!-- modal --> */
