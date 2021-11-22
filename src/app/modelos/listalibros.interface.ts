export interface LibroI 
        {
            title?: string;
            subtitle?: string;
            isbn13?: string;
            price?: string;
            image?: string;
            url?: string;
        }


export interface ListaLibrosI {
    error: string;
    total: string;
    page: string;
    books: LibroI[]
}