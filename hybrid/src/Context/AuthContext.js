import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext()
export const useAuth = () => useContext(Context)

const AuthProvider = (props) => {
    const[isLogin,setIsLogin]=useState((sessionStorage.getItem('isLogin') && sessionStorage.getItem('isLogin')==='true') ? true : false)
    const[user,setUser]=useState({
        id : sessionStorage.getItem('id') ? sessionStorage.getItem('id') : undefined,
        username : sessionStorage.getItem('username') ? sessionStorage.getItem('username') : undefined,
        password : sessionStorage.getItem('password') ? sessionStorage.getItem('password') : undefined,
        userType : sessionStorage.getItem('userType') ? sessionStorage.getItem('userType') : undefined,
        profile_path : sessionStorage.getItem('profile_path') ? sessionStorage.getItem('profile_path') : undefined
    })

    const authStates ={
        user, setUser,
        isLogin, setIsLogin,
    }

    useEffect(()=>{
        if (isLogin) {
            sessionStorage.setItem('id',user.id)
            sessionStorage.setItem('username',user.username)
            sessionStorage.setItem('password',user.password)
            sessionStorage.setItem('userType',user.userType)
            sessionStorage.setItem('profile_path',user.profile_path)
        }
    },[isLogin,user])
    return(
        <Context.Provider value={authStates}>
            {props.children}
        </Context.Provider>
    )
}
export default AuthProvider