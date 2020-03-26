const router = require('express').Router();
const db = require('../models/models.js');

/* *********************************************************
  In this implementation, each event has exactly one playlist
  associated with it. These endpoints are located under /event.
  
  They update a single table only, and therefore do not have
  all CRUD operations.
  ******************************************************** */

// Test endpoint
// router.get('/', (req, res) => {
//   const { query } = req;
//   res.status(200).json({ request: query });
// });

// Get Full playlist by event ID
// Returns array of songs that match the "event" parameter
router.get('/', (req, res) => {
  const { event } = req.query;

  if (!event) {
    res.status(400).json({ message: 'No event ID specified' });
  }

  db.getPlaylistByEventID(event)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Add a song to a playlist
router.post('/', (req, res) => {
  const { event } = req.query;
  const { body } = req;
  const songId = body.song_id;
  const queueNum = body.queue_num;

  if (!event) {
    res.status(400).json({ message: 'No event ID specified' });
  }
  if (!songId || !queueNum) {
    res.status(400).json({ message: 'Missing required fields' });
  }

  const newEntry = {
    event_id: event,
    song_id: songId,
    queue_num: queueNum
  };

  db.addPlaylistEntry(newEntry)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT update Playlist
router.put('/entry/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  // TODO: Only allow queue order to be changed here

  db.updatePlaylistEntry(id, body)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE Playlist entry
router.delete('/entry/:id', (req, res) => {
  const { id } = req.params;
  db.removePlaylistEntry(id)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
