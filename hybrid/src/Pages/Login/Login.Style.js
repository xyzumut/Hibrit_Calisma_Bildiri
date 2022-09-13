import styled from 'styled-components';

const LoginLayout = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content : center;
    align-items:center;
    border:1px solid black ;
    background-image: linear-gradient(to top left, #5387d5, #1c3474);
`
const LoginForm = styled.div`
    position:relative;
    width:350px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:0 30px 30px 30px;
    box-sizing:content-box;
    border:1px solid white;
    border-radius:5px;
    &>*{
        margin-top:10px;
    }
    background-color:#467fd0;
`
const LoginFormLogo = styled.div`
    position:absolute;
    top:0;
    transform:translateY(-50%);
    *{
        font-size:100px;
        color:white;
        margin:0px 0 30px 0;
        background-color:#467fd0;
        border-radius:100%;
    }
    opacity:1;
`
const LoginText = styled.div`
    font-size:20px;
    font-weight:600;
    color:white;
    position:relative;
    margin:70px 0 30px 0 ;
    &:before,&:after{
        content:'';
        display:block;
        height:1px;
        background-color:white;
        position:absolute;
        top:50%;
        transform:translateY(50%);
        animation : pipeAnimation 3s infinite;
    }
    &:before{
        right:110%;
    }
    &:after{
        left:110%;
    }
`
const InputGroup = styled.div`
    width:100%;
    height:40px;
    display:flex;
    border:2px solid white;
    font-size:16px;
`
const InputLogo = styled.div`
    width:15%;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:1s all ease;
    *{
        font-size:25px;
    }
    cursor : ${props=>props.type === 'password'? 'pointer' : ''};
    background-color:inherit;
    color:white;
`
const Input = styled.input`
    width:85%;
    height:100%;
    border:none;
    padding:5px;
    background-color:inherit;
    &:focus-visible{
        outline:none;
    }
    color:white;
`

const SubmitButton = styled.button`
    width:80%;
    padding:5px 30px;
    border:1px solid white ;
    font-size:20px;
    background-color:white;
    color:#467fd0;
    transition:.5s all ease;
    cursor:pointer;
    &:hover{
        background-color:#467fd0;
        color:white; 
    }
    &:active{
        filter: brightness(1.5);
    }
`
export{
    LoginLayout,
        LoginForm,
            LoginText,
            LoginFormLogo,
            InputGroup,
                Input,
                InputLogo,
            SubmitButton,
}