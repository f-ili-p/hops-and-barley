import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Trash } from "assets/icons/trashcan.svg";

import { useBreweryStore } from "store/BreweryContext";

import breweryAlt from "assets/brawery-alt.jpg";

import styles from "./BreweryCard.module.scss";

// set isFavorite flag to false by default
const BreweryCard = ({ brewery, isFavorite = false }) => {
    // initialize mobX store using custom hook
    const store = useBreweryStore();

    const removeFromFavorites = () => {
        store.removeFromFavorites(brewery.id);
    };

    return (
        <div className={styles.brewery}>
            {isFavorite && (
                <div className={styles.remove} onClick={removeFromFavorites}>
                    <Trash />
                </div>
            )}
            <Link to={`/brewery/${brewery.id}`}>
                <div className={styles.content}>
                    <h3>{brewery.name}</h3>
                    <p>{brewery.brewery_type}</p>
                    <span>
                        {brewery.city}, {brewery.state}, {brewery.country}
                    </span>
                </div>
                <img src={brewery.logo || breweryAlt} alt={breweryAlt} />
            </Link>
        </div>
    );
};

export default BreweryCard;
