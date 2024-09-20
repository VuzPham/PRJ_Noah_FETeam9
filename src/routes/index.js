import Login from '~/pages/Login';
import School from '~/pages/School';
import Subject from '~/pages/Subject';
import Question from '~/pages/Question';
import Profile from '~/pages/Profile';

const publicRoutes = [
    {path: '/', component: Login},
    {path: '/question', component: Question},

];

const privateRoutes = [
    { path: '/school', component: School },
    { path: '/subject', component: Subject },
    { path: '/subject/:id', component: Subject },
    // { path: '/question', component: Question },
    { path: '/question/:subjectId', component: Question },
    { path: '/profile', component: Profile }
]

export { publicRoutes, privateRoutes }