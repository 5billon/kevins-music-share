export function renderShareMusic(element, tracksArray) {
  
  function updateFeedDisplay() {
    const feedContainer = document.querySelector('#live-feed');
    if (!feedContainer) return;

    if (tracksArray.length === 0) {
      feedContainer.innerHTML = 'No tracks shared yet.';
      return;
    }

    feedContainer.innerHTML = tracksArray.map(track => `
      <div>
        <div>${track.title}</div>
        <div>by ${track.artist}</div>
        <div>from ${track.album}</div>
        <div>${track.genre}</div>
      </div>
    `).join('');
  }

  element.innerHTML = `
    <h2>Share Your Favorite Music</h2>
    <form id="music-form">
      <div>
        <label for="song-title">Song Title</label>
        <input type="text" id="song-title" required />
      </div>
      
      <div>
        <label for="artist-name">Artist</label>
        <input type="text" id="artist-name" required />
      </div>

      <div>
        <label for="album-name">Album</label>
        <input type="text" id="album-name" required />
      </div>

      <div>
        <label for="genre-name">Genre</label>
        <input type="text" id="genre-name" required />
      </div>
      
      <button type="submit">Post Track</button>
    </form>
    
    <div id="status-message"></div>

    <h3>Recent Submissions</h3>
    <div id="live-feed"></div>
  `;

  updateFeedDisplay();

  const form = document.querySelector('#music-form');
  const statusMsg = document.querySelector('#status-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const newTrack = {
      title: document.querySelector('#song-title').value,
      artist: document.querySelector('#artist-name').value,
      album: document.querySelector('#album-name').value,
      genre: document.querySelector('#genre-name').value
    };

    tracksArray.push(newTrack);
    updateFeedDisplay();

    statusMsg.innerHTML = `✅ Added "${newTrack.title}"!`;
    form.reset();

    setTimeout(() => {
      if (statusMsg) statusMsg.innerHTML = '';
    }, 3000);
  });
}