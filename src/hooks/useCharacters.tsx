import { useState } from "react";
import { getCharacters } from "services/characters";

const useCharacters = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [characters, setCharacters] = useState<Character[]>([]);

	const fetchCharacters = async (limit?: number) => {
		if (isLoading) {
			return;
		}

		if (isError) {
			setIsError(false);
		}

		try {
			setIsLoading(true);
			setCharacters([]);
			const result = await getCharacters(limit);
			setCharacters(result);
		} catch (error) {
			setIsError(true);
		}

		setIsLoading(false);
	};

	return { fetchCharacters, isLoading, isError, characters };
};

export { useCharacters };
