import { forwardRef } from "react";
import styled from "styled-components";

const SelectContainer = styled.select`
    width:100%;
    margin:5px;
    padding:2px 5px;
    border:1px solid black;
    &:hover{
        outline:none;
    }
`
const Select = forwardRef((props,ref) => {

    return(
        <SelectContainer ref={ref}>
            {
                props.items ? props.items.map((item,key)=>{return(
                    <option key={key} value={item.id}>Üye Tipi - {item.type}</option>
                )}) :
                <option>Veri Yok</option>
            }
        </SelectContainer>
    )
})
export default Select