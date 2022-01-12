import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react";

import { createBreweryStore } from "./breweryStore";

// create React context
const BreweryContext = createContext(null);

// create Context provider with mobX store
export const BreweryProvider = ({ children }) => {
    const breweryStore = useLocalObservable(() => createBreweryStore());

    return (
        <BreweryContext.Provider value={breweryStore}>
            {children}
        </BreweryContext.Provider>
    );
};

// create custom hook for getting data
export const useBreweryStore = () => useContext(BreweryContext);
