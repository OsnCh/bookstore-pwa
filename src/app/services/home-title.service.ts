import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HomeTitleService{

    private _showBackButton: boolean = false;
    public showBackButtonChange: EventEmitter<boolean> = new EventEmitter();
    public get showBackButton(): boolean{
        return this._showBackButton;
    }
    public set showBackButton(value: boolean){
        this._showBackButton = value;
        this.showBackButtonChange.emit(value);
    }

    public titleChangeEvent: EventEmitter<string> = new EventEmitter();
    private _title: string;

    public get title():string{
        return this._title;
    } 

    public set title(value: string){
        this._title = value;
        this.titleChangeEvent.emit(value);
    }

}