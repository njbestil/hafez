import React from 'react';
import { createBrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "*", element: <NotFound/>},
]);

export default router;