export default class ArticlesRepository {
    constructor() {        
    }

    getAll = function () {
        return $.get({
            url: `/db/articles.json`,
            cache: false
        });
    }

}
