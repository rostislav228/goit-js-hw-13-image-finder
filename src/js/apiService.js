const API_KEY = '19045968-692e1124089d7d7c1e82b7642'

export default class NewsApiService {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }

    fetchArticles() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}&min_width=400`)
        .then(r => r.json())
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}