import React, { useState } from "react";

import Input from "UI/Input/Input";
import Spinner from "UI/Spinner/Spinner";
import PrimaryButton from "UI/PrimaryButton/PrimaryButton";
import BreweryList from "components/BreweryList/BreweryList";
import API from "API";

import styles from "./HomePage.module.scss";

const HomePage = () => {
    // initialize state
    const [searchValue, setSearchValue] = useState("");
    const [breweriesList, setBreweriesList] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [spinner, setSpinner] = useState(false);

    const handleSearch = async (e) => {
        // prevent browser from refreshing the page when user clicks enter
        e.preventDefault();

        // set loader while waiting data from BE
        setSpinner(true);

        try {
            const resp = await API.get(
                `/breweries/search?query=${searchValue}`
            );
            const { data } = resp;
            // set data into state
            setBreweriesList(data);
            setSpinner(false); // stop loader
            console.log("resp", resp);
        } catch (error) {
            console.log("error", error);
            // if error appears set it into state and show some fallback text
            setErrorMessage(error);
            setSpinner(false); // stop loader
        }
    };

    return (
        <div className={styles.home_page}>
            <div className={styles.search_wrapper}>
                <form onSubmit={handleSearch}>
                    <Input
                        value={searchValue}
                        changed={(e) => setSearchValue(e.target.value)}
                        placeholder="search"
                    />
                    <PrimaryButton type="submit">Search</PrimaryButton>
                </form>
            </div>
            {spinner ? (
                <Spinner />
            ) : (
                <>
                    {breweriesList && breweriesList?.length !== 0 && (
                        <BreweryList breweryList={breweriesList} />
                    )}
                    {breweriesList && breweriesList?.length === 0 && (
                        <p>
                            Sorry there is no search for your query, Please try
                            again.
                        </p>
                    )}
                    {errorMessage && (
                        <p>
                            Sorry something went wrong, Please try again later.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
