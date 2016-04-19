angular.module('geoPhotosApp', [])
  .controller('PhotosController', function() {
    var photos = this;

    photos.list = [
      {id:1, name: "Laura et la patate", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0127.jpg", author: "Alexis", last_modified: "1234"},
      {id:2, name: "Maxime souris", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0039.jpg", author: "Alexis", last_modified: "1234"}
    ];
    
  });
