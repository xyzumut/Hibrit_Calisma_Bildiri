import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/AuthContext";
const HeaderContainer = styled.header`
    width:100%;
    height:5hv;
    background-color:#467FD0;
    a{
        transition:.5s all ease;
        font-size:30px;
        margin:0 5px;
        color:white;
    }
    a:hover{
        color:#343A40;
    }
    display:flex;
    justify-content:space-around;
    align-items:center;
`   

const Header = () => {
    const {user} = useAuth()
    console.log()
    return(
        <HeaderContainer>
            <NavLink to={''}>Gün Seç</NavLink>
            <NavLink to={'tatilgunleri'}>Tatil Günleri</NavLink>
            {user.userType.toString()==='1'  && <NavLink to={'dashboard'}>Rapor</NavLink>}
            <a href="/" onClick={()=>{
                sessionStorage.clear()
            }}>Çıkış Yap</a>
        </HeaderContainer>
    )
}
export default Header