# Simple Blog
![Simple Roll](https://cosmicjs.com/uploads/6465cab0-246c-11e7-995a-2b3b96eb2f07-Screen%20Shot%202017-04-18%20at%202.22.26%20PM.png)
### [View Demo](https://cosmicjs.com/apps/simple-blog/demo)
### Getting Started
```
git clone https://github.com/cosmicjs/simple-blog
cd simple-blog
yarn
```
#### Config!
Get your Bucket slug and read key after [logging in to Cosmic JS](https://cosmicjs.com/login) and going to <i>Bucket > Settings > API Keys</i>.

#### Run in development
```
COSMIC_BUCKET=your-bucket-slug COSMIC_READ_KEY=your-bucket-read-key yarn run development
```
#### Run in production
```
COSMIC_BUCKET=your-bucket-slug COSMIC_READ_KEY=your-bucket-read-key yarn start
```
Open [http://localhost:3000](http://localhost:3000).

### Node.js + Cosmic JS
You can easily manage the content in your Simple Blog website on Cosmic JS.  Follow these steps:

1. [Log in to Cosmic JS](https://cosmicjs.com).
2. Create a Bucket. Choose Start from App.
3. Install the [Simple Blog Website](https://cosmicjs.com/apps/simple-blog).

## Deploy
A popular choice for the Node.js web deployment is [Now](https://zeit.co/). Follow the steps below from the root directiory.
```
npm i -g now
now
```

Cosmic JS makes a great [Node.js CMS](https://cosmicjs.com/knowledge-base/nodejs-cms) for your Node.js apps.
