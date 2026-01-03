export const fetchPostalCodeInfo = async (code) => {
    const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${code}&country=TR&username=csystem`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        console.log(result);
        return result;
    }
    catch (e) {
        console.error(e.message);
        throw e;
    }
}