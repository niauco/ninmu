import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

import { Config } from '../src/config';
import { Storage } from '../src/storage';
import { LocalStorage } from '../src/local';
import { Item } from '../src/item';
import { FirestoreStorage } from '../src/firestore';

const contentPath = resolve(__dirname, './config.json');
const sampleContentPath = resolve(__dirname, './sample.config.json');

export class Helper {
  private storage: Storage;
  private originalConfig: any;

  public constructor() {
    this.setConfig();
    const { storageModule } = Config.instance.get();
    if (storageModule === 'firestore') {
      this.storage = FirestoreStorage.instance;
    } else if (storageModule === 'local') {
      this.storage = LocalStorage.instance;
    }
  }

  private setConfig(): void {
    this.originalConfig = Config.instance.get();
    let content;
    if (existsSync(contentPath)) {
      content = readFileSync(contentPath, 'utf8');
    } else if (existsSync(sampleContentPath)) {
      content = readFileSync(sampleContentPath, 'utf8');
    } else {
      throw new Error('No config file for unit tests');
    }

    const unitTestConfig = JSON.parse(content);
    Config.instance.set(unitTestConfig);
  }

  public resetConfig(): void {
    Config.instance.set(this.originalConfig);
  }

  public getData(ids?: Array<number>): Promise<Array<Item>> {
    return this.storage.get(ids);
  }

  public getArchive(ids?: Array<number>): Promise<Array<Item>> {
    return this.storage.getArchive(ids);
  }

  public setData(data: Array<Item>): Promise<void> {
    return this.storage.set(data);
  }

  public setArchive(data: Array<Item>): Promise<void> {
    return this.storage.setArchive(data);
  }

  public async clearStorage(): Promise<void> {
    await this.storage.set(new Array<Item>());
    return this.storage.setArchive(new Array<Item>());
  }

  public changeConfig(key: string, value: any): void {
    const keys = key.split('.');
    const localConfig = Config.instance.get();
    let temp = localConfig as any;
    while (keys.length > 1) {
      let n = keys.shift() as any;
      if (!n) return;
      temp = temp[n];
    }
    temp[keys[0]] = value;
    Config.instance.set(localConfig);
  }
}
