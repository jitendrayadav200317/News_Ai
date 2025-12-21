import React from "react";
import { useSelector } from "react-redux";
import { Outlet , Navigate } from "react-router-dom";

function PreferencesProct(){

    const { preference} = useSelector((state)=>state.auth)
    if (preference.length > 0 && Array.isArray(preference)) {
        return <Navigate to='/Home' replace/>
    }

    return(
        <Outlet/>
    )
}
export default PreferencesProct;