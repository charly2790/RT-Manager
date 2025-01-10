import _ from 'lodash';
import { config } from '../config/config.js';
import { createClient } from "pexels"
import { redisClient } from "../config/database.js";
import { PEXELS } from '../helpers/Utils.js';


export const getImage = async (req, res) => {

    try {

        const { query, orientation } = req.query;
        let topic, totalResults, random, params = {};

        if (_.isNil(query)) return res.status(400).json({ message: "Missing fields" });

        params.per_page = 1;
        params.page = 1;
        params.query = query;

        topic = await redisClient.get(PEXELS.QUERY);

        if (topic && query === topic) {

            totalResults = await redisClient.get(PEXELS.TOTAL_RESULTS);

            if (totalResults) {
                random = _.random(1, totalResults);
                params.page = random;
            }
        } else {
            await redisClient.set(PEXELS.QUERY, query);
        }

        if (!_.isNil(orientation)) {
            params.orientation = orientation;
        }

        const client = createClient(config.pexelsAPIKey);

        const result = await client.photos.search({ ...params });

        const {
            photos,
            total_results
        } = result;

        const [ picture ] = photos;

        await redisClient.set(PEXELS.TOTAL_RESULTS, total_results);

        return res.status(200).json({ url: picture.src.original });

    } catch (error) {
        console.error(`Error al obtener key de redis:\n ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}