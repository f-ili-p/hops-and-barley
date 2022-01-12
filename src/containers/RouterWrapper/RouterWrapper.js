import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MAIN_URLS } from "utils/urlList";

import HomePage from "components/HomePage/HomePage";
// use lazy import for components
const Brewery = lazy(() => import("components/Brewery/Brewery"));
const Favorites = lazy(() => import("components/Favorites/Favorites"));

// alternative for Switch is Routes in react-router-dom v6+
const RouterWrapper = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route exact path={MAIN_URLS.HOME} element={<HomePage />} />
                <Route
                    exact
                    path={MAIN_URLS.SINGLE_BREWERY}
                    element={<Brewery />}
                />
                <Route
                    exact
                    path={MAIN_URLS.FAVORITES}
                    element={<Favorites />}
                />
            </Routes>
        </Suspense>
    );
};

export default RouterWrapper;
