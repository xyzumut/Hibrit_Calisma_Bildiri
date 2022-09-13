import styled from "styled-components"

const ProfileLayout = styled.div`
    width:20%;
    height:100%;
    background-color:#467FD0;
    float:left;
    color:#F8F9FA;
`
const ProfilePicture = styled.div`
    position:relative;
    width:200px;
    height:200px;
    border-radius:100%;
    margin:20px auto;
    img{
        object-fit:contain;
        width:100%;
        height:100%;
        border-radius:100%;
        background-color:#343A40;
        padding:2px;
    }
    div{
        font-size:120px;
        position:absolute;
        text-align:center;
        left:50%;
        transform:translateX(-50%);
        width:100%;
        height:100%;
        border-radius:100%;
        background-color:black;
        opacity:0;
        color:white;
        transition:.5s all ease;
        cursor:pointer;
    }
    div:hover{
        opacity:.5;
    }
`
const DefaultImage = styled.span`
    background-color:white;
    border-radius:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:80px;
    color:#467FD0;
    width:100%;
    height:100%;
    text-transform: uppercase;
`

const ProfileContent = styled.div`
    width:100%;
    padding:5px 0 ;
`
const Username = styled.p`
    width:100%;
    padding:5px;
    font-size:22px;
    font-weight:700;
    text-align:center;
    position:relative;
`
const PasswordChangeContainer = styled.div`
    width:100%;
    height:50px;
    font-size:22px;
    font-weight:600;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    cursor:pointer;
    transition:1s all ease;
    color:#467FD0;
    background-color:#F8F9FA;
    border:5px solid #467FD0;
    &:hover{
        color:#F8F9FA;
        background-color:#467FD0;
    }
    &:after{
        content:'';
        height:1px;
        width:75%;
        background-color:#f8f9fa;
        position:absolute;
        bottom:0;
    }
`
const AdminContainer = styled.div`
    background-color:white;
    width:95%;
    height:40px;
    margin:30px auto;
    color:#467FD0;
    font-size:16px;
    font-weight:600;
    text-align:center;
    line-height:40px;
    cursor:pointer;
    transition:.5s all ease;
    border:1px solid #467FD0;
    &:hover{
        border:1px solid white;
        background-color:#467FD0;
        color:white;
    }
    &:active{
        filter:brightness(1.2);
    }
`
export{
    ProfileLayout,
    ProfilePicture,
    DefaultImage,
    ProfileContent,
    Username,
    PasswordChangeContainer,
    AdminContainer
}