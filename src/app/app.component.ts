import { Component, NgZone, OnInit } from '@angular/core';
import { SitemorseService } from '../shared/sitemorse.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { LoadingDialogComponent} from "./loading-dialog/loading-dialog.component";
import UiExtension from '@bloomreach/ui-extension';
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
    public mockdata:any;

    constructor (private sitemorse: SitemorseService,
                 private zone: NgZone,
                 private dialog: MatDialog) {
      this.mockdata = mockData;
    }

    ngOnInit () {
      let self = this;
      UiExtension.register().then((ui) => {

        self.error = false;
        function showAnalytics(page) {

          let dialogRef = self.openDialog();

          //Prep config data
          let config = JSON.parse(ui.extension.config);
          let baseurl = config.baseUrl;
          let licensekey = config.licenseKey;
          let previewmountname = config.previewMountName;

          //-------------------------------
          //WARNING - HERE BE FILTHY HACKS

          var searchurl = page.url;

          //Fix missing end slash on homepage
          if (searchurl.slice(-4) === "site") {
            console.log("Fixing missing trailing slash");
            searchurl += "/";
          }
          
          //Change URL to use preview mount (ONLY WORKS FOR SPECIFIC MOUNT CONFIG)
          searchurl = searchurl.replace("/site/", "/site/" + previewmountname + "/");

          //When not on localhost, replace scheme to use https
          if (searchurl.search("localhost") == -1) {
            console.log("replacing http with https")
            searchurl = searchurl.replace("http://", "https://");
          }

          console.log("Analyzing URL: " + searchurl);
          //-------------------------------

          self.sitemorse.analyzeUrl(baseurl,searchurl,licensekey)
            .subscribe((result) => {
              console.log("Data received, processing results");
              console.log(result);
              self.processResults(result);
              self.closeDialog(dialogRef);
            }, () => {
              self.error = true;
              console.log("error");
              self.closeDialog(dialogRef);
            });
        }

        ui.channel.page.get().then(showAnalytics);
        ui.channel.page.on('navigate', showAnalytics);
      });
    }

    processResults (data) {
      this.zone.run(() => {
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

      return this.dialog.open(LoadingDialogComponent, dialogConfig);
    }

    closeDialog(dialogRef: MatDialogRef<LoadingDialogComponent>) {
      console.log("Closing Dialog")
      dialogRef.close();
    }
}
