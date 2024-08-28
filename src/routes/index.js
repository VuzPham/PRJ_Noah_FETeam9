import Login from '~/pages/Login';
import School from '~/pages/School';
import Subject from '~/pages/Subject';
import Profile from '~/pages/Profile';
import { QuestionAddPage, QuestionEditPage, QuestionListPage } from '~/pages/Question'; // Corrected imports

const publicRoutes = [
  { path: '/', component: Login },
  { path: '/questions', component: QuestionListPage },
  { path: '/questions/edit/:id', component: QuestionEditPage },
  { path: '/questions/add', component: QuestionAddPage }
];

const privateRoutes = [
  { path: '/school', component: School },
  { path: '/subject', component: Subject },
  { path: '/profile', component: Profile }
];

export { publicRoutes, privateRoutes };
