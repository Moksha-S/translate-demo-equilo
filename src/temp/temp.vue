<template>
  <div id="spider-container">
    <div class="flex flex-col">
      <div
        class="flex flex-row items-center"
        id="intersection-search"
        style="width: 100%"
      >
        <div class="flex flex-col my-5 w-5/12 ml-auto">
          <span>Select by Region or Income Group</span>
        </div>
        <div class="flex flex-col mr-auto mt-5 w-8/12" id="intersection-search">
          <div
            class="text-sm leading-5 text-gray-900 w-full relative flex flex-row items-center mb-4"
          >
            <svg
              class="absolute left-0 ml-3 h-5 w-5 text-gray-600"
              id="Layer_3"
              data-name="Layer 3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                cx="11.059"
                cy="11.059"
                r="7.059"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <line
                x1="20"
                y1="20"
                x2="16.05"
                y2="16.05"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <rect width="24" height="24" fill="none" />
            </svg>
            <v-select
              @input="this.fillData"
              :value="toTitleCase(this.category)"
              :options="this.categories"
              class="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm w-full pl-10 font-medium focus:outline-none focus:shadow-outline"
              placeholder="Select Region or Income"
              label="name"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <builddemospider
      :chart-data="this.dataToFill"
      :options="this.optionsToFill"
      class="z-10 overflow-visible"
      style="position: relative; height: 100%; width: 100%; left: 3%"
    ></builddemospider>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "@/helpers/cookies";
const _ = require("underscore");
import { Radar, mixins } from "vue-chartjs";
import env from "@/../env";
import builddemospider from "@/components/charts/build-demo-spider.vue";
const { reactiveProp } = mixins;
export default {
  extends: Radar,
  mixins: [reactiveProp],
  data: function () {
    return {
      country: {},
      regionalData: [],
      eastAsiaData: [],
      europeCenAsiaData: [],
      latinAmerData: [],
      middleEastData: [],
      southAsiaData: [],
      subSaharanData: [],
      northAmericaData: [],
      lowIncData: [],
      lowerMidIncData: [],
      upperMidIncData: [],
      highIncData: [],
      globalData: [],
      dataToFill: null,
      optionsToFill: null,
      categories: ["Region", "Income"],
      axes: [],
      axeColors: [],
      max: [],
      one: [],
      domains: [],
      intersections: [],
      hoverIndex: false,
    };
  },
  components: {
    builddemospider,
  },
  methods: {
    swapElements(arr, i1, i2) {
      let temp = arr[i1];
      arr[i1] = arr[i2];
      arr[i2] = temp;
    },
    formatLabel(str, maxwidth) {
      var sections = [];
      var words = str.split(" ");
      var temp = "";
      words.forEach(function (item, index) {
        if (temp.length > 0) {
          var concat = temp + " " + item;
          if (concat.length > maxwidth) {
            sections.push(temp);
            temp = "";
          } else {
            if (index == words.length - 1) {
              sections.push(concat);
              return;
            } else {
              temp = concat;
              return;
            }
          }
        }
        if (index == words.length - 1) {
          sections.push(item);
          return;
        }
        if (item.length < maxwidth) {
          temp = item;
        } else {
          sections.push(item);
        }
      });
      return sections;
    },
    opacity: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      const rgb = result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
      return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.25)";
    },
    getData: function () {
      return new Promise(function (resolve) {
        axios
          .get(env.apiUrl + "/countries/sectors/BASE/regions", {
            headers: {
              Authorization: "Bearer " + Cookies.get("session"),
            },
          })
          .then(function (res) {
            resolve(res.data.data);
          });
      });
    },
    toTitleCase: function (phrase) {
      return (phrase || "")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    calc: function (input) {
      if (typeof input !== undefined && input !== "Missing" && !isNaN(input)) {
        return (Number(input) || 0).toFixed(3);
      } else {
        return null;
      }
    },
    fillData: function (value) {
      const _self = this;
      this.category = value.toLowerCase();
      if (this.category == "region") {
        this.dataToFill = {};
        this.optionsToFill = {};
        this.dataToFill = {
          labels: this.axes,
          datasets: [
            {
              data: this.southAsiaData,
              label: "South Asia",
              borderColor: env.geoColors.regionspider,
              pointBackgroundColor: env.geoColors.regionspider,
              fill: false,
              backgroundColor: this.opacity(env.geoColors.regionspider),
              pointHitRadius: 8,
              //hidden: true
            },
            {
              data: this.subSaharanData,
              label: "Sub-Saharan Africa",
              borderColor: env.geoColors.incomespider,
              pointBackgroundColor: env.geoColors.incomespider,
              fill: false,
              backgroundColor: this.opacity(env.geoColors.incomespider),
              pointHitRadius: 8,
            },
            {
              data: this.eastAsiaData,
              label: "East Asia & Pacific",
              borderColor: env.brandingColors.orange,
              pointBackgroundColor: env.brandingColors.orange,
              fill: false,
              backgroundColor: this.opacity(env.brandingColors.orange),
              pointHitRadius: 8,
            },
            {
              data: this.europeCenAsiaData,
              label: "Europe & Central Asia",
              borderColor: env.brandingColors.navy,
              pointBackgroundColor: env.brandingColors.navy,
              fill: false,
              backgroundColor: this.opacity(env.brandingColors.navy),
              pointHitRadius: 8,
            },
            {
              data: this.northAmericaData,
              label: "North America",
              borderColor: "#536878",
              pointBackgroundColor: "#536878",
              fill: false,
              backgroundColor: this.opacity("#536878"),
              pointHitRadius: 8,
            },
            {
              data: this.latinAmerData,
              label: "Latin America & Caribbean",
              borderColor: env.brandingColors.blue,
              pointBackgroundColor: env.brandingColors.blue,
              fill: false,
              backgroundColor: this.opacity(env.brandingColors.blue),
              pointHitRadius: 8,
            },
            {
              data: this.middleEastData,
              label: "Middle East & North Africa",
              borderColor: "#A33400",
              pointBackgroundColor: "#A33400",
              fill: false,
              backgroundColor: this.opacity("#A33400"),
              pointHitRadius: 8,
            },
            {
              data: this.globalData,
              label: "Global",
              borderColor: env.geoColors.lmicspider,
              fill: false,
              borderWidth: 3,
              backgroundColor: this.opacity(env.geoColors.lmicspider),
              pointHitRadius: 8,
            },
            {
              data: this.max,
              fill: false,
              label: "hide",
              pointBackgroundColor: this.axeColors,
            },
            {
              data: this.one,
              label: "Perfect equality",
              fill: false,
              pointBackgroundColor: "#3F37C9",
              pointRadius: 0,
              backgroundColor: "#3F37C9",
              borderColor: "#3F37C9",
            },
          ],
        };
        this.optionsToFill = {
          maintainAspectRatio: false,
          //aspectRatio: 1,
          responsive: true,
          spanGaps: false,
          layout: {
            padding: {
              left: this.paddingL,
              right: this.paddingR,
              top: this.paddingT,
              bottom: this.paddingB,
            },
          },
          legend: {
            position: "bottom",
            labels: {
              filter: function (item) {
                // Logic to remove a particular legend item goes here
                return !item.text.includes("hide");
              },
              fontSize: 12,
              fontFamily: "basier", //'Montserrat'
            },
            onHover: function (e, legendItem) {
              // Function to only hide Perfect geneder equality
              if (legendItem.text.indexOf("Perfect") == -1) {
                e.target.style.cursor = "pointer";
              }
            },
            // Function to only hide Perfect geneder equality
            onClick: function (e, legendItem) {
              if (legendItem.text.indexOf("Perfect") > -1) {
                return false;
              }
              // code from https://github.com/chartjs/Chart.js/blob/master/src/core/core.legend.js
              // modified to prevent hiding all legend items
              var index = legendItem.datasetIndex;
              var ci = this.chart;
              var meta = ci.getDatasetMeta(index);
              // See controller.isDatasetVisible comment
              var hidden =
                meta.hidden === null ? !ci.data.datasets[index].hidden : null;
              if (hidden) {
                var someShown = _.some(this.legendItems, function (item) {
                  return item !== legendItem && !item.hidden;
                });
                if (!someShown) return;
              }
              meta.hidden = hidden;
              // We hid a dataset ... rerender the chart
              ci.update();
            },
          },
          hover: {
            onHover: function (e) {
              // return false;
              var point = "";
              point = this.getElementAtEvent(e);
              if (point.length > 0) {
                // Prevent from flashing.
                if (
                  point[0]._index !==
                  _self.hoverIndex + "_" + point[0]._datasetIndex
                ) {
                  _self.hoverIndex =
                    point[0]._index + "_" + point[0]._datasetIndex;
                  document.getElementById("intersection-info").position =
                    "absolute";
                  document.getElementById("intersection-info").style.zIndex =
                    "99999";
                  document.getElementById("intersection-info").style.top =
                    e.pageY + "px";
                  document.getElementById("intersection-info").style.left =
                    e.pageX + "px";
                  document.getElementById("intersection-info").style.display =
                    "block";
                  document.getElementById("intersection-name").innerText =
                    _self.axes[point[0]._index].toString().replace(",", " ");
                  document.getElementById("intersection-domain").innerText =
                    _self.domains[point[0]._index];
                  document.getElementById(
                    "intersection-domain"
                  ).style.backgroundColor = _self.axeColors[point[0]._index];
                  document.getElementById("lmic-avg").style =
                    "color: " + env.geoColors.lmicspider;
                  document.getElementById(
                    "div-intersection-region"
                  ).style.display = "block";
                  document.getElementById("intersection-region").className =
                    "pr-2";
                  // if (point[0]._datasetIndex == 0) {
                  document.getElementById("intersection-country").innerText =
                    "South Asia";
                  document.getElementById("div-intersection-country").style =
                    "color: " + env.geoColors.regionspider;
                  document.getElementById(
                    "intersection-country-value"
                  ).innerText =
                    _self.southAsiaData[point[0]._index] == null
                      ? "Missing"
                      : _self.southAsiaData[point[0]._index]; // || "Missing";
                  // } else if (point[0]._datasetIndex == 1) {
                  document.getElementById(
                    "intersection-region-value"
                  ).innerText =
                    _self.subSaharanData[point[0]._index] == null
                      ? "Missing"
                      : _self.subSaharanData[point[0]._index]; // || "Missing";
                  document.getElementById("intersection-region").innerText =
                    "Sub-Sarahan Africa";
                  document.getElementById("div-intersection-region").style =
                    "color: " + env.geoColors.incomespider;
                  // } else if (point[0]._datasetIndex == 2) {
                  document.getElementById(
                    "intersection-country-value-seven"
                  ).innerText =
                    _self.eastAsiaData[point[0]._index] == null
                      ? "Missing"
                      : _self.eastAsiaData[point[0]._index]; // || "Missing";
                  document.getElementById(
                    "intersection-country-seven"
                  ).innerText = "East Asia & Pacific";
                  document.getElementById(
                    "div-intersection-country-seven"
                  ).style = "color: " + env.brandingColors.orange;
                  // } else if (point[0]._datasetIndex == 3) {
                  document.getElementById(
                    "intersection-income-value"
                  ).innerText =
                    _self.europeCenAsiaData[point[0]._index] == null
                      ? "Missing"
                      : _self.europeCenAsiaData[point[0]._index]; // || "Missing";
                  document.getElementById("intersection-income").innerText =
                    "Europe & Central Asia";
                  document.getElementById("div-intersection-income").style =
                    "color: " + env.brandingColors.navy;
                  // } else if (point[0]._datasetIndex == 4) {
                  document.getElementById(
                    "intersection-country-value-four"
                  ).innerText =
                    _self.northAmericaData[point[0]._index] == null
                      ? "Missing"
                      : _self.northAmericaData[point[0]._index]; // || "Missing";
                  document.getElementById(
                    "intersection-country-four"
                  ).innerText = "North America";
                  document.getElementById(
                    "div-intersection-country-four"
                  ).style = "color: " + "#536878";
                  // } else if (point[0]._datasetIndex == 5) {
                  document.getElementById(
                    "intersection-country-value-five"
                  ).innerText =
                    _self.latinAmerData[point[0]._index] == null
                      ? "Missing"
                      : _self.latinAmerData[point[0]._index]; // || "Missing";
                  document.getElementById(
                    "intersection-country-five"
                  ).innerText = "Latin America & Caribbean";
                  document.getElementById(
                    "div-intersection-country-five"
                  ).style = "color: " + env.brandingColors.blue;
                  // } else if (point[0]._datasetIndex == 6) {
                  document.getElementById(
                    "intersection-country-value-six"
                  ).innerText =
                    _self.middleEastData[point[0]._index] == null
                      ? "Missing"
                      : _self.middleEastData[point[0]._index]; // || "Missing";
                  document.getElementById(
                    "intersection-country-six"
                  ).innerText = "Middle East & North Africa";
                  document.getElementById(
                    "div-intersection-country-six"
                  ).style = "color: #A33400";
                  // }
                  document.getElementById("intersection-lmic-value").innerText =
                    _self.globalData[point[0]._index] == null
                      ? "Missing"
                      : _self.globalData[point[0]._index];
                  document.getElementById(
                    "div-intersection-country"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-income"
                  ).style.display = "block";
                  document.getElementById(
                    "intersection-theme-link"
                  ).style.display = "none";
                  document.getElementById(
                    "intersection-domain-link"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-validity-power"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-country-four"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-country-five"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-country-six"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-country-seven"
                  ).style.display = "block";
                  //document.getElementById("intersection-scores-validity").innerText = Number(_self.intersections[point[0]._index].validity || 0).toFixed(2);
                  //document.getElementById("intersection-scores-power").innerText = Number(_self.intersections[point[0]._index].power || 0).toFixed(2);
                }
              } else {
                document.getElementById("intersection-info").style.display =
                  "none";
              }
              // var label = this.data.labels[point._index];
              //var value = this.data.datasets[point._datasetIndex].data[point._index];
              if (e.fromElement == undefined) {
                document.getElementById("intersection-info").style.opacity = "";
              } else {
                document.getElementById("intersection-info").style.opacity =
                  "1";
              }
              if (point.length) e.target.style.cursor = "pointer";
              else e.target.style.cursor = "default";
              //e.target.style.cursor = 'pointer';
            },
          },
          scale: {
            angleLines: {
              display: true,
              color: "rgb(243, 243, 243)",
              lineWidth: 2,
            },
            gridLines: {
              display: true,
              color: "rgb(243, 243, 243)",
              lineWidth: 2,
            },
            pointLabels: {
              fontColor: this.axeColors,
              fontSize: 11, // 12
              fontFamily: "basier", //'Montserrat',
              lineHeight: 1,
              onClick: function () {},
              callback: function (pointLabel, index) {
                if (index == 19) {
                  var words = pointLabel.split(" ");
                  var testLine = [];
                  testLine.push(" ");
                  for (var n = 0; n < words.length; n++) {
                    testLine.push(words[n]);
                  }
                  testLine.push(" ");
                  return testLine;
                } else {
                  return pointLabel;
                }
              },
            },
            ticks: {
              beginAtZero: true,
              max: 1.4,
              min: 0,
              stepSize: 0.2,
            },
          },
          tooltips: {
            enabled: false,
          },
        };
      } else if (this.category == "income") {
        this.dataToFill = {};
        this.optionsToFill = {};
        this.dataToFill = {
          labels: this.axes,
          datasets: [
            {
              data: this.lowIncData,
              label: "Low income",
              borderColor: env.geoColors.regionspider,
              pointBackgroundColor: env.geoColors.regionspider,
              fill: false,
              backgroundColor: this.opacity(env.geoColors.regionspider),
              pointHitRadius: 8,
              //hidden: true
            },
            {
              data: this.lowerMidIncData,
              label: "Lower middle income",
              borderColor: env.geoColors.incomespider,
              pointBackgroundColor: env.geoColors.incomespider,
              fill: false,
              backgroundColor: this.opacity(env.geoColors.incomespider),
              pointHitRadius: 8,
            },
            {
              data: this.upperMidIncData,
              label: "Upper middle income",
              borderColor: env.brandingColors.navy,
              pointBackgroundColor: env.brandingColors.navy,
              fill: false,
              backgroundColor: this.opacity(env.brandingColors.navy),
              pointHitRadius: 8,
            },
            {
              data: this.highIncData,
              label: "High income",
              borderColor: env.brandingColors.orange,
              pointBackgroundColor: env.brandingColors.orange,
              fill: false,
              backgroundColor: this.opacity(env.brandingColors.orange),
              pointHitRadius: 8,
            },
            {
              data: this.globalData,
              label: "Global",
              borderColor: env.geoColors.lmicspider,
              pointBackgroundColor: env.geoColors.lmicspider,
              fill: false,
              borderWidth: 3,
              backgroundColor: this.opacity(env.geoColors.lmicspider),
              pointHitRadius: 8,
            },
            {
              data: this.max,
              fill: false,
              label: "hide",
              pointBackgroundColor: this.axeColors,
            },
            {
              data: this.one,
              label: "Perfect equality",
              fill: false,
              pointBackgroundColor: "#3F37C9",
              pointRadius: 0,
              backgroundColor: "#3F37C9",
              borderColor: "#3F37C9",
            },
          ],
        };
        this.optionsToFill = {
          maintainAspectRatio: false,
          //aspectRatio: 1,
          responsive: true,
          spanGaps: false,
          layout: {
            padding: {
              left: this.paddingL,
              right: this.paddingR,
              top: this.paddingT,
              bottom: this.paddingB,
            },
          },
          legend: {
            position: "bottom",
            labels: {
              filter: function (item) {
                // Logic to remove a particular legend item goes here
                return !item.text.includes("hide");
              },
              fontSize: 12,
              fontFamily: "basier", //'Montserrat'
            },
            onHover: function (e, legendItem) {
              // Function to only hide Perfect geneder equality
              if (legendItem.text.indexOf("Perfect") == -1) {
                e.target.style.cursor = "pointer";
              }
            },
            // Function to only hide Perfect geneder equality
            onClick: function (e, legendItem) {
              if (legendItem.text.indexOf("Perfect") > -1) {
                return false;
              }
              // code from https://github.com/chartjs/Chart.js/blob/master/src/core/core.legend.js
              // modified to prevent hiding all legend items
              var index = legendItem.datasetIndex;
              var ci = this.chart;
              var meta = ci.getDatasetMeta(index);
              // See controller.isDatasetVisible comment
              var hidden =
                meta.hidden === null ? !ci.data.datasets[index].hidden : null;
              if (hidden) {
                var someShown = _.some(this.legendItems, function (item) {
                  return item !== legendItem && !item.hidden;
                });
                if (!someShown) return;
              }
              meta.hidden = hidden;
              // We hid a dataset ... rerender the chart
              ci.update();
            },
          },
          hover: {
            onHover: function (e) {
              // return false;
              var point = "";
              point = this.getElementAtEvent(e);
              if (point.length > 0) {
                // Prevent from flashing.
                if (
                  point[0]._index !==
                  _self.hoverIndex + "_" + point[0]._datasetIndex
                ) {
                  _self.hoverIndex =
                    point[0]._index + "_" + point[0]._datasetIndex;
                  document.getElementById("intersection-info").position =
                    "absolute";
                  document.getElementById("intersection-info").style.zIndex =
                    "99999";
                  document.getElementById("intersection-info").style.top =
                    e.pageY + "px";
                  document.getElementById("intersection-info").style.left =
                    e.pageX + "px";
                  document.getElementById("intersection-info").style.display =
                    "block";
                  document.getElementById("intersection-name").innerText =
                    _self.axes[point[0]._index].toString().replace(",", " ");
                  document.getElementById("intersection-domain").innerText =
                    _self.domains[point[0]._index];
                  document.getElementById(
                    "intersection-domain"
                  ).style.backgroundColor = _self.axeColors[point[0]._index];
                  document.getElementById("lmic-avg").style =
                    "color: " + env.geoColors.lmicspider;
                  document.getElementById(
                    "div-intersection-region"
                  ).style.display = "block";
                  document.getElementById("intersection-region").className =
                    "pr-2";
                  // if (point[0]._datasetIndex == 0) {
                  document.getElementById("intersection-country").innerText =
                    "Low income";
                  document.getElementById("div-intersection-country").style =
                    "color: " + env.geoColors.regionspider;
                  document.getElementById(
                    "intersection-country-value"
                  ).innerText =
                    _self.lowIncData[point[0]._index] == null
                      ? "Missing"
                      : _self.lowIncData[point[0]._index]; // || "Missing";
                  // } else if (point[0]._datasetIndex == 1) {
                  document.getElementById(
                    "intersection-region-value"
                  ).innerText =
                    _self.lowerMidIncData[point[0]._index] == null
                      ? "Missing"
                      : _self.lowerMidIncData[point[0]._index]; // || "Missing";
                  document.getElementById("intersection-region").innerText =
                    "Lower middle income";
                  document.getElementById("div-intersection-region").style =
                    "color: " + env.geoColors.incomespider;
                  // } else if (point[0]._datasetIndex == 2) {
                  document.getElementById(
                    "intersection-income-value"
                  ).innerText =
                    _self.upperMidIncData[point[0]._index] == null
                      ? "Missing"
                      : _self.upperMidIncData[point[0]._index]; // || "Missing";
                  document.getElementById("intersection-income").innerText =
                    "Upper middle income";
                  document.getElementById("div-intersection-income").style =
                    "color: " + env.brandingColors.navy;
                  // } else if (point[0]._datasetIndex == 3) {
                  document.getElementById(
                    "intersection-country-value-four"
                  ).innerText =
                    _self.highIncData[point[0]._index] == null
                      ? "Missing"
                      : _self.highIncData[point[0]._index]; // || "Missing";
                  document.getElementById(
                    "intersection-country-four"
                  ).innerText = "High income";
                  document.getElementById(
                    "div-intersection-country-four"
                  ).style = "color: " + env.brandingColors.orange;
                  // }
                  document.getElementById("intersection-lmic-value").innerText =
                    _self.globalData[point[0]._index] == null
                      ? "Missing"
                      : _self.globalData[point[0]._index];
                  document.getElementById(
                    "div-intersection-country"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-income"
                  ).style.display = "block";
                  document.getElementById(
                    "intersection-theme-link"
                  ).style.display = "none";
                  document.getElementById(
                    "intersection-domain-link"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-validity-power"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-country-four"
                  ).style.display = "block";
                  document.getElementById(
                    "div-intersection-country-five"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-country-six"
                  ).style.display = "none";
                  document.getElementById(
                    "div-intersection-country-seven"
                  ).style.display = "none";
                  //document.getElementById("intersection-scores-validity").innerText = Number(_self.intersections[point[0]._index].validity || 0).toFixed(2);
                  //document.getElementById("intersection-scores-power").innerText = Number(_self.intersections[point[0]._index].power || 0).toFixed(2);
                }
              } else {
                document.getElementById("intersection-info").style.display =
                  "none";
              }
              // var label = this.data.labels[point._index];
              //var value = this.data.datasets[point._datasetIndex].data[point._index];
              if (e.fromElement == undefined) {
                document.getElementById("intersection-info").style.opacity = "";
              } else {
                document.getElementById("intersection-info").style.opacity =
                  "1";
              }
              if (point.length) e.target.style.cursor = "pointer";
              else e.target.style.cursor = "default";
              //e.target.style.cursor = 'pointer';
            },
          },
          scale: {
            angleLines: {
              display: true,
              color: "rgb(243, 243, 243)",
              lineWidth: 2,
            },
            gridLines: {
              display: true,
              color: "rgb(243, 243, 243)",
              lineWidth: 2,
            },
            pointLabels: {
              fontColor: this.axeColors,
              fontSize: 11, // 12
              fontFamily: "basier", //'Montserrat',
              lineHeight: 1,
              onClick: function () {},
              callback: function (pointLabel, index) {
                if (index == 19) {
                  var words = pointLabel.split(" ");
                  var testLine = [];
                  testLine.push(" ");
                  for (var n = 0; n < words.length; n++) {
                    testLine.push(words[n]);
                  }
                  testLine.push(" ");
                  return testLine;
                } else {
                  return pointLabel;
                }
              },
            },
            ticks: {
              beginAtZero: true,
              max: 1.4,
              min: 0,
              stepSize: 0.2,
            },
          },
          tooltips: {
            enabled: false,
          },
        };
      }
    },
  },
  props: ["category", "iso", "paddingL", "paddingR", "paddingT", "paddingB"],
  async created() {
    // We will request the country OURSELF because of asyncness...
    this.regionalData = await this.getData(); // lets do an await before rendering other items.
    this.intersections = this.regionalData[0].intersections;
    this.regionalData.forEach((data) => {
      let arr = [];
      data.intersections.filter((i) => {
        this.intersections.forEach((int) => {
          if (int.taab == i.taab && int.theme == i.theme) {
            arr.push(i);
          }
        });
      });
      data.intersections = arr;
    });
    this.intersections.sort(function (a, b) {
      return a.taab.localeCompare(b.taab) || a.theme.localeCompare(b.theme);
    });
    this.regionalData.forEach((data) => {
      data.intersections.sort(function (a, b) {
        return a.taab.localeCompare(b.taab) || a.theme.localeCompare(b.theme);
      });
    });
    for (var i = 0; i < this.intersections.length; i++) {
      this.southAsiaData.push(
        this.calc(
          this.regionalData.filter((a) => a.region == "South Asia")[0]
            .intersections[i].gender_equality_region
        )
      );
      this.subSaharanData.push(
        this.calc(
          this.regionalData.filter((a) => a.region == "Sub-Saharan Africa")[0]
            .intersections[i].gender_equality_region
        )
      );
      this.eastAsiaData.push(
        this.calc(
          this.regionalData.filter((a) => a.region == "East Asia & Pacific")[0]
            .intersections[i].gender_equality_region
        )
      );
      this.europeCenAsiaData.push(
        this.calc(
          this.regionalData.filter(
            (a) => a.region == "Europe & Central Asia"
          )[0].intersections[i].gender_equality_region
        )
      );
      this.latinAmerData.push(
        this.calc(
          this.regionalData.filter(
            (a) => a.region == "Latin America & Caribbean"
          )[0].intersections[i].gender_equality_region
        )
      );
      this.northAmericaData.push(
        this.calc(
          this.regionalData.filter((a) => a.region == "North America")[0]
            .intersections[i].gender_equality_region
        )
      );
      this.middleEastData.push(
        this.calc(
          this.regionalData.filter(
            (a) => a.region == "Middle East & North Africa"
          )[0].intersections[i].gender_equality_region
        )
      );
      this.lowIncData.push(
        this.calc(
          this.regionalData.filter((a) => a.income == "Low income")[0]
            .intersections[i].gender_equality_income
        )
      );
      this.lowerMidIncData.push(
        this.calc(
          this.regionalData.filter((a) => a.income == "Lower middle income")[0]
            .intersections[i].gender_equality_income
        )
      );
      this.upperMidIncData.push(
        this.calc(
          this.regionalData.filter((a) => a.income == "Upper middle income")[0]
            .intersections[i].gender_equality_income
        )
      );
      this.highIncData.push(
        this.calc(
          this.regionalData.filter((a) => a.income == "High income")[0]
            .intersections[i].gender_equality_income
        )
      );
      this.globalData.push(
        this.calc(
          this.regionalData.filter((a) => a.region == "South Asia")[0]
            .intersections[i].gender_equality_global
        )
      );
      // this.axes.push(this.formatLabel(this.intersections[i].theme, 27));
      /* THIS IS A CUSTOM FIX. BUT IF WE ADD THEMES / DOMAINS, this will not fix them */
      if (
        this.intersections[i].theme.indexOf(
          "Information & Communication Technology"
        ) > -1
      ) {
        this.intersections[i].theme = "ICT";
      }
      if (
        this.intersections[i].theme.indexOf(
          "Political Participation & Leadership"
        ) > -1
      ) {
        this.intersections[i].theme = "Political Leadership";
      }
      if (
        this.intersections[i].theme.indexOf("Sexual & Reproductive Health") > -1
      ) {
        this.intersections[i].theme = "SRH";
      }
      if (this.intersections[i].theme.indexOf("Gender-based violence") > -1) {
        this.intersections[i].theme = "GBV";
      }
      this.axes.push(this.intersections[i].theme);
      // this.axes.push(label); // Do not ask me why this is... but otherwise text is not showing.
      this.domains.push(this.intersections[i].taab);
      this.max.push(1.4);
      this.one.push(1);
      const taabColors = {
        "Access to Resources": env.taabColors.accessToResources,
        "Law & Policy": env.taabColors.lawAndPolicy,
        "Power & Decision-Making": env.taabColors.powerAndDecision,
        "Knowledge & Beliefs": env.taabColors.knowledgeAndBeliefs,
        "Human Dignity": env.taabColors.humanDignity,
        "Roles & Responsibilities": env.taabColors.rolesAndResponsibilities,
      };
      this.axeColors.push(taabColors[this.intersections[i].taab]);
    }
    this.swapElements(this.axes, 19, 20);
    this.swapElements(this.southAsiaData, 19, 20);
    this.swapElements(this.subSaharanData, 19, 20);
    this.swapElements(this.eastAsiaData, 19, 20);
    this.swapElements(this.europeCenAsiaData, 19, 20);
    this.swapElements(this.northAmericaData, 19, 20);
    this.swapElements(this.latinAmerData, 19, 20);
    this.swapElements(this.middleEastData, 19, 20);
    this.swapElements(this.globalData, 19, 20);
    this.swapElements(this.lowIncData, 19, 20);
    this.swapElements(this.lowerMidIncData, 19, 20);
    this.swapElements(this.upperMidIncData, 19, 20);
    this.swapElements(this.highIncData, 19, 20);
    /**
     *
     * --------------------------------------
     *   UNCOMMENT THIS TO GET OLD HOVERBOX
     * -------------------------------------
     *
     */
    this.fillData("region");
    const _self2 = this;
    window.addEventListener("beforeprint", function () {
      const Chart = _self2.$data._chart;
      Chart.resize();
    });
    //const Chart = _self2.$data._chart;
    //Chart.resize();
    /*
    window.addEventListener("onload", function() {
    });
    */
    setTimeout(function () {
      _self2.$data._chart.update();
    }, 1000);
  },
};
</script>

<style></style>
