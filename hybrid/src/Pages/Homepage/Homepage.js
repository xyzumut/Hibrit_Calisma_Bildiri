import React from "react";
import {Outlet} from 'react-router-dom'
import { Header } from "../../Components/AllComponents";
import { HomepageLayout, ContentLayout } from "./Homepage.style";
import Profile from "../../Components/Profile/Profile";

const Homepage = () => {
    return(
        <HomepageLayout>
            <Profile></Profile>
            <ContentLayout>
                <Header></Header>
                <Outlet></Outlet>
            </ContentLayout>
        </HomepageLayout>
    )
}
export default Homepage