/* JSON에서 데이터 가져오기 */
function loadItems() {
  return fetch("data/data.json")
    .then(res => res.json())
    .then(json => json.items);
}

/* 가져온 데이터 list에 넣기 */
function displayItems(items) {
  const data = document.querySelector('.items');
  data.innerHTML = items.map(item => transformHTML(item)).join('');
}

/* 데이터를 HTML로 변환 */
function transformHTML(items) {
  return `
  <li class="item">
      <img src="${items.image}" alt="${items.type}" class ="thumbnail">
      <span class="itemDescription">${items.gender}, ${items.size}</span>
  </li>
  `;
}

/* 버튼 클릭시 필터링 */
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

/* 버튼 이벤트 추가 */
function setEventListerners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListerners(items);
  })
  .catch(console.log);