import eventEmitter from './eventEmitter';
import fs from 'fs';

export default class DirWatcher{
    constructor() {
        this.watchedFiles = [];
    }

    watch(path, delay) {
        setInterval(() => {
            const files = fs.readdirSync(path);
            files.forEach((file) => {
                if (!this.watchedFiles.includes(file)) {
                    eventEmitter.emit('changed', `${path + file}`);
                    this.watchedFiles.push(file);
                }
            });
        }, delay);
    }
}