import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useObserver } from "mobx-react";

import Spinner from "UI/Spinner/Spinner";
import PrimaryButton from "UI/PrimaryButton/PrimaryButton";

import API from "API";
import { useBreweryStore } from "store/BreweryContext";

import breweryLogo from "assets/single-brewery-alt.jpg";

import styles from "./Brewery.module.scss";

const Brewery = () => {
    // get the id from the URL using react-router-dom hook
    const { id } = useParams();

    // initialize state
    const [data, setData] = useState(null);
    const [spinner, setSpinner] = useState(true);
    const [isBreweryFavorite, setIsBreweryFavorite] = useState(null);

    // get mobX store using custom hook
    const store = useBreweryStore();

    // fetch the brewery when page is loaded
    useEffect(() => {
        fetchBrewery();
    }, []);

    const fetchBrewery = async () => {
        try {
            const resp = await API.get(`/breweries/${id}`);
            const { data } = resp;
            setData(data);
            // if the data is returned check if brewery is in the favorites list
            isBreweryInFavorites();
            setSpinner(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    const isBreweryInFavorites = () => {
        // find the brewery in mobX store
        const checkBrewery = store.favoritesBreweries.find(
            (brewery) => brewery.id === id
        );

        // set the flag into state if brewery is in the favorites list
        if (checkBrewery) {
            setIsBreweryFavorite(true);
        } else {
            setIsBreweryFavorite(false);
        }
    };

    const handleAddToFavorites = () => {
        // destructure object and get the values
        const { id, name, brewery_type, city, state, country } = data;

        // set the brewery into mobX state
        store.addToFavorites(id, name, brewery_type, city, state, country);

        // set local flag to true when brewery is in the favorites list
        setIsBreweryFavorite(true);
    };

    const handleRemoveFromFavorites = () => {
        // remove the brewery from the store
        store.removeFromFavorites(id);

        // set local flag to false when brewery is removed from favorites list
        setIsBreweryFavorite(false);
    };

    // console.log("data", data);

    return useObserver(() => (
        <>
            {spinner ? (
                <Spinner />
            ) : (
                <div className={styles.single_brewery}>
                    <img src={breweryLogo} alt="brewery logo" />
                    <div className={styles.content}>
                        <h1>{data?.name}</h1>
                        <div className={styles.content_line}>
                            <span>type:</span>
                            <p>{data?.brewery_type}</p>
                        </div>
                        <div className={styles.content_line}>
                            <span>street:</span>
                            <p>{data?.street}</p>
                        </div>
                        <div className={styles.content_line}>
                            <span>location:</span>
                            <p>
                                {data?.city}, {data?.state}, {data?.country}
                            </p>
                        </div>
                        <div className={styles.content_line}>
                            <span>phone:</span>
                            <p>{data?.phone}</p>
                        </div>
                        <div className={styles.content_line}>
                            <span>website:</span>
                            <p className={styles.link_to}>
                                {data?.website_url}
                            </p>
                        </div>
                        <p className={styles.link_to}>Open on Map</p>
                        <PrimaryButton
                            clicked={
                                isBreweryFavorite
                                    ? handleRemoveFromFavorites
                                    : handleAddToFavorites
                            }
                        >
                            {isBreweryFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"}
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </>
    ));
};

export default Brewery;
