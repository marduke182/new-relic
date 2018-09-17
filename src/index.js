import hostsList from './components/hostsLists';
import toggleClassByCheckbox from './libs/toggleClassByCheckbox'
import './styles.scss';

async function startApp() {
  const data = await import(/* webpackChunkName: "host-app-data" */ './data/host-app-data');
  const hostContainer = document.getElementById('hosts');

  const hostsListDom = hostsList({ apps: data.default });
  hostContainer.appendChild(hostsListDom);

  // on show as list change add
  toggleClassByCheckbox(document.getElementById('show-as-list'), hostsListDom, 'is-list');
}

startApp()
  .catch(e => console.error(e));
