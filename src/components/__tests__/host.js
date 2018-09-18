import hostComponent from '../host';

const createApp = (apdex) => ({ name: `App${apdex}`, apdex: apdex, version: 1, contributors: [], host: [] })

const host1 = { name: '12345.host1.com' };

function createIntArray(start, end) {
  const newArray = [];

  while (start < end) {
    newArray.push(start++);
  }

  return newArray;
}

function setup({ name = 'none', apps = []} = {}) {
  const dom = hostComponent({ name, apps });
  return {
    dom,
    get apps() {
      return dom.getElementsByClassName('Host-app');
    }
  }
}

test('should render correct structure', async () => { // Check if the layout didn't change
  const host = setup({ name: host1.name, apps: [createApp(90), createApp(78)]});

  expect(host.dom.innerHTML).toMatchSnapshot();
});

test('should render first 5 apps', async () => {
  const top25apps = createIntArray(76, 100).reverse().map(createApp);
  const host = setup({ name: host1.name, apps: top25apps});

  expect(host.apps.length).toBe(5);
});
