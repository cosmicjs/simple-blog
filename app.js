const express = require('express')
const app = express()
const hogan = require('hogan-express')
const http_module = require('http')
const async = require('async')
const http = http_module.Server(app)
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
const Cosmic = require('cosmicjs')
const helpers = require('./helpers')
const bucket_slug = process.env.COSMIC_BUCKET || 'simple-blog-website'
const read_key = process.env.COSMIC_READ_KEY
const config = {
  bucket: {
    slug: bucket_slug,
    read_key: read_key
  }
}
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
app.use('/', (req, res, next) => {
  res.locals.year = new Date().getFullYear()
  next()
})
// Home
app.get('/', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response
    if (cosmic.objects.type.posts) {
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at))
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date
      })
    } else {
      cosmic.no_posts = true
    }
    res.locals.cosmic = cosmic
    res.render('index.html', { partials })
  })
})
// Single Post
app.get('/:slug', (req, res) => {
  async.series([
    callback => {
      Cosmic.getObjectsByType(config, { type_slug: 'globals' }, (err, response) => {
        res.locals.cosmic = response
        return callback()
      })
    },
    callback => {
      Cosmic.getObject(config, { slug: req.params.slug, status: 'all' }, (err, response) => {
        res.locals.current_post = response.object
        const friendly_date = helpers.friendlyDate(new Date(response.object.created))
        res.locals.current_post.friendly_date = friendly_date.month + ' ' + friendly_date.date
        if (!res.locals.current_post)
          res.status(404)
        res.render('post.html', { partials })
      })
    }
  ])
})
// Author Posts
app.get('/author/:slug', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response
    if (cosmic.objects.type.posts) {
      let author_posts = []
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at))
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date
        if (post.metadata.author.slug === req.params.slug) {
          res.locals.author = post.metadata.author
          author_posts.push(post)
        }
      })
      cosmic.objects.type.posts = author_posts
    } else {
      cosmic.no_posts = true
    }
    res.locals.author
    res.locals.cosmic = cosmic
    res.render('author.html', { partials })
  })
})
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})
