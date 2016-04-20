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

  this.deletePhoto = function (id) {
    return photo_collection.deleteRecord(id);
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
    },
    deletePhoto: function(Photos) {
      return Photos.deletePhoto;
    }
  };

  $routeProvider
    .when('/', {
      controller:'PhotoListController as photoList',
      templateUrl:'list-photos.html',
      resolve: resolvePhotos
    })
    .when('/edit/:id', {
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
      $location.path('/');
      $scope.$apply();
    });
  };

  $scope.uploadFile = function(files) {
    $scope.files = files;
  };
})

.controller('EditPhotoController', function($scope, $location, $routeParams, photos, deletePhoto) {
    var id = $routeParams.id;

    $scope.photos = photos;
    $scope.photo = $scope.photos.filter(function(record) {
      return record.id == id;
    })[0];

    $scope.destroy = function() {
      deletePhoto($scope.photo.id).then(function() {
        $location.path('/');
        $scope.$apply();
      });
    };

    $scope.save = function() {
      uploadPhoto($scope.files[0], $scope.photo).then(function() {
        $location.path('/');
        $scope.$apply();
      });
    };

    $scope.uploadFile = function(files) {
      $scope.files = files;
    };
});
