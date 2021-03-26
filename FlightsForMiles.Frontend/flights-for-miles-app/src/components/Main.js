import React, { useEffect, useState } from 'react'
import StartPage from './start-page-components/StartPage';
import SystemAdmin from './system-admin-components/SystemAdmin'
import AvioAdmin from './avio-admin-components/AvioAdmin'
import RegularUser from './regular-user-components/RegularUser'
//import { ReactSession } from 'react-client-session'

function Main() {
    const [isLogged, setIsLogged] = useState(false);
    /*ReactSession.set("username", "Bob");
    console.log(ReactSession.get("username"))
    ReactSession.get("username"); */
    // kako je sad u localstorage-u tip..tako cu kasnije dodati JWT
    useEffect(() => {
        //console.log(localStorage.getItem("isLogged"))
        if(localStorage.getItem("isLogged") == null){
            setIsLogged(false)
        }else{
            setIsLogged(true)
        }
    }, [])

    if(isLogged){
        if(localStorage.getItem("isLogged") === "systemAdmin"){
            return (
                <SystemAdmin /> 
            )
        }
        else if(localStorage.getItem("isLogged") === "avioAdmin"){
            return (
                <AvioAdmin />
            )
        }
        else{
            return (
                <RegularUser />
            )
        }
    }
    else{
        return (
            <StartPage />
        )
    }
}

export default Main
