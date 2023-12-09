const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


const spotifyApi = new SpotifyWebApi({
  clientId: '9b11617004944b388d817c58b8f997c4',
  clientSecret: 'e3bd39376815494ebee7e4349a025129',
  redirectUri: 'http://localhost:3000/callback',
});



app.get('/login', (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'user-read-email'], 'state', true);
  res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body['access_token'];

    // Set the access token
    spotifyApi.setAccessToken(accessToken);

    res.redirect('/');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// New route to handle the Spotify API search
app.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const searchData = await spotifyApi.searchTracks(query);
    res.json(searchData.body);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
