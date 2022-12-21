const dictionary = {
	"table.heading": "Characters",
	"table.header.name": "Name",
	"table.header.birthYear": "Year of Birth",
	"table.header.homeWorld": "Home world",
	"table.header.noOfFilms": "Film count",
	"table.error": "Something went wrong, please come back later.",
	"table.empty": "There are no characters to display.",
};

const t = (key: keyof typeof dictionary) => {
	return dictionary[key] || "";
};

export { t };
