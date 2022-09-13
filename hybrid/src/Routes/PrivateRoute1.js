import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
/* 
    PrivateRoute1 Giriş sayfasına girilip girilemeyeceğine karar verir, eğer login
    işlemi gerçekleşmişse bu sayfanın görüntülenmesi engellenir bunun yerine login
    yapıldığı için şuanlık /anasayfa url'ine yönlendirilir
*/
const PrivateRoute1 = (props) => {
    const authItems = useAuth()
    return(
        <>
            {
                authItems.isLogin===false ? props.children : <Navigate to={'/anasayfa'}/>
            }
        </>
    )
}
export default PrivateRoute1