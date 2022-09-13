import React from "react";
import {SubmitButton} from '../Login.Style'


const FormSubmit = (props) => {


    return(
        <SubmitButton type={props.type ? props.type : 'submit'} onClick={props.onClick}>
            {props.children}
        </SubmitButton>
    )
}
export default FormSubmit