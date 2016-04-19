angular.module('geoPhotosApp', [])
  .controller('PhotosController', function() {
    var photos = this;
    var headers = {Authorization: "Basic " + btoa("user:pass")};
    var client = new KintoClient.default("http://localhost:8888/v1", {headers: headers});
    var bucket = client.bucket("tvb-leslandes");
    var photo_collection = bucket.collection("photos");

    photos.listPhotos = function() {
      photo_collection.listRecords().then(function(records) {
        photos.list = records.data;
      });
    };
    photos.listPhotos();

    // photos.list = [
    //   {id:1, name: "Laura et la patate", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0127.jpg", author: "Alexis", last_modified: "1234"},
    //   {id:2, name: "Maxime souris", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0039.jpg", author: "Alexis", last_modified: "1234"}
    // ];

  });
