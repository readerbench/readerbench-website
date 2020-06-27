import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ExperimentsMenuComponent } from '../sections/menu/menu.component';
import { ExperimentsComponent } from '../experiments.component';
import { IntellitData } from './intellit.data';

import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as birthLocationsChart from "./maps/author-birth-locations/author-birth-locations.component";
import * as travelsChart from "./maps/author-travels/author-travels.component";
import * as timelineChart from "./misc/author-timeline/author-timeline.component";

import { NgxSpinnerService } from "ngx-spinner";

am4core.useTheme(am4themes_animated);

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-demo-intellit',
  templateUrl: './intellit.component.html',
  styleUrls: ['./intellit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})

export class IntellitComponent implements OnInit {

  componentTitle: string;
  loading: boolean;
  showResults: boolean;
  sections = [];
  htmlPlaceholder = "chartdiv";
  currentGraph: any;
  section: any;

  private chart: am4core.Sprite;

  constructor(private http: HttpClient, 
    private zone: NgZone, 
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService) {

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      this.deleteChart()
    });
  }

  private deleteChart() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }

  ngOnInit() {
    this.componentTitle = IntellitData.componentTitle;
    this.sections = IntellitData.sections;

    this.loading = false;
    this.showResults = false;

    for (let i = 0; i < IntellitData.sections.length; i++) {
      for (let j = 0; j < IntellitData.sections[i].graphs.length; j++) {
        if (IntellitData.sections[i].graphs[j].type === "spec") {
          const url = IntellitData.sections[i].graphs[j].schema;
          this.currentGraph = IntellitData.sections[i].graphs[j];
          this.section = IntellitData.sections[i];
          this.getJSON(url).subscribe(
            response => {
              this.displayDiagram(response);
            });
          return;
        }
      }
    }
  }

  onClickSection(section) {
    this.section = section;
    this.cdr.detectChanges();
  }

  onClickGraph(graph) {
    // this.spinner.show();
    // this.cdr.detectChanges();
    this.deleteChart();
    this.currentGraph = graph;
    if (graph.type === "spec") {
      this.getJSON(graph.schema).subscribe(
        response => {
          this.displayDiagram(response);
        }
      );
    } else {
      if (graph.schema === "author-travels") {
        this.chart = travelsChart.createChart(this.htmlPlaceholder);
      } else if (graph.schema === "author-birth-locations") {
        this.chart = birthLocationsChart.createChart(this.htmlPlaceholder);
      } else if (graph.schema === "authors-timeline") {
        this.chart = timelineChart.createChart(this.htmlPlaceholder)
      }
    }
  }

  private displayDiagram(specJson) {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.createFromConfig(specJson, this.htmlPlaceholder, am4charts.XYChart);
      this.chart = chart;
    });
  }

}
