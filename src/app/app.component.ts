import { Component, NgZone, OnInit } from '@angular/core';
import { SitemorseService } from '../shared/sitemorse.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { LoadingDialogComponent} from "./loading-dialog/loading-dialog.component";
import mockData from '../mock-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    //Settings
    public priorities: any;
    public externalUrl: string;
    public error = false;
    public loading = true;
    public dialogRef: MatDialogRef<LoadingDialogComponent>;

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

    public mockdata:any;

    constructor (private sitemorse: SitemorseService,
                 private zone: NgZone,
                 private dialog: MatDialog) {
      this.mockdata = mockData;
    }

    ngOnInit () {
        this.sitemorse.contextChanged$.subscribe((context) => {
            console.log("Requesting data");
            this.openDialog();

            this.error = false;
            this.loading = true;

            //-------------------------------
            //WARNING - HERE BE FILTHY HACKS

            var url: string = context.data.pageUrl;

            //Fix missing end slash on homepage
            if (url.slice(-4) === "site") url += "/";

            //Change URL to use preview mount (ONLY WORKS FOR SPECIFIC MOUNT CONFIG)
            url = url.replace("/site/", "/site/preview/");

            console.log("URL: " + url);
            //-------------------------------

            this.sitemorse.analyzeUrl(url)
                .subscribe((result) => {
                  this.loading = false;
                  console.log("Data received, processing results");
                  console.log(result);
                  this.processResults(result);
                  this.closeDialog();
                }, () => {
                    this.error = true;
                    this.loading = false;
                    console.log("error");
                    this.closeDialog();
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

        console.log("Processing done")
    }

    openDialog() {
      console.log("Opening Dialog")
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialogRef = this.dialog.open(LoadingDialogComponent, dialogConfig);
    }

    closeDialog() {
      console.log("Closing Dialog")
      this.dialogRef.close();
    }
}
