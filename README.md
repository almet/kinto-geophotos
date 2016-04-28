# Geotagged photos

This project lets you manage the photos of a [Kinto](https://kinto.readthedocs.io)
server, and displays them on a map.

## Map

All the photos are displayed on a map, thanks to the [Leaflet.Photo](http://i.imgur.com/SQrsJlq.png)
project.

![](http://i.imgur.com/SQrsJlq.png)

## Administration dashboard

You can review all the published photos in the admin dashboard:

![](http://i.imgur.com/GXVy4k5.png)
![](http://i.imgur.com/axQvYFk.png)

## How to run your own?

### Running a properly-configured kinto server

You should have a [Kinto](https://kinto.readthedocs.io) server setup, with the
[kinto-attachment](https://github.com/Kinto/kinto-attachment/) plugin enabled.

If you don't have one, have a look at the documentation, it's dead easy using [the
Heroku one-click install](http://kinto.readthedocs.io/en/latest/get-started.html#deploying-on-cloud-providers).

You can find in this repository (in the `config/kinto.ini` file a default
configuration file to run kinto with the *kinto-attachment* plugin.

### Configuration of the JavaScript files

This repository ships with a `config.js.dev` file, that you should adapt to
your own needs and rename `config.js` so that everything can work together.

```bash

$ git clone https://github.com/almet/kinto-geophotos.git
$ cd kinto-geophotos
$ cp config.js{.dev,}
```

And then edit the `config.js` file and specify your own settings.

### Creation of the buckets and collections on the Kinto server

The last thing you need to do is to create the buckets and collections on the
server. This should be done with the following commands (which uses
[httpie](https://github.com/jkbrzt/httpie)). Of course, you should adapt the
`bucketname`, `collectionname` and `user:pass` values with the values you
specified in your configuration file:

```bash

$ http PUT http://localhost:8888/v1/buckets/bucketname -a user:pass --json
$ http PUT http://localhost:8888/v1/buckets/bucketname/collections/collectionname -a user:pass --json
```

And you should be good to go!
