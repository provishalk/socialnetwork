import React from 'react'
import MyNavBar from "../../components/NavBar/MyNavBar"
import AddPost from '../../components/Posts/AddPost/AddPost'
import "./Home.scss"
const Home = () => {
    return (
        <>
            <MyNavBar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto  p-2 font-weight-bold home__cards">
                        <h4>Home</h4>
                    </div>
                    <div className="col-md-8 m-auto  p-2 font-weight-bold home__cards">
                        <AddPost/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
