/**
 * Function that creates a measure chart based on values.
 * @param {*} measureId the measure canvas class id to set
 * @param {*} measureName the measure name to set on chart
 * @param {*} measureDetails the measure legend to set on chart
 * @param {*} xValues the measure x values (dates)
 * @param {*} yValues the measure y values (temp, hum, ...)
 * @param {*} color the measure line color
 */
function createMeasureChart(measureId, measureName, measureDetails, xValues, yValues, color) {
  canvasElement = document.createElement('canvas');
  canvasElement.setAttribute('id', measureId);
  canvasElement.setAttribute('width', '100');
  canvasElement.setAttribute('height', '100');
  document.getElementById('weather-content').appendChild(canvasElement);

  new Chart(document.getElementById(measureId), {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{
        data: yValues,
        label: measureName,
        borderColor: color,
        fill: false,
      }],
    },
    options: {
      title: {
        display: true,
        text: measureDetails,
      },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        }],
      },
    },
  });
}
