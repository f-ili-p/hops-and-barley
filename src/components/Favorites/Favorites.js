import React from "react";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";

import BreweryList from "components/BreweryList/BreweryList";
import PrimaryButton from "UI/PrimaryButton/PrimaryButton";

import { useBreweryStore } from "store/BreweryContext";

import styles from "./Favorites.module.scss";

const Favorites = () => {
    // initialize mobX store using custom hook
    const store = useBreweryStore();

    // initialize navigate, similar to useHistory
    const navigate = useNavigate();

    // redirect to home page
    const goToHomepage = () => {
        navigate("/");
    };

    return useObserver(() => (
        <div className={styles.favorites}>
            <h1>Your favorites breweries</h1>
            {store.favoritesBreweries.length !== 0 ? (
                <BreweryList
                    breweryList={store.favoritesBreweries}
                    isFavorite
                />
            ) : (
                <>
                    <p>Sorry you don't have any breweries in favorites list</p>
                    <PrimaryButton
                        clicked={goToHomepage}
                        className={styles.btn}
                    >
                        HOMEPAGE
                    </PrimaryButton>
                </>
            )}
        </div>
    ));
};

export default Favorites;
