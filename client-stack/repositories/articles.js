export default class ArticlesRepository {
    constructor() {        
    }

    getAll = function (topic) {
        return $.get({
            url: `/db/${topic}.json`,
            cache: false
        });
    }
}
