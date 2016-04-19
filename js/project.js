angular.module('project', ['ngRoute'])

.service('Photos', function() {
  this.fetch = function () {
    return [
      {id:1, name: "Laura et la patate", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0127.jpg", author: "Alexis", last_modified: "1234"},
      {id:2, name: "Maxime souris", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0039.jpg", author: "Alexis", last_modified: "1234"}
    ];
  };
})
.config(function($routeProvider) {
  var resolvePhotos = {
    photos: function (Photos) {
      return Photos.fetch();
    }
  };

  $routeProvider
    .when('/', {
      controller:'PhotoListController as photoList',
      templateUrl:'list-photos.html',
      resolve: resolvePhotos
    })
    .when('/edit/:projectId', {
      controller:'EditPhotoController as editPhoto',
      templateUrl:'edit-photo.html',
      resolve: resolvePhotos
    })
    .when('/new', {
      controller:'NewPhotoController as editPhoto',
      templateUrl:'edit-photo.html',
      resolve: resolvePhotos
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('PhotoListController', function(photos) {
  this.photos = photos;
})

.controller('NewPhotoController', function($location, photos) {
  var editPhoto = this;
  editPhoto.save = function() {
      console.log("save called", editPhoto.photo);
  };
})

.controller('EditPhotoController',
  function($location, $routeParams, photos) {
    var editPhoto = this;
    var projectId = $routeParams.projectId,
        projectIndex;

    editPhoto.photos = photos;
    projectIndex = editPhoto.photos.$indexFor(projectId);
    editPhoto.project = editPhoto.photos[projectIndex];

    editPhoto.destroy = function() {
      console.log("destroy called");
    };

    editPhoto.save = function() {
      console.log("save called");
    };
});



//angular.module('project')
//    .controller('ListPhotosController', function() {
//      var headers = {Authorization: "Basic " + btoa("user:pass")};
//      var client = new KintoClient.default("http://localhost:8888/v1", {headers: headers});
//      var photos = this;
//      var bucket = client.bucket("tvb-leslandes");
//      var photo_collection = bucket.collection("photos");
//
//      photos.listPhotos = function() {
//        photo_collection.listRecords().then(function(records) {
//          photos.list = records.data;
//        });
//      };
//      photos.listPhotos();
//
//      // photos.list = [
//      //   {id:1, name: "Laura et la patate", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0127.jpg", author: "Alexis", last_modified: "1234"},
//      //   {id:2, name: "Maxime souris", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0039.jpg", author: "Alexis", last_modified: "1234"}
//      // ];
//
//    });
//
