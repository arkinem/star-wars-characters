import axios from "axios";

import { StarWarsServiceBaseUrl } from "constants/api";

const getPlanet = async (planetId: number): Promise<any> => {
	const { data } = await axios.get(`${StarWarsServiceBaseUrl}/planets/${planetId}`);
	return data;
};

export { getPlanet };
