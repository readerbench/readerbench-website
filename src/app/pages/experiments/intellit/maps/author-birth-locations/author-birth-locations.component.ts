/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_europeLow from "@amcharts/amcharts4-geodata/region/world/europeLow";
import am4geodata_romaniaLow from "@amcharts/amcharts4-geodata/romaniaLow";


export function createChart(htmlPlaceholder) {
    let regionalSeries: any = {};
    let currentSeries;

    // Create map instance
    let chart = am4core.create(htmlPlaceholder, am4maps.MapChart);

    chart.maxZoomLevel = 32;

    // Set map definition
    chart.geodata = am4geodata_europeLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Add button
    let zoomOut = chart.tooltipContainer.createChild(am4core.ZoomOutButton);
    zoomOut.align = "right";
    zoomOut.valign = "top";
    zoomOut.margin(20, 20, 20, 20);
    zoomOut.events.on("hit", function () {
        if (currentSeries) {
            currentSeries.hide();
        }
        chart.goHome();
        zoomOut.hide();
        currentSeries = regionalSeries.RO.series;
        currentSeries.show();
    });
    zoomOut.hide();

    // Create map polygon series
    let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.useGeodata = true;
    worldSeries.calculateVisualCenter = true;

    // Configure series
    let polygonTemplate = worldSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    // polygonTemplate.fill = chart.colors.getIndex(0);

    chart.events.on("ready", function (ev) {
        chart.zoomToMapObject(worldSeries.getPolygonById("RO"));
    });

    worldSeries.data = [{
        id: "RO",
        disabled: true
    }];

    let romaniaSeries = chart.series.push(new am4maps.MapPolygonSeries());
    romaniaSeries.geodata = am4geodata_romaniaLow;
    polygonTemplate = romaniaSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = chart.colors.getIndex(0);
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(1);

    // Load data when map polygons are ready
    chart.events.on("ready", loadStores);

    // Loads store data
    function loadStores() {
        let loader = new am4core.DataSource();
        loader.url = "assets/components/birth-locations.json";
        loader.events.on("parseended", function (ev) {
            setupStores(ev.target.data);
        });
        loader.load();
    }

    // Creates a series
    function createSeries(heatfield) {
        let series = chart.series.push(new am4maps.MapImageSeries());
        series.dataFields.value = heatfield;

        let template = series.mapImages.template;
        template.verticalCenter = "middle";
        template.horizontalCenter = "middle";
        template.propertyFields.latitude = "lat";
        template.propertyFields.longitude = "long";
        template.tooltipText = "{name}:\n[bold]{stores} authors[/]";

        let circle = template.createChild(am4core.Circle);
        circle.radius = 10;
        circle.fillOpacity = 0.7;
        circle.verticalCenter = "middle";
        circle.horizontalCenter = "middle";
        circle.nonScaling = true;

        let label = template.createChild(am4core.Label);
        label.text = "{stores}";
        label.fill = am4core.color("#fff");
        label.verticalCenter = "middle";
        label.horizontalCenter = "middle";
        label.nonScaling = true;

        let heat = series.heatRules.push({
            target: circle,
            property: "radius",
            min: 10,
            max: 30
        });

        // Set up drill-down
        series.mapImages.template.events.on("hit", function (ev) {

            // Determine what we've clicked on
            let data: any = ev.target.dataItem.dataContext;

            // No id? Individual store - nothing to drill down to further
            if (!data.target) {
                return;
            }

            // Create actual series if it hasn't been yet created
            if (!regionalSeries[data.target].series) {
                regionalSeries[data.target].series = createSeries("count");
                regionalSeries[data.target].series.data = data.markerData;
            }

            // Hide current series
            if (currentSeries) {
                currentSeries.hide();
            }

            // Control zoom
            if (data.type == "state") {
                let statePolygon = worldSeries.getPolygonById("RO-" + data.state);
                if (!statePolygon) {
                    statePolygon = romaniaSeries.getPolygonById("RO-" + data.state);
                }
                chart.zoomToMapObject(statePolygon);
            }
            else if (data.type == "city") {
                chart.zoomToGeoPoint({
                    latitude: data.lat,
                    longitude: data.long
                }, 64, true);
            }
            zoomOut.show();

            // Show new targert series
            currentSeries = regionalSeries[data.target].series;
            currentSeries.show();
        });

        return series;
    }

    function setupStores(data) {

        // Init country-level series
        regionalSeries.RO = {
            markerData: [],
            series: createSeries("stores")
        };

        // Set current series
        currentSeries = regionalSeries.RO.series;

        // Process data
        am4core.array.each(data.query_results, function (storeData: any) {

            // Get store data
            let store = {
                state: storeData.MAIL_ST_PROV_C,
                long: am4core.type.toNumber(storeData.LNGTD_I),
                lat: am4core.type.toNumber(storeData.LATTD_I),
                location: storeData.co_loc_n,
                city: storeData.mail_city_n,
                count: am4core.type.toNumber(storeData.count)
            };

            // Process state-level data
            if (regionalSeries[store.state] == undefined) {
                let statePolygon: any = worldSeries.getPolygonById("RO-" + store.state);
                if (!statePolygon) {
                    statePolygon = romaniaSeries.getPolygonById("RO-" + store.state);
                }
                if (statePolygon) {

                    // Add state data
                    regionalSeries[store.state] = {
                        target: store.state,
                        type: "state",
                        name: statePolygon.dataItem.dataContext.name,
                        count: store.count,
                        stores: store.count,
                        lat: statePolygon.visualLatitude,
                        long: statePolygon.visualLongitude,
                        state: store.state,
                        markerData: []
                    };
                    regionalSeries.RO.markerData.push(regionalSeries[store.state]);

                }
                else {
                    // State not found
                    return;
                }
            }
            else {
                regionalSeries[store.state].stores++;
                regionalSeries[store.state].count += store.count;
            }

            // Process city-level data
            if (regionalSeries[store.city] == undefined) {
                regionalSeries[store.city] = {
                    target: store.city,
                    type: "city",
                    name: store.city,
                    count: store.count,
                    stores: store.count,
                    lat: store.lat,
                    long: store.long,
                    state: store.state,
                    markerData: []
                };
                regionalSeries[store.state].markerData.push(regionalSeries[store.city]);
            }
            else {
                regionalSeries[store.city].stores++;
                regionalSeries[store.city].count += store.count;
            }

            // Process individual store
            regionalSeries[store.city].markerData.push({
                name: store.location,
                count: store.count,
                stores: store.count,
                lat: store.lat,
                long: store.long,
                state: store.state
            });

        });

        regionalSeries.RO.series.data = regionalSeries.RO.markerData;
    }

    return chart;
}
