import { HomeTitleService } from 'src/app/services/home-title.service';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseBookComponent implements OnDestroy{

    protected onDestroy: Subject<any> = new Subject();

    constructor(protected readonly titleService: HomeTitleService) {}

    public get title(): string{
        return this.titleService.title;
    }
    public set title(value: string){
        this.titleService.title = value;
    }

    public get showBackButton(): boolean{
        return this.titleService.showBackButton;
    }
    public set showBackButton(value: boolean){
        this.titleService.showBackButton = value;
    }

    ngOnDestroy(){
        this.onDestroy.next();
        this.onDestroy.complete();
    }

}