import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import MagentoTranslator from './MagentoTranslator';

describe('Translator', () => {
    const networkMock = new MockAdaptor(axios);
    networkMock.onGet('/translationUrl').reply(200, { 'My Cart': 'Bag' });

    MagentoTranslator.init('/translationUrl');

    it('Translates a term', () => {
        expect(MagentoTranslator.translate('My Cart')).toEqual('Bag');
    });

    it("Doesn't translate a term that isn't there", () => {
        expect(MagentoTranslator.translate('Something else')).toEqual('Something else');
    });
});
