# Lifecycle and reorderable lists

The 1.0.14 release of Plugster is now out. The headline additions are a proper teardown path for plugsters and richer control over list-type outlets, plus a quiet performance fix when several plugsters on the same page share the same row template.

## Plugster.unplug — tearing down cleanly

Plugsters were never designed with an explicit lifecycle. They are created once at page load and live until the page is gone. That's fine for traditional pages, but in long-lived single-page applications, or when a region of the DOM is replaced and rebuilt, the lingering subscriptions and event handlers add up.

`Plugster.unplug(instanceOrName, options)` is the symmetric counterpart of `Plugster.plug`. It removes the instance from the registry and from the `window.plugsters` mirror, drops any queued events targeting it, clears every explicit and HTML-declared subscription where it is publisher or listener, and unbinds the jQuery handlers attached via `registerEventSignature`.

```javascript
// Tear down a plugster that responded to a route change.
Plugster.unplug(myEditor, { reason: 'route-change' });

// You can also pass the name as a string.
Plugster.unplug('MyEditor');
```

If the plugster needs to release resources of its own (timers, observers, etc.), define a `destroy()` method on the class and pass `{ destroy: true }`:

```javascript
class MyEditor extends Plugster {
    afterInit() {
        this.timer = setInterval(() => this.tick(), 1000);
    }
    destroy() {
        clearInterval(this.timer);
    }
}

Plugster.unplug(myEditor, { destroy: true, reason: 'navigation' });
```

The `reason` field is purely informational — it ends up in the console log entry that `unplug` writes, which helps when auditing teardowns in the browser devtools.

## List outlets you can reorder

`buildListItem` always accepted an `atIndex` argument, but the rest of the list outlet API ignored it: items were tracked in a plain dictionary with no notion of position. In 1.0.14 each item carries its current index, and inserting at a position shifts everything from that position onwards by one — what you would intuitively expect.

```javascript
self._.ratesList.buildListItem(0, 'eur', eurData, schema);              // index 0
self._.ratesList.buildListItem(0, 'usd', usdData, schema, 1);           // index 1, after eur
self._.ratesList.buildListItem(0, 'cop', copData, schema, 1);           // inserts at 1; usd shifts to 2
```

Two helpers were added on top:

- `listOutlet.getItemsAsArray()` returns the items as an array sorted by their current index. Use it when DOM order matters; `getItems()` returns a dictionary with no guaranteed iteration order.
- `listOutlet.moveItem(key, direction)` swaps the item with its neighbor at `currentIndex + direction`. The most common values are `+1` (move down) and `-1` (move up). DOM and the stored indices are updated together, so the next call to `getItemsAsArray()` reflects the new order.

```javascript
self._.ratesList.moveItem('cop', +1);   // swap cop with the next item

self._.ratesList.getItemsAsArray().forEach(item => {
    console.log(item.index, item.data);
});
```

## Child templates are now cached

Until 1.0.13, every plugster that declared a `data-child-templates` URL would issue its own HTTP request, even if a sibling on the same page had just fetched the exact same file. 1.0.14 introduces a small static cache on the loader: the first plugster fetches, the rest read the HTML from memory. Concurrent loaders of the same URL share the in-flight request, so even simultaneous initializations only hit the network once.

No opt-in is required. Pages that compose several plugsters from the same row template (a common pattern on dashboards) will see one network request instead of N.

## Where to grab it

```
https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.14/dist/plugster.min.js
```

The full readme — including the new "Plugster lifecycle" section and the expanded list outlet docs — lives at the [plugster repo](https://github.com/paranoid-software/plugster).
