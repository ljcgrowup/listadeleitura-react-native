import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import Books from './pages/Books';

const routes = createAppContainer(
    createSwitchNavigator({
        Main,
        Books
    },
    {
        initialRouteName: 'Main',
        backBehavior: 'history'   
    })
);

export default routes;