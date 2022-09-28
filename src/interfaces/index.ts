export interface Person {
	birth_year: number;
	death_year: number;
	name: string;
};


export interface Books {
	id: number;
	title: string;
	subjects?: string[];
	authors: Person[];
	translators: Person[];
	bookshelves: string[];
	languages: string[];
	copyright: boolean;
	media_type: string;
	formats: {
		"image/jpeg": string
	};
	download_count: number;
};

export interface Pages {
	count: number;
	next: string;
	previous: string;
	results: Books[];
};