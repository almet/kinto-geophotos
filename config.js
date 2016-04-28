var kintoConfig = {
  pageTitle: "Ma liste de photos.",
  mapLegend: "Go and have a look at <a href='/admin'>the admin</a>.",
  serverUrl: "https://kinto.notmyidea.org/v1",
  headers: {Authorization: "Basic " + btoa("token:geophotoapp")},
  bucketName: "geophotoapp",
  collectionName: "photos",
  mainMarker: {
    lat: 47.900000,
    lng: -2.200000
  },
  inputZone: {
    lat: 47.900000,
    lng: -2.200000,
    zoom: 12
  }
}
