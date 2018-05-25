const queryData = require('./data/test');

if (module.hot) {
  module.hot.accept()
}

import './app.scss'

document.body.classList.remove('loading');

const appEl = document.getElementById('app');

// append players button
const dataBtn = document.createElement("button")
dataBtn.textContent = 'Query Data'
appEl.appendChild(dataBtn)

// console.log players on click
dataBtn.onclick = () => {
  const responseTextEl = document.createElement('div')
  appEl.appendChild(responseTextEl)

  queryData(function(data){
    responseTextEl.innerHTML = '<pre>'+JSON.stringify(data, null, 2)+'</pre>';
    console.log('data:', data)
  })
}