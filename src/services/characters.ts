import axios from "axios";

import { StarWarsServiceBaseUrl } from "constants/api";
import { getPlanet } from "services/planets";
import { sleep } from "utils/general";

/**
 * get planet id from urls like "https://swapi.dev/api/planets/29/"
 * @param url string
 */
const getPlanetIdFromUrl = (url: string): number => {
	return parseInt(url.split("/planets/")[1].slice(0, -1));
};

/**
 * because there is no link-mapper present it manually fetches batch of planets
 * for given characters and assigns them a homeworld
 * @param characters list of characters from the API
 * @returns list of characters with fetched homeworlds
 */
const fetchPlanetsForCharacters = async (characters: any[]): Promise<Character[]> => {
	const planetsToFetch: number[] = [];
	const planets: Planet[] = [];
	const result: Character[] = [];

	for (const character of characters) {
		const planetId = getPlanetIdFromUrl(character?.homeworld);

		if (!planetsToFetch.find((p) => p === planetId)) {
			planetsToFetch.push(planetId);
		}
	}

	let firstIteration = true;
	for (const planetId of planetsToFetch) {
		if (firstIteration) {
			firstIteration = false;
		} else {
			await sleep(200);
		}

		const planet = await getPlanet(planetId);
		planets.push({ id: getPlanetIdFromUrl(planet.url), name: planet.name });
	}

	for (const character of characters) {
		const homeworldId = getPlanetIdFromUrl(character.homeworld);
		const homeworld = planets.find((p) => p.id === homeworldId);
		result.push({ ...character, homeworld });
	}

	return result;
};

/**
 * @param limit maximum number of results
 * @returns collection of Star Wars characters
 */
const getCharacters = async (limit?: number): Promise<Character[]> => {
	let characters: Character[] = [];

	try {
		const { data } = await axios.get(`${StarWarsServiceBaseUrl}/people`);
		let result = [...data.results];

		let next = data.next;

		while (data.next && (limit ? result.length < limit : true)) {
			await sleep(200);
			const nextPage = await axios.get(next);

			next = nextPage.data.next;
			result = [...result, ...nextPage.data.results];
		}

		if (limit && result.length > limit) {
			result = result.slice(0, limit);
		}

		result = result.map(character =>( {...character, birthYear: character.birth_year}))
		characters = await fetchPlanetsForCharacters(result);
	} catch (error) {
		throw error;
	}

	return characters;
};

export { getCharacters };
