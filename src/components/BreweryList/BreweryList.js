import React from "react";

import Brewery from "UI/BreweryCard/BreweryCard";
import PrimaryButton from "UI/PrimaryButton/PrimaryButton";

import styles from "./BreweryList.module.scss";

const BreweryList = ({ breweryList, loadMore, disableBtn, isFavorite }) => {
    return (
        <>
            <div className={styles.breweries_list}>
                {breweryList?.map((brewery) => {
                    return (
                        <Brewery
                            brewery={brewery}
                            key={brewery.id}
                            isFavorite={isFavorite}
                        />
                    );
                })}
            </div>
            {breweryList && !isFavorite && (
                <PrimaryButton
                    clicked={loadMore}
                    className={styles.btn}
                    disabled={disableBtn}
                >
                    Load more
                </PrimaryButton>
            )}
        </>
    );
};

export default BreweryList;
