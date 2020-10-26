# Plugster new release

We are focusing this new release (1.0.4) on the eventing system.

Now you can subscribe to Plugster events directly from the view (HTML), just use the correct **data** attribute.

To subscribe to a plugster event we use the **data-on** attribute followed by the name of the plugster plus the name of the event we need to listen. Like in the following example we setup the **FeedPlugster** to handle the *topicSelected* event from the **NavigationBarPlugster** with the method *handleTopicSelection*.

```html
<div class="container"
    data-controller-name="FeedPlugster"
    data-on-navigationbarplugster-topicselected="handleTopicSelection">
    <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto" data-outlet-id="articlesList"
        data-child-templates='["client-stack/modules/blog/feed.list-item-template.html"]'>
        </div>
    </div>
</div>
```

Then on the controller code we can act upon the event dispatch by implementing the declared method.

```js
...

    handleTopicSelection(topic) {
        let self = this;
        if(self.currentTopicId && self.currentTopicId == topic.id) return;
        self.currentTopicId = topic.id;
        self._.articlesList.clear();
        let repo = new ArticlesRepository();
        repo.getAll().then(function(articles) {
            articles
            .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1)
            .filter(article => article.topic === topic.id)
            .forEach(article => {
                self.renderBlogEntry(article);
            });
        });
    }

...
```

A complete example of this system is this blog which code is hosted at our [paranoid-software.github.io](https://github.com/paranoid-software/paranoid-software.github.io) repository.
