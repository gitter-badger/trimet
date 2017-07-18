var data = [30, 86, 168, 281, 303, 365];

const appId = '087B6900772DB56DCE9D71A26';
const host = 'developer.trimet.org'
const path = '/ws/V1/arrivals'
const query = `locIDs=6849&appID=${appId}`
let request = {
  protocol: 'https',
  host: 'developer.trimet.org',
  path: 'ws/V1/arrivals',
  params: {
    locID: 6849,
    appId: '087B6900772DB56DCE9D71A26',
    json: true,
  },
  get query(){
    return `locIDs=${this.params.locID}&appID=${this.params.appId}&json=${this.params.json}`
  },
  get url(){
    return `${this.protocol}://${this.host}/${this.path}?${this.query}`
  }
}

function minutesFromNow(timestamp){
  return Math.floor((Date.parse(timestamp) - Date.now()) / 3600)
}

$(document).ready(function(){
  window.fetch(request.url)
  .then((rawData) => rawData.json())
  .then((jsonData) => jsonData.resultSet.arrival)
  .then((arrivals) => arrivals.map((a) => a.estimated || a.scheduled))
  .then((arrivalTimes) => arrivalTimes.map((t) => minutesFromNow(t)))
  .then(function(data) {
    // data is now being shadowed:
    d3.select(".chart")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });
  })
});
