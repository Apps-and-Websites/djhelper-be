const express = require('express');
const db = require('../models/models.js');

const router = express.Router();

/* ***********************************************************
  publicRouter
  -----------------------------------------------------------
  This file serves informational routes that
  are not protected and serves information that
  is available to the general public.
  -----------------------------------------------------------
  It is primarily for advertising of DJs and events.
  -----------------------------------------------------------
  The private versions of these routes are located
  under the authRouter endpoints.
  ******************************************************** */
//---DJ's--\\

// Get ALL DJs -- WORKS
router.get('/djs', (req, res) => {
  db.getAllDJs()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get DJ by ID -- WORKS
router.get('/dj/:id', (req, res) => {
  const id = req.params.id;
  db.getDJsByID(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//---Events--\\

// Get ALL Events -- Not up yet
router.get('/events', (req, res) => {
  db.getAllEvents()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get Event by ID -- Not up yet
router.get('/event/:id', (req, res) => {
  const id = req.params.id;
  db.getEventsByID(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//POST new event-- WORKS
router.post('/event/:id', (req, res) => {
  const body = req.body;
  db.addEvent(body)
  .then(event => {
      res.status(200).json(event)
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

//DEL event-- WORKS
router.delete('/event/:id', (req, res) => {
  const id = req.params.id;
  db.removeEvent(id)
  .then(event => {
      res.status(200).json(event)
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

//PUT update event-- WORKS
router.put('/event/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.updateEvent(id, body)
  .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

//---------------Locations--------------------\\

// Get ALL Locations -- Not up yet
router.get('/locations', (req, res) => {
  db.getAllLocations()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get Location by ID -- Not up yet
router.get('/location/:id', (req, res) => {
  const id = req.params.id;
  db.getLocationsByID(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//POST new location
router.post('/location/:id', (req, res) => {
  const body = req.body;
  db.addLocation(body)
  .then(location => {
      res.status(200).json(location)
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

//DEL location
router.delete('/location/:id', (req, res) => {
  const id = req.params.id;
  db.removeLocation(id)
  .then(location => {
      res.status(200).json(location)
  })
  .catch(err => {
      res.status(500).json(err)
  })
})

//PUT update location
router.put('/location/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.updateLocation(id, body)
  .then(location => {
      res.status(200).json(location);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})


module.exports = router;
