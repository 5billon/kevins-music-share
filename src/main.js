import './style.css'
import { renderHomepage } from './Homepage.js'
import { renderShareMusic } from './ShareMusic.js' 

const appDiv = document.querySelector('#app')


const sharedTracks = [];

function renderLayout() {
  appDiv.innerHTML = `
    <nav class="navbar">
      <button id="home-tab" class="nav-btn active">Home</button>
      <button id="share-tab" class="nav-btn">Share Music</button>
    </nav>
    <div id="tab-content"></div>
  `

  const contentDiv = document.querySelector('#tab-content')
  renderHomepage(contentDiv)

  document.querySelector('#home-tab').addEventListener('click', (e) => {
    switchActiveTab(e.target)
    renderHomepage(contentDiv)
  })

  document.querySelector('#share-tab').addEventListener('click', (e) => {
    switchActiveTab(e.target)
    renderShareMusic(contentDiv, sharedTracks) 
  })
}

function switchActiveTab(activeButton) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
  activeButton.classList.add('active')
}

renderLayout()