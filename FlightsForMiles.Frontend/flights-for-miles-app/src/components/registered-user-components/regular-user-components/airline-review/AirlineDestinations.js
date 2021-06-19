import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadDestinationsForAirline } from '../../../../redux/avio-admin/destination/destinationAction'
import Modal from 'react-modal'

function AirlineDestinations(props) {
    const dispatch = useDispatch()

    const destinations = useSelector(
        state => state.destination,
    )

    useEffect(() => {
        dispatch(loadDestinationsForAirline(props.airlineID))
    }, [dispatch, props.airlineID])

    return (
        <Modal ariaHideApp={false} isOpen={props.destinationsIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setDestinations(!props.destinationsIsOpen)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="login-box" style={{ color: "white" }}>
                <h2>AIRLINE DESTINATIONS</h2>
                <table className="items-table" style={{boxShadow: '0 0 100px aqua'}}>
                    <thead>
                        <tr>
                            <th>Airport ID</th>
                            <th>Airport name</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            destinations.destinationsForAirline.map((destination => {
                                return (
                                    <tr key={destination.airportID}>
                                        <td>{destination.airportID}</td>
                                        <td>{destination.airportName}</td>
                                        <td>{destination.city}</td>
                                        <td>{destination.country}</td>
                                    </tr>
                                )
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </Modal>
    )
}

export default AirlineDestinations
