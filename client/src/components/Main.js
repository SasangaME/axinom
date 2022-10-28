import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Detail from './Detail';
import Home from './Home';

function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Detail />} />
        </Routes>
    )
}

export default Main