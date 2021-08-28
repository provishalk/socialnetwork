import React from 'react'
import {Route,Redirect} from "react-router-dom";
import { isLoggedIn } from '../utils/functions';
const SecuredRoute = (props) => {
    return (
        <Route path={props.path} render={data=>isLoggedIn()?(<props.component {...data}></props.component>):(<Redirect to="/" />)}/>
    )
}

export default SecuredRoute
