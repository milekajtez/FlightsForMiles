import React, { useState } from 'react'
import AddFlight from './AddFlight'
import ChangeFlight from './ChangeFlight'
import FlightMoreInfo from './FlightMoreInfo'

function AllFlights() {
    const [moreInfoIsOpen, setMoreInfoIsOpen] = useState(false)
    const [addIsOpen, setAddIsOpen] = useState(false)
    const [changeIsOpen, setChangeIsOpen] = useState(false)

    const deleteFlight = (flightID) => {
        if(window.confirm(`Are you sure to delete flight with id ${flightID}?`)){
            console.log("Deleting....")
        }
    }
    
    return (
        <div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Flight ID</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Start location</th>
                        <th>End location</th>
                        <th>Airline ID + name</th>
                        <th>More info</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>test1</td>
                        <td>
                            <button className="btn btn-info" onClick={() => setMoreInfoIsOpen(true)}><i className="fas fa-info"></i> MORE INFO</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteFlight(1)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>test2</td>
                        <td>
                            <button className="btn btn-info" onClick={() => setMoreInfoIsOpen(true)}><i className="fas fa-info"></i> MORE INFO</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteFlight(2)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>test3</td>
                        <td>
                            <button className="btn btn-info" onClick={() => setMoreInfoIsOpen(true)}><i className="fas fa-info"></i> MORE INFO</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteFlight(3)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>test4</td>
                        <td>
                            <button className="btn btn-info" onClick={() => setMoreInfoIsOpen(true)}><i className="fas fa-info"></i> MORE INFO</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteFlight(4)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>test5</td>
                        <td>
                            <button className="btn btn-info" onClick={() => setMoreInfoIsOpen(true)}><i className="fas fa-info"></i> MORE INFO</button>
                        </td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteFlight(5)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="box">
                <button type="submit" style={{ backgroundColor: "#141e30" }} onClick={() => setAddIsOpen(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    ADD NEW FLIGHT
                </button>
            </div>
            <AddFlight addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen}/>
            <ChangeFlight changeIsOpen={changeIsOpen} setChangeIsOpen={setChangeIsOpen} />
            <FlightMoreInfo moreInfoIsOpen={moreInfoIsOpen} setMoreInfoIsOpen={setMoreInfoIsOpen} />
        </div>
    )
}

export default AllFlights
