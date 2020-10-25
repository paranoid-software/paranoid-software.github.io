export default class TopicsRepository {
    constructor() {        
    }

    getAll = function () {
        return $.get({
            url: '/db/topics.json',
            cache: false
        });
    }
}
