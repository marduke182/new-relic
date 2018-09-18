import AVL from './AVL';

/**
 *
 * @typedef {Object} App
 * @property {string} name
 * @property {Array<string>} contributors
 * @property {number} version
 * @property {number} apdex
 * @property {Array<string>} host
 */

/**
 * @typedef {Object} Store
 * @property {Map<string, App>} apps
 * @property {number} apdex
 */

/**
 * We score the avl using apdex property
 * @param {Object} app
 * @property {number} app.apdex
 * @return {number}
 */
function score(app) {
  return app.apdex;
}

/**
 * We store an object with apps and apdex (We support multiple apps for same apdex)
 * @param {Store|App} store
 * @param {App|} app
 * @return {Store}
 */
function storeValue(store, app) {
  if (!app) {
    // If no store, create it. Store will be the app
    app = store;
    store = {
      apps: new Map(),
      apdex: app.apdex,
    };
  }

  store.apps.set(app.name, app);
  return store;
}

/**
 * @typedef {Object} HostCollection
 * @property {Map<AVL>} _hosts
 */
export default class HostCollection {
  constructor() {
    this._hosts = new Map();
  }

  /**
   * Iterate for each data en add the data to respective host O(N*M*log n) N= length data M=length host logn = insertion in avl
   * @param {Array<App>} batch
   */
  static createFromBatch(batch) {
    const hosts = new HostCollection();

    const N = batch.length;

    for (let i = 0; i < N; i++) {
      const app = batch[i];
      const { host: hostIds } = app;
      const M = hostIds.length;
      for (let j = 0; j < M; j++) {
        const hostId = hostIds[j];
        hosts.addAppToHosts(hostId, app);
      }
    }

    return hosts;
  }

  /**
   * Iterator to get all hosts
   * @return {IterableIterator<AVL>}
   */
  hosts() {
    return this._hosts.keys();
  }

  /**
   * Return 25 tops apps from a hostname.  O(log n)
   * @param hosts
   * @return {Array<App>}
   */
  getTopAppsByHost(hosts) {
    return this.getKTopAppsByHost(hosts, 25)
  }
  /**
   * Return a list of apps O(log N + K) = O(log n) (K is constant)
   * @param {string} host
   * @param {number} K
   * @return {Array<App>}
   */
  getKTopAppsByHost(host, K) {
    const hostApps = this._hosts.get(host);
    if (!hostApps) {
      return [];
    }

    let counter = 0;

    const top25Apps = [];
    const reverseIterable = hostApps.reverseInOrder();
    let { value: node, done} = reverseIterable.next();
    while(counter < K && !done) {
      // get all apps in current index
      const appsIterator = node.value.apps.values();
      let app = appsIterator.next();
      while (counter < K && !app.done) {
        top25Apps.push(app.value);
        counter++;
        app = appsIterator.next();
      }

      ({ value: node, done} = reverseIterable.next())
    }

    return top25Apps;
  }

  /**
   * Add an app to a host O(log n) = AVL big O
   * @param {string} host
   * @param {App} app
   */
  addAppToHosts(host, app) {
    let hostApps = this._hosts.get(host);
    if (!hostApps) {
      hostApps = new AVL(score, storeValue);
      this._hosts.set(host, hostApps);
    }

    return hostApps.insert(app);
  }

  /**
   * Remove a app from a host O(log n + log n) = O(log n)
   * @param {string} host
   * @param {App} app
   */
  removeAppFromHosts(host, app) {
    const hostApps = this._hosts.get(host);
    if (!hostApps) {
      return null;
    }

    // O(Log n) to get the value
    const node = hostApps.findNode(app.apdex);
    if (!node) {
      return null;
    }

    // If I have multiples apps in the index, remove from map first
    if (node.apps.size > 1) {
      return node.apps.delete(app.name);
    }

    // If only have one app store it in this index, remove apdex from tree, O(log n)
    return hostApps.delete(app);
  }

}
