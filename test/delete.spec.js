const Taskline = require('../src/taskline');
const helper = require('./helper');

helper.setConfig();
const taskline = new Taskline();

describe('Test delete, archive and restore functionality', () => {
  const storage = helper.getStorage();

  //  Disable output
  process.stdout.write = jest.fn();
  //  Disable output ora problem also jest has no output than
  //  process.stderr.write = jest.fn();

  beforeAll(async done => {
    await helper.clearStorage();
    await storage.set({
      1: {
        _id: 1,
        _date: 'Mon Sep 02 2019',
        _timestamp: 1567434272855,
        description: 'Test Note',
        isStarred: false,
        boards: ['My Board'],
        _isTask: false
      },
      2: {
        _id: 2,
        _date: 'Mon Sep 02 2019',
        _timestamp: 1567434272855,
        description: 'Test Task',
        isStarred: false,
        boards: ['My Board'],
        _isTask: true,
        dueDate: null,
        isComplete: false,
        inProgress: false,
        priority: 1
      }
    });
    done();
  });

  it('should delete an item', () => {
    return taskline.deleteItems('1').then(() => {
      return storage.get().then(data => {
        expect(data[1]).toBe(undefined);
      });
    });
  });

  it('should find item in archive', () => {
    return storage.getArchive().then(data => {
      expect(data[1].description).toBe('Test Note');
      expect(data[1]._isTask).toBe(false);
    });
  });

  it('should restore item from archive', () => {
    return taskline.restoreItems('1').then(() => {
      return storage.get().then(data => {
        expect(data[3].description).toBe('Test Note');
      });
    });
  });

  afterAll(done => {
    helper.resetConfig();
    done();
  });
});