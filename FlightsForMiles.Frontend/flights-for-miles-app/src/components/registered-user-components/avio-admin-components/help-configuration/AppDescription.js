import React, { useState } from 'react'
import ChangeDescription from './ChangeDescription'

function AppDescription() {
    const [changeDescriptionIsOpen, setChangeDescriptionIsOpen] = useState(false)

    return (
        <div style={{ color: "#fff", marginLeft: "5%", marginTop: "1%", marginRight: "5%"}}>
            <h3>APPLICATION DESCRIPTION</h3>
            <br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
            of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
            <div className="box">
                <button type="submit" style={{ backgroundColor: "#141e30", textAlign: 'center' }} onClick={() => setChangeDescriptionIsOpen(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Change app description
                </button>
            </div>
            <ChangeDescription changeDescriptionIsOpen={changeDescriptionIsOpen} setChangeDescriptionIsOpen={setChangeDescriptionIsOpen}/>
        </div>
    )
}

export default AppDescription
