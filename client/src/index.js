import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import "./fonts.css"

import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Rating from './pages/Rating';
import Home from './pages/Home';
import Details from './pages/Details';
import Title from './pages/Title';

const router  = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Title />
            },
            {
                path: "rating",
                element: <Rating />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "details/:id",
                element: <Details />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
    // <App />
);

