import Plugster from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.3/es6/dist/plugster.min.js';
import TopicsRepository from '../../repositories/topics.js';

class NavigationBarPlugster extends Plugster {

    constructor(outlets) {
        super(outlets);
    }

    afterInit() {
        let self = this;
        let repo = new TopicsRepository();
        repo.getAll().then(function(db) {
            db.forEach(item => {
                self.addItem(item);
            });
            self.notifyTopicSelection(db[0].id);
        });
    }

    addItem(item) {
        let self = this;
        let itemOutlets = self._.menu.buildListItem(0, item.id, item, {
            label: {}
        });
        itemOutlets.root.click(function() {
            let key = this.dataset['key'];
            self.notifyTopicSelection(key);
        });
        itemOutlets.label.text(item.name);
    }

    notifyTopicSelection(id) {
        this.dispatchEvent(this.topicSelected.name, {id: id})
    }

    topicSelected(data, callback) {
        this.registerEventSignature(this.topicSelected.name, data, callback);
    }

}

export default new NavigationBarPlugster({    
    menu: {}
});
