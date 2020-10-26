export default class TopicsRepository {
    constructor() {        
    }

    getAll() {
        return $.get({
            url: '/db/topics.json',
            cache: false
        });
    }
}
