import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const PrivateRoute3 = (props) => {
    const authItems = useAuth()
    return(
        <>
            {
                authItems.isLogin===true && authItems.user.userType.toString()==='1' ? props.children : <Navigate to={'/anasayfa'}/>
            }
        </>
    )
}
export default PrivateRoute3