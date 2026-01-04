const CLIENT_ID = "PUT_YOUR_SPOTIFY_CLIENT_ID_HERE";
const REDIRECT = window.location.origin + window.location.pathname;
const SCOPES = "user-read-currently-playing";

const loginBtn = document.getElementById("spotifyLogin");
const statusEl = document.getElementById("spotifyStatus");

function loginSpotify() {
  const url =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
    `&scope=${SCOPES}`;
  window.location = url;
}

function getToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

async function fetchNowPlaying(token) {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (res.status === 204) {
    statusEl.textContent = "No music playing";
    return;
  }

  const data = await res.json();
  statusEl.textContent =
    `🎵 ${data.item.name} — ${data.item.artists[0].name}`;
}

loginBtn.onclick = loginSpotify;

const token = getToken();
if (token) {
  setInterval(() => fetchNowPlaying(token), 5000);
}
