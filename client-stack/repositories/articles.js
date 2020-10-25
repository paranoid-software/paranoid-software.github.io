export default class ArticlesRepository {
    constructor() {        
    }

    getDb = function (name) {
        return $.get({
            url: `/db/${name}.json`,
            cache: false
        });
    }
}
