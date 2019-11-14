/**
 * API call function.
 * @param {*} apiUrl the URL to call
 * @param {*} treatmentCallback the treatment to execute on data receival
 * @param {*} errorCallback the error callback to execute on HTTP error
 *  code receival (40x, 50x, ...)
 */
function requestApiMeasureData(apiUrl, treatmentCallback, errorCallback) {
  const request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', apiUrl, true);

  // Handle request response
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      treatmentCallback(JSON.parse(this.response));
    } else {
      errorCallback();
    }
  };

  // Send request
  request.send();
}
