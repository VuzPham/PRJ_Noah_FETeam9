import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
<<<<<<< HEAD
import { DefaulLayout } from '~/components/Layout';
=======
import DefaultLayout from '~/components/Layout/DefaultLayout';
>>>>>>> origin/Quan

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
<<<<<<< HEAD
                  <DefaulLayout>
                    <Page />
                  </DefaulLayout>
=======
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
>>>>>>> origin/Quan
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
