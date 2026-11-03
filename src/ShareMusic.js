export function renderShareMusic(element, tracksArray) {

    function spotifyLink(url) {
        const match = url.match(/track\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    function updateFeedDisplay() {
    const feedContainer = document.querySelector('#live-feed');
    if (!feedContainer) return;

    if (tracksArray.length === 0) {
        feedContainer.innerHTML = 'No tracks shared yet.';
        return;
    }

    feedContainer.innerHTML = tracksArray.map(track => {
        const spotifyId = track.spotifyUrl ? spotifyLink(track.spotifyUrl) : null;

        return `
          <div>
            <div>${track.title}</div>
            <div>by ${track.artist}</div>
            <div>from ${track.album}</div>
            <div>${track.genre}</div>
            ${spotifyId ? `
              <div>
                <iframe 
                  src="https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowfullscreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
                </iframe>
              </div>
            ` : ''}
          </div>
        `;
    }).join('');
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

      <div>
        <label for="spotify-link">Spotify Track Link</label>
        <input type="url" id="spotify-link" required />
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
            genre: document.querySelector('#genre-name').value,
            spotifyUrl: document.querySelector('#spotify-link') ? document.querySelector('#spotify-link').value : null
        };

        tracksArray.push(newTrack);
        updateFeedDisplay();

        statusMsg.innerHTML = ` Added Track Successfully "${newTrack.title}"!`;
        form.reset();

        setTimeout(() => {
            if (statusMsg) statusMsg.innerHTML = '';
        }, 3000);
    });
}