import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {App} from '../pages/login/App.jsx'
import {Login} from "../pages/login/Login.jsx";
import {Signup} from "../pages/login/Signup.jsx";

const Private = ({ Item }) => {
    const signed = false;
    return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/todo" element={<Private Item={App} />} />
                    <Route path="/" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route path="*" element={<Login/>} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;