import config from './config/config';
import { User, Product } from './models';
import DirWatcher from './dirwatcher';
import Importer from './importer';

console.log(config.name);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
const importer = new Importer();
dirWatcher.on('changed', importer.import);
dirWatcher.watch('data/', 2000);
