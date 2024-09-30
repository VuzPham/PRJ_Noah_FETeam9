import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { AuthProvider } from '~/auth/AuthContext';

import DefaultLayout from '~/components/Layout/DefaultLayout';
import ProtectedRoute from '~/components/ProtectedRoute';
import { useState } from 'react'; // Import useState to manage selectedSchool

function App() {
  const [selectedSchool, setSelectedSchool] = useState(null); // Step 1: Define the selectedSchool state

  // Function to handle school selection
  const handleSchoolSelect = (schoolId) => {
    setSelectedSchool(schoolId); // Update selectedSchool when a school is selected
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page onSelectSchool={handleSchoolSelect} />} />; // Pass the function to public routes
            })}

            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <DefaultLayout selectedSchool={selectedSchool} onSelectSchool={handleSchoolSelect}> {/* Step 3: Pass the selectedSchool state */}
                        <Page />
                      </DefaultLayout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
