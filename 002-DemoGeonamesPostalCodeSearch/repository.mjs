import {createDbClient, createDevDbClient} from "./dbconfig.mjs";
import {DEV} from "./profiles.mjs";
let dbClient = process.argv.length === 3 && process.argv[2] === DEV ? await createDevDbClient() : await createDbClient();

const existsQuery = "select exists (select * from postal_codes where code = $1)";
const getPostalCodeInfoQuery = "select placeName, adminName1, lat, lng from postal_code_info where postal_code = $1";
const insertPostalCodesQuery = "insert into postal_codes (code) values ($1)";
const insertPostalCodeInfoQuery = "insert into postal_code_info (postal_code, adminCode2, adminCode1, adminName2, lng, lat, countryCode, adminName1, placeName) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
const insertPostalCodeQueryInfoQuery = "insert into postal_code_query_info postal_code = $1"


const insertCode = async (postalCode) => {
    await dbClient.query(insertPostalCodesQuery, [postalCode]);
}

const insertQueryInfo = async (postalCode) => {
    await dbClient.query(insertPostalCodeQueryInfoQuery, [postalCode]);
}

const insertCodeInfo = async (info) => {
    const values = [info.postalcode, info.adminCode2, info.adminCode1, info.adminName2, info.lng, info.lat, info.countryCode, info.adminName1, info.placeName];

    await dbClient.query(insertPostalCodeInfoQuery, values);
}

export const getPostalCodeInfo = async (postalCode) => {
    await insertQueryInfo(postalCode);
    return (await dbClient.query(getPostalCodeInfoQuery, [postalCode])).rows;
}

export const exists = async postalCode => {
    return (await dbClient.query(existsQuery, [postalCode])).rows[0].exists;
}

export const insertPostalCodeInfo = async (postalCode, infoList) => {
    try {
        await dbClient.query("begin")
        await insertCode(postalCode);

        for (const info of infoList)
            await insertCodeInfo(info);
        await dbClient.query("commit")
    } catch (e) {
        await dbClient.query("rollback");
        throw e;
    }
}
