import Plugster from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.3/es6/dist/plugster.min.js';
import PostsServices from '../../services/posts.js';

class BlogPlugster extends Plugster {

    constructor(outlets) {
        super(outlets);
    }

    afterInit() {
        let self = this;
        let svc = new PostsServices();
        svc.getDb('plugster').then(function(db) {
            db.forEach(item => {
                self.renderBlogEntry('plugster', item);
            });
        });
    }

    renderBlogEntry(db, item) {
        let self = this;
        let itemOutlets = self._.entryList.buildListItem(0, item.id, item, {
            content: {}
        });
        itemOutlets.content.load(`/posts/${db}/${item.fileName}`, function(content) {
            this.innerHTML = new showdown.Converter().makeHtml(content);
        });
    }

}

export default new BlogPlugster({    
    entryList: {}
});
