// Defining constants
const weatherSectionContentId = 'weather-content';
const datePicketSectionId = 'date-picker';

// Defining default dates for measures request API
let startDateString = formatDateToIsoString(new Date());
let endDateString = formatDateToIsoString(new Date());

// Handling click on last measure menu
document.getElementById('last-measure-menu').onclick = function() {
  // Hiding date picker
  document.getElementById(datePicketSectionId).style = 'display: none';

  // Cleaning weather-content section
  cleanElementContent(weatherSectionContentId);

  requestApiMeasureData('http://192.168.1.197/last-measure',
      function(apiObject) {
        loadMeasureInDom(weatherSectionContentId, apiObject, 'Dernière mesure du ');
      },
      function() {
        console.log('Erreur de récupération de la dernière mesure');
      },
  );
};

// Handling click on top measure menu
document.getElementById('top-measures-menu').onclick = function() {
  document.getElementById(datePicketSectionId).style = 'display: none';
  cleanElementContent(weatherSectionContentId);

  requestApiMeasureData('http://192.168.1.197/top-measure/temperature',
      function(apiObject) {
        loadMeasureInDom(weatherSectionContentId, apiObject, 'Top température le ');
      },
      function() {
        console.log('Erreur de récupération de la top temperature');
      },
  );

  requestApiMeasureData('http://192.168.1.197/top-measure/humidity',
      function(apiObject) {
        loadMeasureInDom(weatherSectionContentId, apiObject, 'Top humidité le ');
      },
      function() {
        console.log('Erreur de récupération de la top humidité');
      },
  );

  requestApiMeasureData('http://192.168.1.197/top-measure/pressure',
      function(apiObject) {
        loadMeasureInDom(weatherSectionContentId, apiObject, 'Top pression le ');
      },
      function() {
        console.log('Erreur de récupération de la top pression');
      },
  );
};

// Handling click on table measure menu
document.getElementById('table-measures-menu').onclick = function() {
  document.getElementById(datePicketSectionId).style = 'display: block';
  cleanElementContent(weatherSectionContentId);

  const tableContainer = document.getElementById(weatherSectionContentId);
  const tableElement = document.createElement('table');
  tableContainer.appendChild(tableElement);

  createTableHeader(tableElement);

  requestApiMeasureData(`http://192.168.1.197:8080/measure/date?startDate=${startDateString}&endDate=${endDateString}`,
      function(apiObject) {
        for (const measure of apiObject) {
          createTableLine(tableElement, measure);
        }

        // apiObject.forEach((measure) => {
        //   createTableLine(tableElement, measure);
        // });
      },
      function() {
        console.log(`Erreur de récupération des mesures entre ${startDateString} et ${endDateString}`);
      },
  );
};

// Handling click on graphical measure menu
document.getElementById('graph-measures-menu').onclick = function() {
  document.getElementById(datePicketSectionId).style = 'display: block';
  cleanElementContent(weatherSectionContentId);

  requestApiMeasureData(`http://192.168.1.197:8080/measure/date?startDate=${startDateString}&endDate=${endDateString}`,
      function(apiObject) {
        dateTable = [];
        temperatureTable = [];
        humidityTable = [];
        pressureTable = [];

        let counter = 0;
        apiObject.forEach((measure) => {
          if (counter % 20 == 0) {
            dateTable.push(new Date(measure.measureDate).toLocaleDateString());
            temperatureTable.push(measure.temperature);
            humidityTable.push(measure.humidity);
            pressureTable.push(measure.pressure);
          }
          counter += 1;
        });

        createMeasureChart('tempChart',
            'Température (°C)',
            'Evolution de la température',
            dateTable,
            temperatureTable,
            '#ffa500');

        createMeasureChart('humChart',
            'Humidité relative (%)',
            'Evolution de l\'humidité relative',
            dateTable,
            humidityTable,
            '#4682b4');

        createMeasureChart('presChart',
            'Pression (hPa)',
            'Evolution de la pression atmosphérique',
            dateTable,
            pressureTable,
            '#dc143c');
      },
      function() {
        console.log(`Erreur de récupération des mesures entre ${startDateString} et ${endDateString}`);
      },
  );
};

document.getElementById('date-picker-form').addEventListener('submit', function(event) {
  event.preventDefault();

  startDateString = document.getElementById('frmStartDate').value;
  endDateString = document.getElementById('frmEndDate').value;
});
