import React, { PureComponent } from 'react';
import { Title } from './../../index';

export default class TitleContainer extends PureComponent {

    render() {
        return (
            <Title
                { ...this.props }
            />
        );
    }

}

TitleContainer.propTypes = { ...Title.propTypes };
