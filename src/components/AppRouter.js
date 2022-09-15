import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {routes} from "../routes";
import List from './pages/list/List';

const AppRouter = () => {

    return (
        <Routes>
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path="*" element={<List/>} />
        </Routes>
    );
};

export default AppRouter;