import { Component, NgZone, OnInit, ApplicationRef } from '@angular/core';
import { SitemorseService } from '../shared/sitemorse.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public priorities: any;
    public externalUrl: string;
    public error = false;
    public loading = true;
    public test = true;

    // Chart
    public chartType = 'bar';
    public chartLabels: string[] = [];
    public chartData: any[] = [];
    public chartColors: any[] = [];

    private chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
      }
    };
    public chartLegend: boolean = false;

    constructor (private sitemorse: SitemorseService,
                 private zone: NgZone,
                 private app: ApplicationRef) {}

    ngOnInit () {
        this.sitemorse.contextChanged$.subscribe((context) => {
            console.log("Requesting data");

            this.error = false;
            this.loading = true;

            //Fix missing end slash on homepage - extremely hacky
            var url: string = context.data.pageUrl;
            if (url.slice(-4) === "site") url += "/";
            console.log("URL: " + url);

            this.sitemorse.analyzeUrl(url)
                .subscribe((result) => {
                  this.loading = false;
                  console.log("Data received, processing results");
                  console.log(result);
                  this.processResults(result);

                }, () => {
                    this.error = true;
                    this.loading = false;
                    console.log("error");
                });
        });
    }

    reset () {
        this.chartColors = [];
        this.chartLabels = [];
        this.chartData = [];
    }

    processResults (data) {
        this.reset();

        //temp arrays
        var values: any[] = [];
        var bgcolors: string[] = [];
        var labels: any[] = [];
        var datasets: any[] = [];
        var colors: any[] = [];

        this.zone.run(() => {

            Object.keys(data.result.scores).forEach((key) => {

                const item = data.result.scores[key];
                if (item.score !== null && item.score >= 0 && item.score <= 10) {
                    values.push(item.score);
                    if (item.score < 4) {
                        bgcolors.push('rgba(238, 115, 109, 0.8)'); //red
                    } else if (item.score < 7) {
                        bgcolors.push('rgba(255, 146, 60, 0.8)'); //orange
                    } else {
                        bgcolors.push('rgba(51, 205, 153, 0.8)'); //green
                    }
                    labels.push(item.title);
                }

            });
            //transform
            datasets = [{
                label: "", data: values
              }];
            colors = [{
                backgroundColor: bgcolors
              }];

            //Record
            this.chartLabels = labels;
            this.chartData = datasets;
            this.chartColors = colors;

            this.priorities = data.result.priorities;
            this.externalUrl = data.result.url;
        });

        //Force app refresh
        this.app.tick();
        console.log("Processing done")
    }
}
