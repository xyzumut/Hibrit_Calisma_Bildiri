import styled from 'styled-components'

const HomepageLayout = styled.div`
    width:100vw;
    height:100vh;
    box-sizing:border-box;
`
const ContentLayout = styled.div`
    width:80%;
    height:100%;
    float:right;
    background-color:#6C757D;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
`
export{
    HomepageLayout,
    ContentLayout,
}