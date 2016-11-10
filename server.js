var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var router = express.Router();
var Page = require('./models/page');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/focusd');

router.use(function(req, res, next) {
  console.log('hold on, something is going down');
  next()
});

router.get('/', function(req, res) {
  res.json({
    message: 'hooray! Welcome to our api'
  });
});

router.route('/pages')
  .post(function(req, res) {

    var page = new Page();
    page.name = req.body.name;
    page.body = req.body.body;

    page.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Page created'
      });

      console.log("Page created called " + req.body.name + " and with the content " + page.body);

    });
  })

.get(function(req, res) {
  Page.find(function(err, pages) {
    if (err)
      res.send(err)

    res.json(pages);
  });

});

router.route("/pages/:page_id")
  .get(function(req, res) {
    Page.findById(req.params.page_id, function(err, page) {
      if (err)
        res.send(err);
      res.json(page);
    });
  })

.put(function(req, res) {
  Page.findById(req.params.page_id, function(err, page) {
    if (err)
      res.send(err);
      page.name = req.body.name;
    page.save(function(err) {
      if (err)
        res.send(err)
      res.json({
        message: "Page Updated"
      });
    });
  });
})

.delete(function(req, res) {
  Page.remove({
    _id: req.params.page_id
  }, function(err, page) {
    if (err)
      res.json(err);

    res.json({
      message: "successfully deleted"
    });
  });
});

app.use('/api', router);
app.listen(port);
console.log("listening on the best port there is: " + port);
