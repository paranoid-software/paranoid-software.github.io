import Plugster from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.4/es6/dist/plugster.min.js';
import ArticlesRepository from '../../repositories/articles.js';

class FeedPlugster extends Plugster {
    
    constructor(outlets) {
        super(outlets);
    }

    afterInit() {
    }

    handleTopicSelection(data) {        
        let self = this;
        if(self.currentTopicId && self.currentTopicId == data.id) return;
        self.currentTopicId = data.id;
        self._.articlesList.clear();
        let repo = new ArticlesRepository();
        repo.getAll(data.id).then(function(db) {
            db.sort((a, b) => (a.id > b.id) ? -1 : 1);
            db.forEach(item => {
                self.renderBlogEntry(data.id, item);
            });
        });
    }

    renderBlogEntry(dbId, item) {
        let self = this;        
        let itemOutlets = self._.articlesList.buildListItem(0, item.id, item, {
            content: {}
        }, function(key, data) {
            console.log([key, data]);
        });
        if(!itemOutlets) return null;
        itemOutlets.content.load(`/db/${dbId}/${item.fileName}`, function(content) {
            this.innerHTML = new showdown.Converter().makeHtml(content);
        });
    }

}

export default new FeedPlugster({    
    articlesList: {}
});
