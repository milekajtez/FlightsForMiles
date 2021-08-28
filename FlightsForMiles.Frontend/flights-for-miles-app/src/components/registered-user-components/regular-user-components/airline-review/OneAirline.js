import React from "react";
import { useState } from "react";
import AirlineAddressMap from "./AirlineAddressMap";
//import AirlineChangeInfo from './AirlineChangeInfo'
import AirlineDescription from "./AirlineDescription";
import AirlineDestinations from "./AirlineDestinations";
import AirlineFlights from "./AirlineFlights";
import AirlinePricelist from "./AirlinePricelist";

function OneAirline(props) {
  const [addressMapIsOpen, setAddressMap] = useState(false);
  const [descriptionIsOpen, setDescription] = useState(false);
  const [pricelistIsOpen, setPricelist] = useState(false);
  const [destinationsIsOpen, setDestinations] = useState(false);
  const [flightsIsOpen, setFlights] = useState(false);

  function makeAddress() {
    return (
      props.airline.street +
      "," +
      props.airline.houseNumber +
      "," +
      props.airline.city
    );
  }

  function makeRating() {
    return props.airline.numberOfGrades === "0"
      ? 0
      : (parseFloat(props.airline.sumOfAllGrades) /
          parseFloat(props.airline.numberOfGrades)).toFixed(2);
  }

  return (
    <>
      <tr>
        <td>{props.airline.id}</td>
        <td>{props.airline.name}</td>
        <td onClick={() => setAddressMap(true)}>{makeAddress()}</td>
        <td>
          <button className="btn btn-info" onClick={() => setDescription(true)}>
            <i className="fas fa-info"></i> DESCRIPTION
          </button>
        </td>
        <td>
          <button className="btn btn-info" onClick={() => setPricelist(true)}>
            <i className="fas fa-list"></i> PRICELIST
          </button>
        </td>
        <td>
          <span style={{ color: "white" }}>
            <span className={`fa fa-star ${makeRating() >= 0.5 ? 'checked': ''}`}></span>
            <span className={`fa fa-star ${makeRating() >= 1.5 ? 'checked': ''}`}></span>
            <span className={`fa fa-star ${makeRating() >= 2.5 ? 'checked': ''}`}></span>
            <span className={`fa fa-star ${makeRating() >= 3.5 ? 'checked': ''}`}></span>
            <span className={`fa fa-star ${makeRating() >= 4.5 ? 'checked': ''}`}></span>
          </span>
          <br></br>
          {makeRating()}
        </td>
        <td>
          <button
            className="btn btn-info"
            onClick={() => setDestinations(true)}
          >
            <i className="fas fa-location-arrow"></i> DESTINATIONS
          </button>
        </td>
        <td>
          <button className="btn btn-info" onClick={() => setFlights(true)}>
            <i className="fas fa-plane"></i> FLIGHTS
          </button>
        </td>
        {/*<td>
                    <button className="btn btn-warning" onClick={() => setChangeInfo(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>
                </td>*/}
      </tr>
      <AirlineAddressMap
        addressMapIsOpen={addressMapIsOpen}
        setAddressMap={setAddressMap}
        address={
          props.airline.street +
          "," +
          props.airline.houseNumber +
          "," +
          props.airline.city
        }
      />
      <AirlineDescription
        descriptionIsOpen={descriptionIsOpen}
        setDescription={setDescription}
        description={props.airline.description}
      />
      <AirlinePricelist
        pricelistIsOpen={pricelistIsOpen}
        setPricelist={setPricelist}
        pricelist={props.airline.pricelist}
      />
      <AirlineDestinations
        destinationsIsOpen={destinationsIsOpen}
        setDestinations={setDestinations}
        airlineID={props.airline.id}
      />
      <AirlineFlights
        flightsIsOpen={flightsIsOpen}
        setFlights={setFlights}
        airlineID={props.airline.id}
      />
      {/*<AirlineChangeInfo changeInfoIsOpen={changeInfoIsOpen} setChangeInfo={setChangeInfo} 
                airline={props.airline}/>*/}
    </>
  );
}

export default OneAirline;
