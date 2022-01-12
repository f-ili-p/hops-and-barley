// create mobX state
export const createBreweryStore = () => {
    return {
        favoritesBreweries: [],
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
        get getFavoritesCount() {
            return this.favoritesBreweries.length;
        },
    };
};
