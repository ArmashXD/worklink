import Echo from "laravel-echo"
import Cookie from 'js-cookie'
let token = Cookie.get('token');

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'ABCD',
   // wsHost: 'api.ays.com',
    wsHost: 'api.worklink.com.pk',
    encrypted: false,
    secret: 'ABCD1234',
    wsPort: 6001,
    wssPort: 6001,
    enabledTransports: ['ws'],
    disableStats: true,
    forceTLS: false,
    authEndpoint: 'https://api.worklink.com.pk/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }
});

