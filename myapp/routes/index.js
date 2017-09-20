var express = require('express');
var router = express.Router();

/* GET home page. */

function find(req, res, text) {
  req.db.collection('Points').find().toArray((err, data) => {
    if (err) throw err;
    res.render('index', { title: 'Dear', points: data, resp: text });
  })
}

function insert(req, point) {
  req.db.collection('Points').insert(point).then((data) => {
    if (data.result.ok === 1) {
    } else {
      next('Error connecting with the database');
    }
  }).catch(err => console.log(err))
}

router.get('/', function (req, res, next) {
  find(req, res, `insert the point`);
});

router.post('/', function (req, res, next) {
  var point = {
    name: req.body.name, category: req.body.category
    , latitude: req.body.latitude, longitude: req.body.longitude
  };
  insert(req, point);
  find(req, res, `ur point has been saved !`);
});

router.post('/save', function (req, res, next) {
  var point = {
    name: req.body['data[name]'], category: req.body['data[category]']
    , latitude: req.body['data[latitude]'], longitude: req.body['data[longitude]']
  };
  var oldname = req.body['data[oldname]'];
  console.log(oldname)
  req.db.collection('Points').update({ name: oldname }, point).then(
    data =>
      res.render('index', { title: 'Dear', points: data, resp: 'updated !' })
  )
})

router.post('/remove', function (req, res, next) {
  var point = req.body;
  req.db.collection('Points').remove({'name': req.body.data})
})

module.exports = router;
