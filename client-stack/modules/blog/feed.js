import ArticlesRepository from '../../repositories/articles.js';
import {Plugster} from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.12/dist/plugster.min.js';
import jsonpath from '../../deps/jsonpath.module.js';

class FeedPlugster extends Plugster {
    
    constructor(outlets) {
        super(outlets);
        window.hljs = window.hljs || undefined;
    }

    afterInit() {
        let self = this;
        let repo = new ArticlesRepository();
        repo.getAll().then(function(articles) {
            articles.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1).forEach(article => {
                self.renderBlogEntry(article);
            });
        });        
    }

    handleTopicSelection(topic) {   
        let self = this;
        if(self.currentTopicId && self.currentTopicId === topic.id) return;
        self.currentTopicId = topic.id;
        self._.articlesList.clear();
        let repo = new ArticlesRepository();
        repo.getAll().then(function(articles) {
            articles
            .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1)
            .filter(article => jsonpath.value(article, '$.topic') === topic.id)
            .forEach(article => {
                self.renderBlogEntry(article);
            });
        });
    }

    renderBlogEntry(item) {
        let self = this;        
        let itemOutlets = self._.articlesList.buildListItem(0, item.id, item, {
            content: {},
            authorLabel: {},
            dateLabel: {}
        });
        if(!itemOutlets) return null;
        itemOutlets.content.load(`/db/${jsonpath.value(item, '$.topic')}/${jsonpath.value(item, '$.fileName')}`, function(content) {
            this.innerHTML = new window.showdown.Converter().makeHtml(content);
            this.querySelectorAll('code').forEach(function(a) {
                window.hljs.highlightElement(a);
            });
        });        
        
        itemOutlets.authorLabel.text(jsonpath.value(item, '$.author'));
        itemOutlets.dateLabel.text(Date.parse(item.date).toString("MMMM dd, 2020 - HH:mm.ss"));
    }

}

let feedPlugster = await new FeedPlugster({
    articlesList: {}
}).init();

Plugster.plug(feedPlugster);
