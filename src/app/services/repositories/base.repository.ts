import { BaseEntity } from 'src/app/shared/entities/base.entity';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { environment } from 'src/environments/environment';
import { InitRepositoryModel } from 'src/app/shared/models/repositories/init.repository.model';

export class BaseRepository<TEntity extends BaseEntity>{

    protected readonly instance = new NgxIndexedDB(environment.indexDBSettings.name, environment.indexDBSettings.version);
    protected readonly openPromise: Promise<any>;

    constructor(private initModel: InitRepositoryModel){
        if(!initModel || !initModel.name){
            throw new Error('Init repository model not valid.')
        }
        this.openPromise = this.instance.openDatabase(environment.indexDBSettings.version, evt => {
            let objectStore = evt.currentTarget.result.createObjectStore(this.initModel.name, { keyPath: '_id', autoIncrement: true });
         
            if(!initModel.properties){
                return;
            }
            initModel.properties.forEach(element => {
                objectStore.createIndex(element.name, element.name, { unique: element.unique})
            });
        });
    }

    public async add(value: TEntity): Promise<void>{
        await this.awaitOpen();
        await this.instance.add(this.initModel.name, value)
    }

    public async getAll(): Promise<TEntity[]>{
        await this.awaitOpen();
        return this.instance.getAll(this.initModel.name)
    }

    public async clear(): Promise<void>{
        await this.awaitOpen();
        await this.instance.clear(this.initModel.name)
    }

    public async delete(key: string): Promise<void>{
        await this.awaitOpen();
        await this.instance.delete(this.initModel.name, key)
    }

    protected async awaitOpen(): Promise<void>{
        if(this.openPromise){
            await this.openPromise;
        }
    }


}