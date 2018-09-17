import data from '../../data/host-app-data.json';
import HostCollection from '../HostCollection';
const host1 = { name: '12345.host1.com' };
const host2 = { name: '12345.host2.com' };
const app78 = { name: 'App78', apdex: 78, version: 1, contributors: [], host: [] };
const app90 = { name: 'App90', apdex: 90, version: 1, contributors: [], host: [] };

describe('getTopAppsByHost', () => {
  test('should get empty array, if no host', async () => {
    const hostCollection = new HostCollection();
    const nonexistentHost = 'some-weird-host';

    expect(hostCollection.getTopAppsByHost(nonexistentHost)).toEqual([]);
  });

  test('should get something app90 and ap78 in order', async () => {
    const app78WithHost = { ...app78, host: [host1.name] };
    const app90WithHost = { ...app90, host: [host1.name] };

    const hostCollection = HostCollection.createFromBatch([
      app78WithHost,
      app90WithHost,
    ]);

    expect(hostCollection.getTopAppsByHost(host1.name)).toEqual(
      [
        app90WithHost,
        app78WithHost
      ]
    );
  });
});

describe('addAppToHosts', () => {
  let hostCollection;
  beforeEach(async () => {
    hostCollection = new HostCollection();

  });

  test('should add app to host', async () => {
    hostCollection.addAppToHosts(host1.name, app90);

    expect(hostCollection.getTopAppsByHost(host1.name)).toEqual([app90]);
  });
});

describe('removeAppFromHosts', () => {
  let hostCollection;
  beforeEach(async () => {
    hostCollection = new HostCollection();

    hostCollection.addAppToHosts(host1.name, app90);
  });

  test('should remove app to host', async () => {
    hostCollection.removeAppFromHosts(host1.name, app90);

    expect(hostCollection.getTopAppsByHost(host1.name)).toEqual([]);
  });
});
