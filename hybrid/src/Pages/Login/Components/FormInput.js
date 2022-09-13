import React, { forwardRef,  useState } from "react";
import { InputGroup, InputLogo, Input} from '../Login.Style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
const FormInput = forwardRef((props,ref) => {
    const [firstType , setFirstType]=useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [passwordLogoState,setPasswordLogoState]=useState(faEye)
    
    return(
        <InputGroup>
            <Input ref={ref} type={props.type ? props.type : 'text'} name={props.name}
            onClick={props.onClick}/>
            <InputLogo onClick={()=>{
                if(props.type==='password' || firstType==='password'){
                    setFirstType('password')
                    if(!showPassword){
                        ref.current.setAttribute('type','text');
                        setPasswordLogoState(faEyeSlash)
                    }
                    else{
                        ref.current.setAttribute('type','password');
                        setPasswordLogoState(faEye)
                    }
                    setShowPassword(!showPassword)
                }
                }} 
                type={props.type ? props.type : 'text'}>
                <FontAwesomeIcon icon={props.type ==='password' ? passwordLogoState : faUser } />
            </InputLogo>
        </InputGroup>
    )
})
export default FormInput