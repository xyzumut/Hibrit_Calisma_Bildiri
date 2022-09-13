import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faUser, faKey} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
const InputContainer = styled.div`
    margin:5px;
    padding:1px 4px;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid black;
    input{
        padding:1px;
        border:none;
        outline:none;
    }
`

const Input = forwardRef((props,ref) => {

    return(
        <InputContainer>
            <input type={'password'} defaultValue={''} placeholder={props.placeholder} ref={ref}/>
            <FontAwesomeIcon icon={props.type === 'password' ? faKey : props.type ==='username' ? faUser : faLock } />
        </InputContainer>
    )
})
export default Input