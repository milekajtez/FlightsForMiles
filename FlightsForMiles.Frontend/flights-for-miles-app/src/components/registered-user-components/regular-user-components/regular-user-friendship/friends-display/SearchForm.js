import React from 'react'
import SearchedFriends from './SearchedFriends'

function SearchForm() {
    return (
        <>
            <div className="form-search" style={{display: 'inline-block', marginTop: '1%'}}>
                <h3 className="subtitle">SEARCH FRIEND</h3>
                <span className="input-container" style={{display: 'inline-block'}}>
                    <input id="username" className="input" type="text" placeholder=" " />
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </span>&nbsp;
                <span className="input-container" style={{display: 'inline-block'}}>
                    <input id="firstname" className="input" type="text" placeholder=" " />
                    <div className="cut"></div>
                    <label htmlFor="firstname" className="placeholder">First name</label>
                </span>&nbsp;
                <span className="input-container" style={{display: 'inline-block'}}>
                    <input id="lastname" className="input" type="text" placeholder=" " />
                    <div className="cut"></div>
                    <label htmlFor="lastname" className="placeholder">Last name</label>
                </span>&nbsp;
                <span style={{display: 'inline-block'}}>
                    <button type="text" className="submit">SEARCH</button>
                </span>
            </div>
            <SearchedFriends />
            <hr style={{backgroundColor: 'aqua', width: "80%"}}></hr>
        </>
    )
}

export default SearchForm
