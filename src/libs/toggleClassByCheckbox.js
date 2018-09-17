export default (checkbox, container, className) => {
  if (!checkbox || !container || !className) {
    return;
  }

  checkbox.addEventListener('click', e => {
    if (e.target.checked) {
      container.classList.add(className);
    } else {
      container.classList.remove(className);
    }
  });
}
