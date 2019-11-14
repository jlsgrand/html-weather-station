
/**
 * DOM function to remove all element children.
 * @param {*} elementId the element name on which to remove children
 */
function cleanElementContent(elementId) {
  const elementToClean = document.getElementById(elementId);
  while (elementToClean.firstChild) {
    elementToClean.removeChild(elementToClean.firstChild);
  }
}

/**
 * DOM function that can load a measure element in a parent element.
 * @param {*} parentElementName the parent element name
 * @param {*} measure the measure object
 * @param {*} title the title to print
 */
function loadMeasureInDom(parentElementName, measure, title) {
  // Transforming date text to Date object
  const measureDate = new Date(measure.measureDate);

  // Creating the div that will contain the measure
  const packingElement = document.createElement('div');
  document.getElementById(parentElementName).appendChild(packingElement);

  // Creating the measure title
  const titleElement = document.createElement('h2');
  titleElement.textContent = title + measureDate.toLocaleDateString();
  packingElement.appendChild(titleElement);

  // Creating the measure elements
  const ulMeasures = document.createElement('ul');
  const liTemperature = document.createElement('li');
  const liHumidity = document.createElement('li');
  const liPressure = document.createElement('li');

  // Filling measure content
  liTemperature.textContent = 'Température : ' + measure.temperature + ' °C';
  liHumidity.textContent = 'Humidité : ' + measure.humidity + ' %hum';
  liPressure.textContent = 'Pression : ' + measure.pressure + ' hPa';

  ulMeasures.appendChild(liTemperature);
  ulMeasures.appendChild(liHumidity);
  ulMeasures.appendChild(liPressure);

  // Add measure element to measure div
  packingElement.appendChild(ulMeasures);
}

/**
 * Creates Table header.
 * @param {*} tableElement the table element on which to append header
 */
function createTableHeader(tableElement) {
  const trElement = document.createElement('tr');

  const thDate = document.createElement('th');
  thDate.textContent = 'Date';
  trElement.appendChild(thDate);

  const thTemperature = document.createElement('th');
  thTemperature.textContent = 'Temperature (°C)';
  trElement.appendChild(thTemperature);

  const thHumidity = document.createElement('th');
  thHumidity.textContent = 'Humidité (%hum)';
  trElement.appendChild(thHumidity);

  const thPressure = document.createElement('th');
  thPressure.textContent = 'Pression (hPa)';
  trElement.appendChild(thPressure);

  tableElement.appendChild(trElement);
}

/**
 * DOM function that creates a table line based on a measure.
 * @param {*} tableElement the table element on which to add the measure
 * @param {*} measure the measure to add
 */
function createTableLine(tableElement, measure) {
  const trElement = document.createElement('tr');

  const measureDate = new Date(measure.measureDate);
  const formattedDate = measureDate.getDate().toString().padStart(2, '0') + '/' +
        (measureDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' + measureDate.getFullYear() +
        ' ' + measureDate.getHours().toString().padStart(2, '0') +
        ':' + measureDate.getMinutes().toString().padStart(2, '0') +
        ':' + measureDate.getSeconds().toString().padStart(2, '0');

  const tdDate = document.createElement('td');
  tdDate.textContent = formattedDate;
  trElement.appendChild(tdDate);

  const tdTemperature = document.createElement('td');
  tdTemperature.textContent = measure.temperature;
  trElement.appendChild(tdTemperature);

  const tdHumidity = document.createElement('td');
  tdHumidity.textContent = measure.humidity;
  trElement.appendChild(tdHumidity);

  const tdPressure = document.createElement('td');
  tdPressure.textContent = measure.pressure;
  trElement.appendChild(tdPressure);

  tableElement.appendChild(trElement);
}
