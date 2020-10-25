# Plugster new release

We are focusing this new release (1.0.6) on the eventing system.

Now you can subscribe to Plugster events directly from the view (HTML), just use the correct **data** attribute.

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
