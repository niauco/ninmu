const now = new Date();

export type ItemOptions = {
  id?: number;
  date?: string;
  timestamp?: number;
  description?: string;
  isStarred?: Boolean;
  boards?: Array<string>;
}

export abstract class Item {
  protected _id: number;
  protected _date: string;
  protected _timestamp: number;
  protected _isTask: Boolean;
  protected _description: string;
  protected _isStarred: Boolean;
  protected _boards: Array<string>;

  constructor(options: ItemOptions) {
    this._id = options.id;
    this._date = options.date || now.toDateString();
    this._timestamp = options.timestamp || now.getTime();
    this._description = options.description || '';
    this._isStarred = options.isStarred || false;
    this._boards = options.boards || ['My Board'];
  }

  get id(): number {  
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get date(): string {
    return this._date;
  }

  set date(date: string) {
    this._date = date;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(timestamp: number) {
    this._timestamp = timestamp;
  }

  get isTask(): Boolean {
    return this._isTask
  }

  set isTask(isTask: Boolean) {
    this._isTask = isTask;
  }

  get description(): string {
    return this._description
  }

  set description(description: string) {
    this._description = description;
  }

  get isStarred(): Boolean {
    return this._isStarred
  }

  set isStarred(isStarred: Boolean) {
    this._isStarred = isStarred;
  }

  get boards(): Array<string> {
    return this._boards;
  }

  set boards(boards: Array<string>) {
    this._boards = boards;
  } 
}
