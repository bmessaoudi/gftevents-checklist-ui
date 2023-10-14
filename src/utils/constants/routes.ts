/**
 * This objects contains all the routes of the app
 * Any time we move around the app we should use this insted of hardcode the paths
 *
 * Using this will save us time if we need to change the path since we can change it here and it will be automatically changed even in other places
 */
const Routes = {
    // Not Authenticated
    Root: () => '/',
    Login: () => '/login',
    Signup: () => '/signup',

    // Authenticated
    Home: () => '/home'
};

export default Routes;
