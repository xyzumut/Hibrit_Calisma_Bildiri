import styled from 'styled-components'

const RestDaysContainer = styled.div`
    width:100%;
    height:100%;
    background-color:white;
    overflow:auto;
    display:flex;
    flex-direction:column;
    justify-content:${props => props.locate ? 'center' : 'flex-start'};
    padding:30px;
`
export{
    RestDaysContainer,
}