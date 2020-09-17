import AJAX from './AJAX';

class Translator {

    constructor() {
        this.dictionary = {};
    }

    async init(translationFileUrl) {
        return AJAX.get(translationFileUrl).then(({ data }) => {
            this.dictionary = data;
        });
    }

    translate(term) {
        if (term in this.dictionary) {
            return this.dictionary[term];
        }
        return term;
    }

}

const MagentoTranslator = new Translator();

export const __ = term => MagentoTranslator.translate(term); // eslint-disable-line no-underscore-dangle

export default MagentoTranslator;
