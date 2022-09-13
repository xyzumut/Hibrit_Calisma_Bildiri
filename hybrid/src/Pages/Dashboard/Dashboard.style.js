import styled from 'styled-components'
const DashboardContainer = styled.div`
    width:100%;
    height:100%;
    background-color:white;
    display:flex;
    justify-content:center;
    overflow:auto;
    padding:40px;
`
const DashboardTable = styled.table`
    display:block;
    th,td{
        border:1px solid black;
        width:100px;
        height:100px;
        text-align:center;
    }
    th{
        font-size:20px;
        height:50px;
    }
    td{
        height:100px;
    }
    tr:hover{
        background-color:gray;
        cursor:default;
    }
`
export{
    DashboardContainer,
    DashboardTable
}