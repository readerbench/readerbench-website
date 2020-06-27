/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

export function createChart(htmlPlaceholder) {
    let chart = am4core.create(htmlPlaceholder, am4plugins_timeline.SerpentineChart);
    chart.curveContainer.padding(20, 50, 50, 50);
    chart.levelCount = 4;
    chart.yAxisRadius = am4core.percent(20);
    chart.yAxisInnerRadius = am4core.percent(2);
    chart.maskBullets = false;

    let colorSet = new am4core.ColorSet();

    chart.data = [{
        "name": "Năsăud",
        "start": "1866-01-01",
        "end": "1866-12-01",
        "category": "",
        "color": colorSet.getIndex(0)
    },
    {
        "name": "Hordou",
        "start": "1866-12-01",
        "end": "1876-01-01",
        "category": "",
        "color": colorSet.getIndex(1)
    },
    {
        "name": "Năsăud",
        "start": "1876-01-01",
        "end": "1882-01-01",
        "category": "",
        "color": colorSet.getIndex(3)
    },
    {
        "name": "Roman",
        "start": "1882-01-01",
        "end": "1884-01-01",
        "category": "",
        "color": colorSet.getIndex(4)
    },
    {
        "name": "Cluj",
        "start": "1884-01-01",
        "end": "1884-12-01",
        "category": "",
        "color": colorSet.getIndex(6)
    },
    {
        "name": "Hordou",
        "start": "1884-12-01",
        "end": "1887-01-01",
        "category": "",
        "color": colorSet.getIndex(7)
    },
    {
        "name": "Sibiu",
        "start": "1887-01-01",
        "end": "1893-01-01",
        "category": "",
        "color": colorSet.getIndex(8)
    },
    {
        "name": "München",
        "start": "1893-01-01",
        "end": "1898-01-01",
        "category": "",
        "color": colorSet.getIndex(10)
    },
    {
        "name": "Austria",
        "start": "1898-01-01",
        "end": "1898-12-01",
        "category": "",
        "color": colorSet.getIndex(11)
    },
    {
        "name": "Karlsbad",
        "start": "1898-12-01",
        "end": "1902-01-01",
        "category": "",
        "color": colorSet.getIndex(12)
    },
    {
        "name": "Italia",
        "start": "1902-01-01",
        "end": "1902-12-01",
        "category": "",
        "color": colorSet.getIndex(13)
    },
    {
        "name": "Neamţ",
        "start": "1902-12-01",
        "end": "1908-01-01",
        "category": "",
        "color": colorSet.getIndex(14)
    },
    {
        "name": "Sibiu",
        "start": "1908-01-01",
        "end": "1909-01-01",
        "category": "",
        "color": colorSet.getIndex(15)
    },
    {
        "name": "Năsăud",
        "start": "1909-01-01",
        "end": "1909-12-01",
        "category": "",
        "color": colorSet.getIndex(16)
    },
    {
        "name": "Hordou",
        "start": "1909-12-01",
        "end": "1911-01-01",
        "category": "",
        "color": colorSet.getIndex(17)
    },
    {
        "name": "Berlin",
        "start": "1911-01-01",
        "end": "1911-09-01",
        "category": "",
        "color": colorSet.getIndex(18)
    },
    {
        "name": "Karlsbad",
        "start": "1911-09-01",
        "end": "1911-12-01",
        "category": "",
        "color": colorSet.getIndex(19)
    },
    {
        "name": "Blaj",
        "start": "1911-12-01",
        "end": "1912-01-01",
        "category": "",
        "color": colorSet.getIndex(20)
    },
    {
        "name": "Italia",
        "start": "1912-01-01",
        "end": "1912-12-01",
        "category": "",
        "color": colorSet.getIndex(21)
    },
    {
        "name": "Veneţia",
        "start": "1912-12-01",
        "end": "1913-01-01",
        "category": "",
        "color": colorSet.getIndex(22)
    },
    {
        "name": "Karlsbad",
        "start": "1913-01-01",
        "end": "1913-12-01",
        "category": "",
        "color": colorSet.getIndex(23)
    },
    {
        "name": "București",
        "start": "1913-12-01",
        "end": "1918-01-01",
        "category": "",
        "color": colorSet.getIndex(24)
    }
];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    chart.fontSize = 11;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.disabled = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.5;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);
    series.columns.template.tooltipText = "{categoryX}";
    series.tooltip.pointerOrientation = "down";
    series.tooltip.dy = -5;

    series.dataFields.openDateX = "start";
    series.dataFields.dateX = "end";
    series.dataFields.categoryY = "category";
    series.dataFields.categoryX = "name";
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = "color"; // get color from data
    series.columns.template.propertyFields.stroke = "color";
    series.strokeWidth = 10;
    series.columns.template.fillOpacity = 0.6;
    

    let eventSeries = chart.series.push(new am4plugins_timeline.CurveLineSeries());
    eventSeries.dataFields.dateX = "eventDate";
    eventSeries.dataFields.categoryY = "category";
    eventSeries.data = [
        { category: "", eventDate: "1885-05-01", year:"1885", publication: "Blăstem de mamă", height: 20, bulletColor: colorSet.getIndex(7) },
        { category: "", eventDate: "1885-09-01", year:"1885", publication: "Pe pământul\nturcului", height: -20, bulletColor: colorSet.getIndex(7) },
        { category: "", eventDate: "1886-05-01", year:"1886", publication: "Draga mamei", height: 20, bulletColor: colorSet.getIndex(7) },
        { category: "", eventDate: "1886-09-01", year:"1886", publication: "Fata craiului\ndin cetini" , height: -20, bulletColor: colorSet.getIndex(7)},
        { category: "", eventDate: "1887-05-01", year:"1887", publication: "Fulger", height: 20, bulletColor: colorSet.getIndex(8) },
        { category: "", eventDate: "1893-05-01", year:"1893", publication: "Balade și idile", height: -20, bulletColor: colorSet.getIndex(10) },
        { category: "", eventDate: "1896-05-01", year:"1896", publication: "Fire de tort", height: 20, bulletColor: colorSet.getIndex(10) },
        { category: "", eventDate: "1896-09-01", year:"1896", publication: "Mazepa", height: -20, bulletColor: colorSet.getIndex(10) },
        { category: "", eventDate: "1897-05-01", year:"1897", publication: "Antologie sanscrită", height: 20, bulletColor: colorSet.getIndex(10) },
        { category: "", eventDate: "1897-09-01", year:"1897", publication: "Sacontala", height: -20, bulletColor: colorSet.getIndex(10) },
        { category: "", eventDate: "1899-05-01", year:"1899", publication: "Povestea unei\ncoroane de oțel", height: 20, bulletColor: colorSet.getIndex(12) },
        { category: "", eventDate: "1899-09-01", year:"1899", publication: "Războiul nostru\npentru neatârnare", height: -20, bulletColor: colorSet.getIndex(12) },
        { category: "", eventDate: "1901-05-01", year:"1901", publication: "Din țara Basarabilor", height: 20, bulletColor: colorSet.getIndex(12) },
        { category: "", eventDate: "1902-05-01", year:"1902", publication: "Ziarul unui\n pierde-vară", height: -20, bulletColor: colorSet.getIndex(12) },
        { category: "", eventDate: "1903-05-01", year:"1903", publication: "Dintr-ale\n neamului nostru", height: 20, bulletColor: colorSet.getIndex(14) },
        { category: "", eventDate: "1904-05-01", year:"1904", publication: "Cântece de vitejie", height: -20, bulletColor: colorSet.getIndex(14) },
        { category: "", eventDate: "1906-05-01", year:"1906", publication: "Georgice", height: 20, bulletColor: colorSet.getIndex(14) },
        { category: "", eventDate: "1906-09-01", year:"1906", publication: "Valuri alinate", height: -20, bulletColor: colorSet.getIndex(14) },
        { category: "", eventDate: "1908-05-01", year:"1908", publication: "Parmeno", height: 20,bulletColor: colorSet.getIndex(15) },
        { category: "", eventDate: "1909-05-01", year:"1909", publication: "Superstițiunile păgubitoare\n ale poporului nostru", height: -20, bulletColor: colorSet.getIndex(16) },
        { category: "", eventDate: "1910-05-01", year:"1910", publication: "Don Carlos", height: 20, bulletColor: colorSet.getIndex(17) },
        { category: "", eventDate: "1913-05-01", year:"1913", publication: "Balade", height: -20, bulletColor: colorSet.getIndex(22)}
    ]
    eventSeries.strokeOpacity = 0;

    // Creating a bullet
    let flagBullet = eventSeries.bullets.push(new am4plugins_bullets.FlagBullet());

    // Setting label to display values from data
    flagBullet.label.text = "{year}\n[bold]{publication}[/]";
    flagBullet.label.textAlign = "middle";

    // Allowing controlling pole height via data (negative height means upside down flag)
    // We also instruct pole to draw its color from "bulletColor" in data
    flagBullet.propertyFields.poleHeight = "height";
    flagBullet.pole.propertyFields.stroke = "bulletColor"; 

    // Background is a WavedRectangle, which we configure, as well as instruct
    // it to get its fill and border color from data field "bulletColor"
    flagBullet.background.waveLength = 0;
    flagBullet.background.fillOpacity = 0.5;
    flagBullet.background.propertyFields.fill = "bulletColor";
    flagBullet.background.propertyFields.stroke = "bulletColor";

    // Add a circle to pole base.
    // Bullet is a Container, so we can add there anything.
    let circle = flagBullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.strokeWidth = 2;
    circle.stroke = am4core.color("#fff");
    circle.propertyFields.fill = "bulletColor";

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center"

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    return chart;
}