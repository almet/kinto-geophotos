angular.module('project', ['ngRoute'])

.service('Photos', function() {
  var bucketName = "tvb-leslandes";
  var collectionName = "photos";
  var serverUrl = "http://localhost:8888/v1"
  var headers = {Authorization: "Basic " + btoa("user:pass")};

  var client = new KintoClient.default(serverUrl, {headers: headers});
  var bucket = client.bucket(bucketName);
  var photo_collection = bucket.collection(collectionName);

  this.fetch = function () {
    return photo_collection.listRecords().then(function(records) {
      return records.data;
    });
  };

  this.uploadPhoto = function(file, description, callback) {
    var bucketName = "tvb-leslandes";
    var collectionName = "photos";
    var serverUrl = "http://localhost:8888/v1"
    var headers = {Authorization: "Basic " + btoa("user:pass")};
    // Record id
    var recordID = uuid4();

    // Build form data
    var formData = new FormData();
    // Multipart attachment
    formData.append('attachment', file, file.name);
    // Record attributes as JSON encoded
    formData.append('data', JSON.stringify(description));

    // Post form using GlobalFetch API
    var url = serverUrl + '/buckets/' + bucketName + "/collections/" + collectionName + "/records/" + recordID + "/attachment";
    return fetch(url, {method: "POST", body: formData, headers: headers})
     .then(function (result) {
        if (result.status > 400) {
          throw new Error('Failed');
        }
     })
     .then(function () {
       return;
     })
     .catch(function (error) {
       throw error;
     });
  }
})
.config(function($routeProvider) {
  var resolvePhotos = {
    photos: function (Photos) {
      return Photos.fetch();
    },
    uploadPhoto: function(Photos) {
      return Photos.uploadPhoto;
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

.controller('PhotoListController', function($scope, photos) {
  $scope.photos = photos;
})

.controller('NewPhotoController', function($scope, $location, photos, uploadPhoto) {
  $scope.save = function() {
    uploadPhoto($scope.files[0], $scope.photo).then(function() {
      console.log("it's okay! Redirecting.");
      $location.path('/');
      $scope.$apply();
    });
  };

  $scope.uploadFile = function(files) {
    $scope.files = files;
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
