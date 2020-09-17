import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemSummaryContainer from './ItemSummaryContainer';

import itemSummary from './testData';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without error', () => {
    const element = mount((
        <ItemSummaryContainer
            item={itemSummary}
            updateConfigurable={() => {}}
            removeItem={() => {}}
        />
    ));

    expect(element.find('.item-summary__title').text()).toEqual('Test');
    expect(element.find('.item-summary__price .item-price--old').text()).toEqual('169.99');
    expect(element.find('.item-summary__price .item-price--sale').text()).toEqual('99.99');
    expect(element.find('.item-summary__options--color #select-color__123456').exists()).toEqual(true);
    expect(element.find('.item-summary__options--size .select-input').props().value).toEqual('14');
    expect(element.find('.item-summary__options--qty').exists()).toEqual(true);
    expect(element.find('.item-summary__options--foo').exists()).toEqual(true);
});

it('Renders only whitelisted configurables', () => {
    const element = mount((
        <ItemSummaryContainer
            item={itemSummary}
            updateConfigurable={() => {}}
            blackListConfigurables={['foo']}
            removeItem={() => {}}
        />
    ));

    const $element = element.render();

    // we didn't blacklist these, so check they exist
    expect(element.find('.item-summary__options--size .select-input').props().value).toEqual('14');
    expect($element.find('.item-summary__options--qty')).toHaveLength(1);
    // we blacklisted foo, so check it does not exist
    expect($element.find('.item-summary__options--foo')).toHaveLength(0);
});


it('Renders custom close button content', () => {
    const title = 'Remove item from shopping bag';

    const element = mount((
        <ItemSummaryContainer
            item={itemSummary}
            updateConfigurable={() => {}}
            closeButtonTitle={title}
            closeButtonContent={(<span className="material-icons">close</span>)}
            removeItem={() => {}}
        />
    ));

    expect(element.find('.item-summary__actions .remove-item').text()).toEqual('close');
    expect(element.find('.item-summary__actions .remove-item').prop('title')).toEqual(title);
});

it('Allows customising title and subtitle', () => {
    const element = mount((
        <ItemSummaryContainer
            item={itemSummary}
            updateConfigurable={() => {}}
            subtitle={itemSummary.configurables.foo.label}
            removeItem={() => {}}
        />
    ));
    const $element = element.render();

    expect($element.find('.item-summary__title .item-summary__link').text()).toEqual('Test');
    expect($element.find('.item-summary__title .item-summary__subtitle').text()).toEqual('Kung Foo');
});
