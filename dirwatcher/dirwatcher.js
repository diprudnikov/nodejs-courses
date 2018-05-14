import EventEmitter from 'events';
import fs from 'fs';

export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.watchedFiles = [];
        this.timeFilesWasChanged = [];
    }

    watch(path, delay) {
        setInterval(() => {
            const files = fs.readdirSync(path);
            this.checkFilesForUpdate(path, files);
        }, delay);
    }

    checkFilesForUpdate(path, files) {
        files.forEach((file) => {
            if (!this.watchedFiles.includes(file)) {
                this.updateNewFile(path, file);
            } else {
                this.updateChangedFile(path, file);
            }
        });
    }

    updateNewFile(path, file) {
        this.emit('changed', `${path + file}`);
        this.watchedFiles.push(file);
        fs.stat(path + file, (err, stats) => {
            this.timeFilesWasChanged.push(stats.mtime);
        });
    }

    updateChangedFile(path, file) {
        const fileIndex = this.watchedFiles.indexOf(file);
        fs.stat(path + file, (err, stats) => {
            if (Date.parse(stats.mtime) !== Date.parse(this.timeFilesWasChanged[fileIndex])) {
                this.emit('changed', `${path + file}`);
                this.timeFilesWasChanged.splice(fileIndex, 1, stats.mtime);
            }
        });
    }
}