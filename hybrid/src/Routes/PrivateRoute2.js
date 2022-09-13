import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
/* 
    PrivateRoute2 Ana sayfaya girilip girilemeyeceğine karar verir, eğer login
    işlemi gerçekleşmişse bu sayfanın görüntülenmesi SAĞLANIR bunun yerine login
    yapılmamışsa şuanlık '/login' url'ine yönlendirilir
*/
const PrivateRoute2 = (props) => {
    const authItems = useAuth()
    return(
        <>
            {
                authItems.isLogin===true ? props.children : <Navigate to={'/login'}/>
            }
        </>
    )
}
export default PrivateRoute2