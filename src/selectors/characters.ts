import { CharactersTableSortMode } from "constants/table";

const selectCharacters = (characters: Character[], sortMode?: CharactersTableSortMode): Character[] => {
	switch (true) {
		case sortMode === CharactersTableSortMode.NAME_ASC:
			return [...characters].sort((a, b) => {
				const aName = a.name?.toLocaleLowerCase();
				const bName = b.name?.toLocaleLowerCase();
				if (aName < bName) return -1;
				if (aName > bName) return 1;
				return 0;
			});
		case sortMode === CharactersTableSortMode.NAME_DSC:
			return [...characters].sort((a, b) => {
				const aName = a.name?.toLocaleLowerCase();
				const bName = b.name?.toLocaleLowerCase();
				if (aName < bName) return 1;
				if (aName > bName) return -1;
				return 0;
			});
		case sortMode === CharactersTableSortMode.FILM_COUNT_ASC:
			return [...characters].sort((a, b) => {
				const aCount = a.films.length;
				const bCount = b.films.length;
				if (aCount < bCount) return -1;
				if (aCount > bCount) return 1;
				return 0;
			});
		case sortMode === CharactersTableSortMode.FILM_COUNT_DSC:
			return [...characters].sort((a, b) => {
				const aCount = a.films.length;
				const bCount = b.films.length;
				if (aCount < bCount) return 1;
				if (aCount > bCount) return -1;
				return 0;
			});
		default:
			return characters;
	}
};

export { selectCharacters };
