import styled from 'styled-components'

const ChooseDaysLayout = styled.div`
    width:100%;
    height:100%;
    background-color:#467FD0;
    color:#343A40;
    display:flex;
`
const DayPickerGroup = styled.div`
    width:30%;
    height:100%;
    background-color:#467FD0;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
`
const DayPicker = styled.button`
    width:200px;
    height:70px;
    background-color:${props => !props.state ? '#DC3545' : '#5DEA7C'};
    color:${props => !props.state ? 'black' : 'white'};
    transition:.3s all ease;
    cursor:pointer;
    font-size:24px;
    font-weight:600;
    text-align:center;
    line-height:70px;
    border:none;
    &:hover{
        box-shadow:0 0 20px 3px white;
    }
    &:active{
        transform:translateY(3px);
    }
    &:disabled{
        opacity:.8;
        cursor:not-allowed;
        &:hover,&:active{
            background-color:${props => !props.state ? '#DC3545' : '#5DEA7C'};
            color:${props => !props.state ? 'black' : 'white'};
            box-shadow:none;
        }
    }
`
const ReportContainer = styled.div`
    width:70%;
    height:100%;
    background-color:white;
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    h1{
        color:#343A40;
    }
`

const SubmitDays = styled.button`
    background-color:#467FD0;
    border:none;
    outline:none;
    font-size:24px;
    padding:5px 125px;
    transition:.5s all ease;
    border:1px solid #467FD0;
    font-weight:600;
    cursor:pointer;
    &:hover{
        background-color:white;
        color:#467FD0;
        border-color:#467FD0;
    }
    &:active{
        background-color:#343A40;
    }
    &:disabled{
        opacity:.5;
        cursor:not-allowed;
        &:hover,&:active{
            background-color:#467FD0;
            color:#343A40;
        }
    }
`
const Table = styled.table`
    border:2px solid #343A40;
    text-align:center;
    *{
        border:1px solid #343A40;
        padding:10px 50px;
    }
    th{
        font-size:20px;
        font-weight:700;
    }
    td{
        font-size:16px;
        font-weight:600;
    }
    tr:hover{
        background-color:#467FD0;
        color:white;
    }
`
const TableContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    tr{
        cursor:default;
    }
`
export{
    ChooseDaysLayout,
    DayPickerGroup,
    DayPicker,
    ReportContainer,
    SubmitDays,
    TableContainer,
    Table,
}