function uploadFile(file, data) {
  // Record id
  var recordID = uuid4();

  // Build form data
  var formData = new FormData();
  // Multipart attachment
  formData.append('attachment', file, file.name || "unamed");
  // Record attributes as JSON encoded
  formData.append('data', JSON.stringify(data));

  // Post form using GlobalFetch API
  var url = kintoConfig.serverUrl + '/buckets/' + kintoConfig.bucketName + "/collections/" + kintoConfig.collectionName + "/records/" + recordID + "/attachment";
  return fetch(url, {method: "POST", body: formData, headers: kintoConfig.headers})
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
