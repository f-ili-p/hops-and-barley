import { makeAutoObservable, runInAction } from "mobx";
import API from "API";

const searchQuery = "/breweries/search?query=";

const brewerySearch = async (params) => {
    const { page, limit, query } = params;

    const resp = await API.get(
        `${searchQuery}${query}&per_page=${limit}&page=${page}`
    );

    return resp.data;
};

const BREWERY_LIST_STATUS = {
    INITIAL: "INITIAL",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
};

// create mobX state
export const createBreweryStore = () => {
    return makeAutoObservable({
        searchData: null,
        searchQuery: "",
        status: BREWERY_LIST_STATUS.INITIAL,
        errorMessage: "",
        favoritesBreweries: [],
        async getSearchData(params) {
            runInAction(() => {
                this.status = BREWERY_LIST_STATUS.LOADING;
            });

            try {
                const resp = await brewerySearch(params);

                runInAction(() => {
                    // check if search is null and return only fetched data
                    this.searchData =
                        this.searchData === null ||
                        this.searchQuery !== params.query
                            ? resp
                            : [...this.searchData, ...resp];
                    this.searchQuery = params.query;
                    this.status = BREWERY_LIST_STATUS.SUCCESS;
                });
            } catch (error) {
                this.errorMessage = error?.message;
                this.status = BREWERY_LIST_STATUS.ERROR;
            }
        },
        addToFavorites(id, name, brewery_type, city, state, country) {
            this.favoritesBreweries.push({
                id,
                name,
                brewery_type,
                city,
                state,
                country,
            });
        },
        removeFromFavorites(id) {
            // remove the brewery from the list using Array.filter method
            this.favoritesBreweries = this.favoritesBreweries.filter(
                (brewery) => brewery.id !== id
            );
        },
        // define a getter function to access it like a property
        get getFavoritesCount() {
            return this.favoritesBreweries.length;
        },
    });
};
