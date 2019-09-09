import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class InstallPwaService{

    public promptChange: EventEmitter<any> = new EventEmitter();
    private _prompt: any;

    private appinstalled = false;

    public get prompt(): any{
        return this._prompt;
    }
    public set prompt(value: any){
        this._prompt = value;
        if(value && !this.appinstalled){
            window.addEventListener('appinstalled', () => {
                this.appinstalled = true;
                this.prompt = null;
            });
        }
        this.promptChange.emit(value);
    }

    public installPwa(){
        if(!this.prompt){
            throw new Error('Before install prompt faild');
        }

        this.prompt.prompt();
        this.prompt.userChoice.then((choiceResult) => {  
            if (choiceResult.outcome === 'accepted') {
                this.prompt = null;
            } else {
                console.log('User dismissed the prompt');
            }
        })
    }

}