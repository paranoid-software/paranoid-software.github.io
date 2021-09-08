# A lot to cover

A long time has passed since our last blog entry, and now we have managed to release the 1.0.12 version of the library.

This release came along with a lot of work at documentation, testing, distribution strategy, and repositories refactoring.

## Independent library and sample's repositories

We decided to separate the library source code from the samples in order to give a little more formality to the original repo and to separate concerns and related work.

So now you will find the samples at [https://github.com/paranoid-software/plugster-samples](https://github.com/paranoid-software/plugster-samples), we hope we can add more samples soon.

## Testing

We manage to set up a very simple testing environment using [Jest](https://jestjs.io/) alonside [Babel](https://babeljs.io/).

We try to keep the environment as simple as possible, so we only add the strictly necessary in order to perform automated testing.

## Distribution file generation

Here we also try to keep things simple and using [npm](https://www.npmjs.com/) to set up and configure [rollup](https://rollupjs.org/) alongside with [terser](https://github.com/terser/terser) we manage to establish a very simple mechanism to generate our distribution files.

You can access to the 1.0.12 release at [https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.12/dist/plugster.min.js](https://cdn.jsdelivr.net/gh/paranoid-software/plugster@1.0.12/dist/plugster.min.js)
