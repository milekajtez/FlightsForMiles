import React, { useState } from 'react'
import AddDestination from './AddDestination'
import ChangeDestination from './ChangeDestination'

function AllDestinations() {
    const [addIsOpen, setAddIsOpen] = useState(false)
    const [changeIsOpen, setChangeIsOpen] = useState(false)

    const deleteDestination = (destinationID) => {
        if(window.confirm(`Are you sure to delete destination with id ${destinationID}?`)){
            console.log("Deleting....")
        }
    }

    return (
        <div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Airport ID</th>
                        <th>Airport name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Airline ID + name</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Name 1</td>
                        <td>City 1</td>
                        <td>Country 1</td>
                        <td>1 (Airline name 1)</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteDestination(1)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Name 2</td>
                        <td>City 2</td>
                        <td>Country 2</td>
                        <td>2 (Airline name 2)</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteDestination(2)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Name 3</td>
                        <td>City 3</td>
                        <td>Country 3</td>
                        <td>3 (Airline name 3)</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteDestination(3)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Name 4</td>
                        <td>City 4</td>
                        <td>Country 4</td>
                        <td>4 (Airline name 4)</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteDestination(4)}><i className="fas fa-trash-alt"></i> DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Name 5</td>
                        <td>City 5</td>
                        <td>Country 5</td>
                        <td>5 (Airline name 5)</td>
                        <td>
                            <button type="submit" className="btn btn-warning" onClick={() => setChangeIsOpen(true)}><i className="fas fa-pencil-alt"></i> CHANGE</button>&nbsp;
                            <button className="btn btn-danger" onClick={() => deleteDestination(5)}><i className="fas fa-trash-alt"></i> DELETE</button>
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
                    ADD NEW DESTINATION
                </button>
            </div>
            <AddDestination addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen} />
            <ChangeDestination changeIsOpen={changeIsOpen} setChangeIsOpen={setChangeIsOpen} />
        </div>
    )
}

export default AllDestinations
