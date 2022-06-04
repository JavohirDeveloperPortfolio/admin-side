import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
import {BrowserRouter} from "react-router-dom";
import Auth from "./admin/auth/Auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Auth/>
        </React.StrictMode>
    </BrowserRouter>
);
