export const fetchWikiSearchInfo = async (q) => {
    const BASE_URL = `http://api.geonames.org/wikipediaSearchJSON?&q=${q}&username=csystem`;

    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}