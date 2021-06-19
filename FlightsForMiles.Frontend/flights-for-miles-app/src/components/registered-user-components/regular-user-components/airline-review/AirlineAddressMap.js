import React from 'react'
import Modal from 'react-modal'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { geolocated } from 'react-geolocated'
import { useEffect } from 'react'
import { useState } from 'react'

function AirlineAddressMap(props) {
    const [langitude, setLangitude] = useState(0)
    const [latitude, setLatitude] = useState(0)

    useEffect(() => {
        addressLookup()
    })

    const addressLookup = () => {
        var splited = props.address.split(",", 3);
        var street = splited[0].replace(' ', '%20');
        var houseNumber = splited[1].replace(' ', '%20');
        var city = splited[2].replace(' ', '%20');

        var location = 'street=' + houseNumber + '+' + street + '&city=' + city;
        var search = 'http://nominatim.openstreetmap.org/search?format=json&' + location;
        fetch(search, { responseType: 'text' })
        .then(response => response.json())
        .then(data => {
            setLangitude(data[0].lon)
            setLatitude(data[0].lat)
            /*console.log(data[0])
            console.log(data[0].lon)
            console.log(data[0].lat)*/
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <Modal ariaHideApp={false} isOpen={props.addressMapIsOpen} closeTimeoutMS={500}
            className="new-member-inner-reg" onRequestClose={() => props.setAddressMap(!props.addressMapIsOpen)}
            style={{
                overlay: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: "blur(8px)"
                }
            }}>
            <div className="reg-box" style={{ color: "white" }}>
                <h2>AIRLINE ADDRESS MAP</h2>
                <MapContainer center={[latitude, langitude]} zoom={12}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'>
                    </TileLayer>
                    <Marker position={[latitude, langitude]}>
                        <Popup>{props.address}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </Modal>
    )
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 10000
})(AirlineAddressMap)