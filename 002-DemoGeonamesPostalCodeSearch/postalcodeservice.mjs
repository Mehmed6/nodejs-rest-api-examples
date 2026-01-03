import {exists, getPostalCodeInfo, insertPostalCodeInfo} from "./repository.mjs";
import {fetchPostalCodeInfo} from "./geonamesPostalCodeSearch.mjs";

export const getPostalCode = async code => {
    let letPostalCodes = await getPostalCodeInfo(code);

    if (await exists(code)) {
        return {myPostalCodes: letPostalCodes};
    }

    letPostalCodes = await fetchPostalCodeInfo(code);

    if (letPostalCodes.postalcodes !== undefined) {
        await insertPostalCodeInfo(code, letPostalCodes.postalcodes);
        return {myPostalCodes: await getPostalCodeInfo(code)};
    }
}