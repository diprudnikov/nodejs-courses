import Converter from "../csvToJsonConverter";

const converter = new Converter();

export default class Importer {
    constructor() {}

    import(path) {
        return converter.convertAsync(path)
            .then(console.log)
            .catch(console.error);
    }

    importSync(path) {
        console.log(converter.convertSync(path));
    }
}