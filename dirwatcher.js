import eventEmitter from './eventEmitter';
import fs from 'fs';

export default class DirWatcher{
    constructor() {
        this.watchedFiles = [];
        this.timeFilesWasChanged = [];
    }

    watch(path, delay) {
        setInterval(() => {
            const files = fs.readdirSync(path);
            files.forEach((file) => {
                if (!this.watchedFiles.includes(file)) {
                    eventEmitter.emit('changed', `${path + file}`);
                    this.watchedFiles.push(file);
                    this.timeFilesWasChanged.push(fs.statSync(path + file).mtime);
                } else {
                    const index = this.watchedFiles.indexOf(file);
                    const lastTimeFileWasChanged = fs.statSync(path + file).mtime;
                    if (Date.parse(lastTimeFileWasChanged) !== Date.parse(this.timeFilesWasChanged[index])) {
                        eventEmitter.emit('changed', `${path + file}`);
                        this.watchedFiles.splice(index, 1, file);
                        this.timeFilesWasChanged.splice(index, 1, lastTimeFileWasChanged);
                    }
                }
            });
        }, delay);
    }
}