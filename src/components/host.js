function topFiveApps(apps) {
  const top = [];
  let K = 0;
  const N = apps.length;
  while (K < 5 && K < N) {
    top.push(apps[K]);
    K++;
  }

  return top;
}

function createHtml({ name, apps }) {
  return `
<article class="Host">
  <header class="Host-header">
    <p>${name}</p>
  </header>
  <div class="Host-appsContainer">
    <ul class="Host-appsList">${topFiveApps(apps)
        .map(
          app => `
        <li class="Host-app" data-version="${app.version}">
          <div class="Host-appDex"><p>${app.apdex}</p></div>
          <div class="Host-appName"><p>${app.name}</p></div>
        </li>`,
        )
        .join('')}
    </ul>
  </div>
</article> 
`;
}

export default function render(props) {
  const div = document.createElement('div');
  div.innerHTML = createHtml(props).trim();

  Array.from(div.querySelectorAll('.Host-app')).forEach(app =>
    app.addEventListener('click', () => alert(app.dataset.version)),
  );
  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
