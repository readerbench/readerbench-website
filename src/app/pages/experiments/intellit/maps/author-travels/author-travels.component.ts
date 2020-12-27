/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


export function createChart(htmlPlaceholder) {
    //Define line colors
    const colors = [
        "#2569b4", "#19a1db", "#d51968", "#f47521", "#f7a81b",
        "#C70039", "#FF5733", "#FF8D1A", "#FFC300", "#EDDD53",
        "#ADD45C", "#57C785", "#00BAAD", "#2A7B9B", "#3D3D6B",
        "#511849", "#900C3F", "#3F900C", "#ffc0cb", "#c71585",
    ]

    // Define marker path
    // let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
    // Create map instance
    let chart = am4core.create(htmlPlaceholder, am4maps.MapChart);
    // let interfaceColors = new am4core.InterfaceColorSet();

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Mercator();

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Set initial zoom
    chart.homeZoomLevel = 2.5;
    chart.homeGeoPoint = {
        latitude: 51,
        longitude: -23
    };

    chart.legend = new am4maps.Legend();
    chart.legend.position = "left";
    chart.legend.scrollable = true;

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.hiddenInLegend = true;

    function loadTrips() {
        let loader = new am4core.DataSource();
        loader.url = "assets/components/canonical-paths.json";
        loader.events.on("parseended", function (ev) {

            let authors = ev.target.data;
            for (let i = 0; i < authors.length; i++) {
                let lines = [];
                let j = 0;
                for (j = 0; j < authors[i].places.length - 1; j++) {
                    let start = authors[i].places[j];
                    let end = authors[i].places[j + 1];
                    let line = {
                        "multiGeoLine": [
                            [
                                {
                                    "latitude": start.latitude,
                                    "longitude": start.longitude
                                },
                                {
                                    "latitude": end.latitude,
                                    "longitude": end.longitude
                                }
                            ]
                        ],
                        "tooltipText": `${authors[i].name}: ${start.name} (${start.year}) - ${end.name} (${end.year})`
                    }
                    lines.push(line);
                }
                addLineSerie(lines, i, authors[i].name);
            }

        });
        loader.load();
    }

    loadTrips();

    let allLineSeries = [];

    function addLineSerie(data, index, name) {
        let lineSeries = chart.series.push(new am4maps.MapLineSeries());
        lineSeries.name = name;
        lineSeries.dataFields.multiGeoLine = "multiGeoLine";
        lineSeries.fill = am4core.color(colors[index % colors.length]);

        for (let i = 0; i < data.length; i++) {
            let line = lineSeries.mapLines.create();
            line.multiGeoLine = data[i].multiGeoLine
            line.tooltipText = data[i].tooltipText;
            line.stroke = am4core.color(colors[index % colors.length]);
            line.fill = am4core.color(colors[index % colors.length]);
            line.line.strokeOpacity = 1;
            line.nonScalingStroke = true;
            line.arrow.nonScaling = true;
            line.arrow.width = 6;
            line.arrow.height = 8;
            line.tooltipPosition = "pointer";
            line.strokeWidth = 1.5;

            let bulletStart = line.lineObjects.create();
            bulletStart.nonScaling = true;
            bulletStart.position = 0;

            let circleStart = bulletStart.createChild(am4core.Circle);
            circleStart.radius = 3;
            circleStart.fill = am4core.color("#fff");
            circleStart.strokeWidth = 1.5;
            circleStart.stroke = am4core.color("#000");

            let bulletEnd = line.lineObjects.create();
            bulletEnd.nonScaling = true;
            bulletEnd.position = 1;

            let circleEnd = bulletEnd.createChild(am4core.Circle);
            circleEnd.radius = 3;
            circleEnd.fill = am4core.color("#fff");
            circleEnd.strokeWidth = 1.5;
            circleEnd.stroke = am4core.color("#000");
        }

        allLineSeries.push(lineSeries);
    }

    // Create series
    function createSeries(name) {
        var series = chart.series.push(new am4maps.MapLineSeries());
        series.name = name;
        series.strokeWidth = 2;

        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color(colors[5]));
        gradient.addColor(am4core.color(colors[7]));
        gradient.addColor(am4core.color(colors[11]));
        gradient.addColor(am4core.color(colors[13]));
        gradient.rotation = -135;

        series.fill = gradient;

        return series;
    }

    let toggleAll = createSeries("Toggle All");

    toggleAll.events.on("hidden", function () {
        for (let i = 0; i < allLineSeries.length; i++) {
            allLineSeries[i].hide();
        }
    });

    toggleAll.events.on("shown", function () {
        for (let i = 0; i < allLineSeries.length; i++) {
            allLineSeries[i].show();
        }
    });

    return chart;
}