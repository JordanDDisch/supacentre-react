import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SwatchContainer from './SwatchContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('The swatch container', () => {
    it('renders without error', () => {
        const swatch1 = mount((
            <SwatchContainer
                label='Blue'
                backgroundColor='#6fa1ca'
                onClick={() => {}}
                isSelected={false}
                isDisabled={false}
                name='swatch1'
            />
        ));

        expect(swatch1.find('.swatch').exists()).toEqual(true);
    });

    it('renders a swatch with a selected class when passed the isSelected prop', () => {
        const swatch2 = mount((
            <SwatchContainer
                label='Blue'
                backgroundColor='#6fa1ca'
                isSelected={true}
                name='swatch2'
            />
        ));

        expect(swatch2.find('.swatch--selected').exists()).toEqual(true);
    });

    it('renders a swatch with a disabled attribute and class when passed the isDisabled prop', () => {
        const swatch3 = mount((
            <SwatchContainer
                label='Blue'
                backgroundColor='#6fa1ca'
                isDisabled={true}
                name='swatch3'
            />
        ));

        expect(swatch3.find('.swatch--disabled[disabled]').exists()).toEqual(true);
    });

    it('fires an onClick event', () => {
        let onClickCalled = false;
        const onClick = () => {
            onClickCalled = true;
        };

        const swatch4 = mount((
            <SwatchContainer
                label='Blue'
                backgroundColor='#6fa1ca'
                onClick={onClick}
                isDisabled={true}
                name='swatch4'
            />
        ));

        swatch4.find('.swatch').hostNodes().prop('onClick')();

        expect(onClickCalled).toEqual(true);
    });

    it('renders a swatch as a <a> element when passed a link prop', () => {
        const swatch5 = mount((
            <SwatchContainer
                label='Blue'
                backgroundImage='texture-donut.jpg'
                isSelected={false}
                isDisabled={false}
                name='swatch5'
                link='http://aligent.com.au'
            />
        ));

        expect(swatch5.find('a.swatch').exists()).toEqual(true);
    });

    it('renders a swatch as a <button> element when not passed a link prop', () => {
        const swatch6 = mount((
            <SwatchContainer
                label='Blue'
                backgroundColor='#6fa1ca'
                isSelected={false}
                isDisabled={false}
                name='swatch6'
            />
        ));

        expect(swatch6.find('button.swatch').exists()).toEqual(true);
    });
});
