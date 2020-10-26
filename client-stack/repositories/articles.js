export default class ArticlesRepository {
    constructor() {        
    }

    getAll() {
        return $.get({
            url: `/db/articles.json`,
            cache: false
        });
    }

}
