export interface Movie {
    id: number;
    poster_path: string | null;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}
