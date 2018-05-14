import { convertAsync, convertSync } from "../csvToJsonConverter";

export default class Importer {
    constructor() {}

    import(path) {
        return convertAsync(path)
            .then(console.log)
            .catch(console.error);
    }

    importSync(path) {
        console.log(convertSync(path));
    }
}