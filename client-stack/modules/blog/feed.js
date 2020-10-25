import Plugster from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.3/es6/dist/plugster.min.js';
import ArticlesRepository from '../../repositories/articles.js';

class FeedPlugster extends Plugster {

    constructor(outlets) {
        super(outlets);
    }

    afterInit() {        
    }

    handleTopicSelection(data) {        
        let self = this;
        if(self.currentDbId && this.currentDbId == data.id) return;
        self.currentDbId = data.id;
        self._.articlesList.clear();
        let repo = new ArticlesRepository();
        repo.getDb(data.id).then(function(db) {
            db.sort((a, b) => (a.id > b.id) ? -1 : 1);
            db.forEach(item => {
                self.renderBlogEntry(data.id, item);
            });
        });
    }

    renderBlogEntry(dbId, item) {
        let self = this;        
        if(self._.articlesList.items && self._.articlesList.items[item.id]) return;
        let itemOutlets = self._.articlesList.buildListItem(0, item.id, item, {
            content: {}
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
