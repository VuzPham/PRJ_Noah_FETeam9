import Login from '~/pages/Login';
import School from '~/pages/School';
import Subject from '~/pages/Subject';
import Question from '~/pages/Question';
import Profile from '~/pages/Profile';
import ModalDelete from '~/pages/Modal/Modal_Delete';
import ModalAddSchool from '~/pages/Modal/Modal_Add_School';

const publicRoutes = [
    {path: '/', component: Login}
];

const privateRoutes = [
    { path: '/school', component: School },
    { path: '/subject', component: Subject },
    { path: '/question', component: Question },
    { path: '/profile', component: Profile },
    { path: '/delete', component: ModalDelete },
    { path: '/add-school', component: ModalAddSchool }
]

export { publicRoutes, privateRoutes }