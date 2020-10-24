export default class PostsServices {
    constructor() {        
    }

    getDb = function (name) {
        return $.get(`/posts/${name}.json`);
    }
}
