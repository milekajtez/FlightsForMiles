import React from 'react'
import { useState } from 'react'
import AirlineAddressMap from './AirlineAddressMap'
import AirlineChangeInfo from './AirlineChangeInfo'
import AirlineDescription from './AirlineDescription'
import AirlineDestinations from './AirlineDestinations'
import AirlineFlights from './AirlineFlights'
import AirlinePricelist from './AirlinePricelist'

function OneAirline(props) {
    const [addressMapIsOpen, setAddressMap] = useState(false)
    const [descriptionIsOpen, setDescription] = useState(false)
    const [pricelistIsOpen, setPricelist] = useState(false)
    const [destinationsisOpen, setDestinations] = useState(false)
    const [flightsIsOpen, setFlights] = useState(false)
    const [changeInfoIsOpen, setChangeInfo] = useState(false)

    function makeAddress() {
        return props.airline.street + ',' + props.airline.houseNumber + ',' + props.airline.city
    }

    function makeRating() {
        return props.airline.numberOfGrades === "0" ? 0 : 
            parseFloat(props.airline.sumOfAllGrades) / parseFloat(props.airline.numberOfGrades)
    }

    return (
        <>
            <tr>
                <td>{props.airline.id}</td>
                <td>{props.airline.name}</td>
                <td>{makeAddress()}</td>
                <td>
                    <button className="btn btn-info"><i className="fas fa-info"></i> DESCRIPTION</button>
                </td>
                <td>
                    <button className="btn btn-info" onClick={() => setPricelist(true)}><i className="fas fa-list"></i> PRICELIST</button>
                </td>
                <td>{makeRating()}</td>
                <td>
                    <button className="btn btn-info"><i className="fas fa-location-arrow"></i> DESTINATIONS</button>
                </td>
                <td>
                    <button className="btn btn-info"><i className="fas fa-plane"></i> FLIGHTS</button>
                </td>
                <td>
                    <button className="btn btn-warning"><i className="fas fa-pencil-alt"></i> CHANGE</button>
                </td>
            </tr>
            <AirlineAddressMap addressMapIsOpen={addressMapIsOpen} setAddressMap={setAddressMap}/>
            <AirlineDescription descriptionIsOpen={descriptionIsOpen} setDescription={setDescription}/>
            <AirlinePricelist pricelistIsOpen={pricelistIsOpen} setPricelist={setPricelist} pricelist={props.airline.pricelist}/>
            <AirlineDestinations destinationsisOpen={destinationsisOpen} setDestinations={setDestinations}/>
            <AirlineFlights flightsIsOpen={flightsIsOpen} setFlights={setFlights}/>
            <AirlineChangeInfo changeInfoIsOpen={changeInfoIsOpen} setChangeInfo={setChangeInfo}/>
        </>
    )
}

export default OneAirline
