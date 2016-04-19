angular.module('project', ['ngRoute'])

.service('Projects', function() {
  this.fetch = function () {
    return [
      {id:1, name: "Laura et la patate", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0127.jpg", author: "Alexis", last_modified: "1234"},
      {id:2, name: "Maxime souris", location:"file:///home/alexis/Photos/public/2014-couscous/_DSC0039.jpg", author: "Alexis", last_modified: "1234"}
    ];
  };
})
.config(function($routeProvider) {
  var resolveProjects = {
    projects: function (Projects) {
      return Projects.fetch();
    }
  };

  $routeProvider
    .when('/', {
      controller:'ProjectListController as projectList',
      templateUrl:'list-photos.html',
      resolve: resolveProjects
    })
    .when('/edit/:projectId', {
      controller:'EditProjectController as editProject',
      templateUrl:'edit-photo.html',
      resolve: resolveProjects
    })
    .when('/new', {
      controller:'NewProjectController as editProject',
      templateUrl:'edit-photo.html',
      resolve: resolveProjects
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ProjectListController', function(projects) {
  var projectList = this;
  projectList.projects = projects;
})

.controller('NewProjectController', function($location, projects) {
  var editProject = this;
  editProject.save = function() {
      console.log("save called");
  };
})

.controller('EditProjectController',
  function($location, $routeParams, projects) {
    var editProject = this;
    var projectId = $routeParams.projectId,
        projectIndex;

    editProject.projects = projects;
    projectIndex = editProject.projects.$indexFor(projectId);
    editProject.project = editProject.projects[projectIndex];

    editProject.destroy = function() {
      console.log("destroy called");
    };

    editProject.save = function() {
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
