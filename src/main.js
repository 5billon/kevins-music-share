import './style.css'
import { renderHomepage } from './Homepage.js'
import { renderShareMusic } from './ShareMusic.js' 
import { Signup } from './Signup.js'

const appDiv = document.querySelector('#app')
const sharedTracks = [];

let isLoggedIn = false;

function renderLayout() {
  appDiv.innerHTML = `
    <nav class="navbar">
      <div class="nav-links">
        <button id="home-tab" class="nav-btn active">Home</button>
        <button id="share-tab" class="nav-btn">Share Music</button>
      </div>
      <div class="auth-section">
        ${isLoggedIn ? '<button id="logout-btn">Logout</button>' : '<button id="signup-btn">Sign Up</button>'}
      </div>
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

  const signupBtn = document.querySelector('#signup-btn')
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
      Signup(contentDiv, () => {
        isLoggedIn = true;
        renderLayout();
      });
    })
  }

  const logoutBtn = document.querySelector('#logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      isLoggedIn = false;
      renderLayout();
    })
  }
}

function switchActiveTab(activeButton) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
  if (activeButton) activeButton.classList.add('active')
}

renderLayout()