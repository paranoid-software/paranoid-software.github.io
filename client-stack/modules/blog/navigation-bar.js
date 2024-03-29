import TopicsRepository from '../../repositories/topics.js';
import {Plugster} from 'https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.12/dist/plugster.min.js';

class NavigationBarPlugster extends Plugster {

    constructor(outlets) {
        super(outlets);
    }

    afterInit() {
        let self = this;
        let repo = new TopicsRepository();
        repo.getAll().then(function(topics) {
            topics.sort((a, b) => (a.order < b.order) ? -1 : 1).forEach(topic => {
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

let navigationBarPlugster = await new NavigationBarPlugster({
    menu: {}
}).init();

Plugster.plug(navigationBarPlugster);
