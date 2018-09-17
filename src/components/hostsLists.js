import HostCollection from '../libs/HostCollection';
import host from './host';


export default ({ apps }) => {
  const hostCollection = HostCollection.createFromBatch(apps);

  const container = document.createElement('div');
  container.classList.add('Host-list');

  for (let hostName of hostCollection.hosts()) {
    container.appendChild(
      host({ name: hostName, apps: hostCollection.getTopAppsByHost(hostName) }),
    );
  }

  return container;
}
