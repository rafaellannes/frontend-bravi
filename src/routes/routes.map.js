import Home from '@/pages/Home';
import Contact from '@/pages/Contact';


const routes = [
    {
        path: '/contacts/:idUser',
        component: Contact,
        name: 'contacts',
        props: true
    }, 

    {
        path: '/',
        component: Home,
        name: 'home'
    }, 
];

export default routes