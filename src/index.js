import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./admin/auth/auth";
import Main from "./admin/layout/main";
import MainLayout from "./admin/layout/main";
// import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>

            <MainLayout/>
            <Routes>
                <Route exact={true} path={"/"} element={<Auth />}/>
                <Route exact={true} path={"/admin"} element={<App/>}/>
            </Routes>

        </React.StrictMode>
    </BrowserRouter>
);
