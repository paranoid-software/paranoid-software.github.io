import Plugster from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.4/es6/dist/plugster.min.js';
import TopicsRepository from '../../repositories/topics.js';

class NavigationBarPlugster extends Plugster {

    constructor(outlets) {
        super(outlets);
    }

    afterInit() {
        let self = this;
        let repo = new TopicsRepository();
        repo.getAll().then(function(topics) {
            topics.forEach(topic => {
                self.addTopic(topic);
            });            
        });
    }

    addTopic(topic) {
        let self = this;
        let itemOutlets = self._.menu.buildListItem(0, topic.id, topic, {
            label: {}
        }, function(key, jsonData) {
            self.notifyTopicSelection(key);
        });
        itemOutlets.label.text(topic.name);
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
