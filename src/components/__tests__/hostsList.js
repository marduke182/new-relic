
jest.mock('../host');
import hostsLists from '../hostsLists';
import HostCollection from '../../libs/HostCollection';
import host from '../host';

const host1 = { name: '12345.host1.com' };
const host2 = { name: '12345.host2.com' };
const app78 = { name: 'App78', apdex: 78, version: 1, contributors: [], host: [] };
const app90 = { name: 'App90', apdex: 90, version: 1, contributors: [], host: [] };

// Mock host implementation to return an empty div dom element
host.mockImplementation(() => document.createElement('div'));

test('should return a dom with class Host-list', async () => {
  const hostListsDom = hostsLists({ apps: []});

  expect(hostListsDom.classList.contains('Host-list')).toBe(true);
});


test('should create host by the same number in apps', async () => {
  const hostCollectionWith2Hosts = new HostCollection();

  hostCollectionWith2Hosts.addAppToHosts(host1.name, app78);
  hostCollectionWith2Hosts.addAppToHosts(host2.name, app78);

  jest.spyOn(HostCollection, 'createFromBatch').mockImplementation(() => hostCollectionWith2Hosts);

  hostsLists({ apps: []});

  expect(host).toBeCalledWith({ name: host1.name, apps: [app78] });
  expect(host).toBeCalledWith({ name: host2.name, apps: [app78] });
});
