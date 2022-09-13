import React, { useEffect, useRef, useState } from "react";
import { LoginLayout, LoginForm, LoginFormLogo, LoginText} from "./Login.Style";
import FormInput from './Components/FormInput'
import FormSubmit from "./Components/FormSubmit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../Context/AuthContext";
import { loginRequest } from "../../Services/Services";
import {useNavigate } from "react-router-dom";
import { GetAlert } from "../../Components/AllComponents";

const Login = () => {
    console.log(sessionStorage.getItem('isLogin')==='true')
    const authStates = useAuth()
    const initalMessageState = {message:undefined,messageType:undefined}
    const [message,setMessage]=useState(initalMessageState)
    const navigate = useNavigate()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const _login = async() => {
        //inputlardaki değerler
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        //inputlardaki değerler
        let login_data = await loginRequest({username:username})
        if(login_data.message){
            setMessage({message:login_data.message,messageType:'error'})
            navigate('/')
        }
        else{
            let responseUsername = login_data[0].username
            let responsePassword = login_data[0].password
            if (responseUsername.toString()===username.toString() && responsePassword.toString()===password.toString()) {
                /* Login Başarılı ise bu blok çalışmalı */
                authStates.setUser({
                    id:login_data[0].id,
                    username:login_data[0].username,
                    password:login_data[0].password,
                    userType:login_data[0].userType,
                    profile_path:login_data[0].profile_path
                })
                sessionStorage.setItem('isLogin',true)
                authStates.setIsLogin(true)
            }
            else{
                setMessage({message:'Şifre Yalnış',
                messageType:'error'})
                navigate('/')
            }
        }
    }
    //0 pazar 6 cumartesi
    const date = new Date()
    const today = date.getDay()
    const hour = date.getHours()
    useEffect(()=>{
        if (today===5 && hour>17){
            const formData = new FormData()
            formData.append('op','delete')
            fetch('http://localhost/backendPHP/delete.php',{
                method:'POST',
                body:formData
            })
            .then(response => response.json())
            .then((data)=>{
                console.log(data)
            })
        }
    },[today,hour])
    return(
        <LoginLayout>
                <LoginForm>
                    <LoginFormLogo><FontAwesomeIcon icon={faUserCircle} /></LoginFormLogo>
                    <LoginText>Giriş Yapın</LoginText>
                    { message.message && <GetAlert message={message.message} messageType={message.messageType} onClose={()=>{
                        setMessage(initalMessageState)
                    }}/> }
                    <FormInput type= {'text'} name={'username'} ref={usernameRef}></FormInput>
                    <FormInput  type= {'password'} name={'password'} ref={passwordRef}></FormInput>
                    <FormSubmit type={'submit'} onClick={()=>{_login()}}>Giriş Yap</FormSubmit>
                </LoginForm>
        </LoginLayout>
    )
}
export default Login