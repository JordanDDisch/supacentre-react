/**
 * Abstraction for the navigator parameter in the window object.
 * This will allow for components that need to access the window object to mock this out
 */
class WindowNavigatorWrapper {

    static get instance() {
        return navigator;
    }

}

export default WindowNavigatorWrapper.instance;
