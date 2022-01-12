import React from "react";

import Brewery from "UI/BreweryCard/BreweryCard";

import styles from "./BreweryList.module.scss";

const BreweryList = ({ breweryList, isFavorite }) => {
    return (
        <div className={styles.breweries_list}>
            {breweryList.map((brewery) => {
                return (
                    <Brewery
                        brewery={brewery}
                        key={brewery.id}
                        isFavorite={isFavorite}
                    />
                );
            })}
        </div>
    );
};

export default BreweryList;
