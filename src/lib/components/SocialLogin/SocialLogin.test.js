import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SocialLogin from './SocialLogin';

Enzyme.configure({ adapter: new Adapter() });

describe('SocialLogin', () => {
    it('Renders without error', () => {
        const socialLogin = mount((
            <SocialLogin
                networks={[]}
                label="Sign in with social network"
            />
        ));

        expect(socialLogin.find('.social-login__networks').exists()).toEqual(true);
        expect(socialLogin.find('.social-login__header').exists()).toEqual(true);
    });

    it('renders social networks', () => {
        const networks = [
            {
                name: 'Google',
                url: 'https://www.google.com'
            },
            {
                name: 'Facebook',
                url: 'https://www.facebook.com'
            },
            {
                name: 'Twitter',
                url: 'https://www.twitter.com'
            }
        ];

        const socialLogin = mount((
            <SocialLogin
                networks={networks}
                label="Sign in with social network"
            />
        ));

        expect(socialLogin.find('.social-login__network').length).toEqual(networks.length);
    });

    it('lowercases social network name in className', () => {
        const networks = [
            {
                name: 'Google',
                url: 'https://www.google.com'
            }
        ];

        const socialLogin = mount((
            <SocialLogin
                networks={networks}
                label="Sign in with social network"
            />
        ));

        expect(socialLogin.find('.social-login__network a').props().className).toEqual('social-login__btn social-login--google');
    });

    it('omits label when one not provided', () => {
        const socialLogin = mount((
            <SocialLogin
                networks={[]}
            />
        ));

        expect(socialLogin.find('.social-login__header').exists()).toEqual(false);
        expect(socialLogin.find('.children').exists()).toEqual(false);
    });

    it('render children props ahead of networks props', () => {
        const networks = [
            {
                name: 'Google',
                url: 'https://www.google.com'
            },
            {
                name: 'Facebook',
                url: 'https://www.facebook.com'
            },
            {
                name: 'Twitter',
                url: 'https://www.twitter.com'
            }
        ];

        const socialLogin = mount((
            <SocialLogin
                networks={networks}
                label="Sign in with social network"
            >
                <ul className="child-props-networks">
                    <li className="child-props-network">
                        Google Children Prop
                    </li>
                    <li className="child-props-network">
                        Facebook Children Prop
                    </li>
                    <li className="child-props-network">
                        Twitter Children Prop
                    </li>
                </ul>
            </SocialLogin>
        ));


        expect(socialLogin.find('.children .child-props-networks').exists()).toEqual(true);
        expect(socialLogin.find('.social-login__networks').exists()).toEqual(false);
    });
});
