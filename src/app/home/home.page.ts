import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeTitleService } from '../services/home-title.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InstallPwaService } from '../services/install-pwa.service';
import { AlertController } from '@ionic/angular';
import { ChangeBookDataService } from '../services/change-book-data.service';
import { BooksDataService } from '../services/books-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  constructor(private readonly titleService: HomeTitleService,
    private readonly installPwaService: InstallPwaService,
    private readonly alertController: AlertController,
    private readonly changeBookData: ChangeBookDataService,
    private readonly booksDataService: BooksDataService) {}

  public title: string;
  public showBackButton: boolean;

  private alert: HTMLIonAlertElement

  private _showInstallPwaButton: boolean;
  private installModalShowed: boolean = false;
  public get showInstallPwaButton(): boolean{
    return this._showInstallPwaButton;
  }
  public set showInstallPwaButton(value: boolean){
    this._showInstallPwaButton = value;
    if(value && !this.installModalShowed){
      this.showAlertInstall();
      this.installModalShowed = true;
    }else{
      this.alertDismiss();
    }
  }
  
  private onDestroy: Subject<any> = new Subject();

  public installPwa(){
    this.installPwaService.installPwa();
  }

  public async showAlertInstall(){
    this.alert = await this.alertController.create({
      message: 'You want to install our application?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.installPwa()
        },
        {
          text: 'No, maybe later',
          role: 'cancel'
        }
      ]
    })
    await this.alert.present();
  }

  public alertDismiss(){
    if(!this.alert){
      return;
    }
    this.alert.dismiss();
  }

  ngOnInit(){
    this.showBackButton = this.titleService.showBackButton;
    this.titleService.titleChangeEvent.
      pipe(takeUntil(this.onDestroy)).subscribe((title) => this.title = title);
    this.titleService.showBackButtonChange.
      pipe(takeUntil(this.onDestroy)).subscribe((show) => this.showBackButton = show);
    this.showInstallPwaButton = this.installPwaService.prompt != null;
    this.installPwaService.promptChange.pipe(takeUntil(this.onDestroy)).
      subscribe(() => this.showInstallPwaButton = this.installPwaService.prompt != null)
    this.changeBookData.apiDataPushedEvent.pipe(takeUntil(this.onDestroy)).
      subscribe(async () => {
        await this.booksDataService.loadBooks();
        this.alert = await this.alertController.create({
          message: 'Update data is successful',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        })
        await this.alert.present();
      })
    this.changeBookData.sendOfflineData();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
