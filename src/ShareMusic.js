 function formData(form) {
  const data = form.querySelector('#music-file')?.files?.[0] ?? null;
  return {
    title: form.querySelector('#song-title').value,
    artist: form.querySelector('#artist-name').value,
    album: form.querySelector('#album-name').value,
    genre: form.querySelector('#genre-name').value,
    audioFile: data
  };
 }

 export function renderShareMusic(element, tracksArray) {

    function updateFeedDisplay() {
    const feedContainer = document.querySelector('#live-feed');
    if (!feedContainer) return;

    if (tracksArray.length === 0) {
        feedContainer.innerHTML = 'No tracks shared yet.';
        return;
    }

    feedContainer.innerHTML = tracksArray.map(track => `
      <div class="track-card">
        <div><strong>${track.title}</strong></div>
        <div>by ${track.artist}</div>
        <div>from ${track.album}</div>
        <div>Genre: ${track.genre}</div>
        ${track.audioUrl ? `<audio controls src="${track.audioUrl}"></audio>` : ''}
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

      <div>
        <label for="music-file">Audio File (.mp3, .wav, etc.)</label>
        <input type="file" id="music-file" accept="audio/*" required />
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const { title, artist, album, genre, audioFile } = formData(form);
        const uploadedFile = audioFile;
        const audioUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;

        const newTrack = {
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            audioUrl: audioUrl,
            uploadedFile: uploadedFile
        };

        tracksArray.push(newTrack);
        updateFeedDisplay();

        statusMsg.innerHTML = `Added Track Successfully "${newTrack.title}"!`;
        form.reset();

        setTimeout(() => {
            if (statusMsg) statusMsg.innerHTML = '';
        }, 3000);
    });
}

//...