import Login from '~/pages/Login';
import School from '~/pages/School';
import Subject from '~/pages/Subject';
import Question from '~/pages/Question';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: '/', component: Login }
];

const privateRoutes = [
    { path: '/school', component: School },
    { path: '/subject', component: Subject },
    { path: '/question', component: Question },
    { path: '/profile', component: Profile }
]

export { publicRoutes, privateRoutes }