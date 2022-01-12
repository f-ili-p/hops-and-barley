import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useObserver } from "mobx-react";

import { useBreweryStore } from "store/BreweryContext";

import styles from "./Header.module.scss";

const Header = () => {
    // initialize mobX store using custom hook
    const store = useBreweryStore();

    // initialize navigate, similar to useHistory
    const navigate = useNavigate();

    // redirect to home page
    const goToHomePage = () => {
        navigate("/");
    };

    return useObserver(() => (
        <header className={styles.header}>
            <div className={styles.logo} onClick={goToHomePage}>
                <img src="//logo.clearbit.com/412brews.com" alt="logo" />
                <h1>Hops & Barley</h1>
            </div>
            <Link to={"/favorites"}>
                FAVORITES
                {store.getFavoritesCount !== 0 && (
                    <div className={styles.count}>
                        {store.getFavoritesCount}
                    </div>
                )}
            </Link>
        </header>
    ));
};

export default Header;
