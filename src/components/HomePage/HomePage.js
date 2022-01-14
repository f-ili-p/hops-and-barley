import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";

import Input from "UI/Input/Input";
import Spinner from "UI/Spinner/Spinner";
import PrimaryButton from "UI/PrimaryButton/PrimaryButton";
import BreweryList from "components/BreweryList/BreweryList";

import { useBreweryStore } from "store/BreweryContext";

import styles from "./HomePage.module.scss";

const LIMIT = 24;
const PAGE = 1;

const HomePage = () => {
    // initialize store
    const store = useBreweryStore();

    // initialize state
    const [localSearch, setLocalSearch] = useState(store.searchQuery);
    // number of breweries to return each page
    const [page, setPage] = useState(PAGE);
    const [limit] = useState(LIMIT);

    useEffect(() => {
        // fetch more breweries only of page changes
        if (page !== 1) {
            const params = {
                page,
                limit,
                query: localSearch,
            };

            fetchMore(params);
        }
    }, [page]);

    const fetchMore = async (params) => {
        await store.getSearchData(params);
    };

    const handleSearch = async (e) => {
        // prevent browser from refreshing the page when user clicks enter
        e.preventDefault();

        // set params for search query
        const params = {
            page,
            limit,
            query: localSearch,
        };

        await store.getSearchData(params);
    };

    const onSearchValue = (e) => {
        // set page to initial value if search input changes
        setPage(PAGE);
        setLocalSearch(e.target.value);
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    return useObserver(() => (
        <div className={styles.home_page}>
            <div className={styles.search_wrapper}>
                <form onSubmit={handleSearch}>
                    <Input
                        value={localSearch}
                        changed={onSearchValue}
                        placeholder="search"
                    />
                    <PrimaryButton
                        type="submit"
                        disabled={store.status === "LOADING"}
                    >
                        Search
                    </PrimaryButton>
                </form>
            </div>
            {store.status === "LOADING" && store?.searchData === null ? (
                <Spinner />
            ) : (
                <>
                    {store?.searchData?.length !== 0 && (
                        <BreweryList
                            breweryList={store?.searchData}
                            loadMore={loadMore}
                            disableBtn={
                                store?.searchData?.length < limit * page
                            }
                        />
                    )}
                    {store?.searchData?.length === 0 && (
                        <p>
                            Sorry there is no search for your query, Please try
                            again.
                        </p>
                    )}
                    {store.status === "ERROR" && store.errorMessage && (
                        <p>
                            Sorry something went wrong, Please try again later.
                        </p>
                    )}
                </>
            )}
        </div>
    ));
};

export default HomePage;
