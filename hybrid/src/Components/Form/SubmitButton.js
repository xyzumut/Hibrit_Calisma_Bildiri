import React from "react";
import styled from "styled-components";

const SubmitButtonStyle = styled.button`
    background-color:white;
    border:1px solid black;
    padding:2px 10px;
    font-weight:600;
    font-size:14px;
    cursor:pointer;
    &:hover{
        background-color:#343A40;
        color:#F8F9FA;
        border-color:#343A40;
    }
    &:active{
        background-color:#007BFF;
        border-color:#007BFF;
    }
`

const SubmitButton = (props) => {
    return <SubmitButtonStyle onClick={props.onClick}>{props.children}</SubmitButtonStyle>
}
export default SubmitButton