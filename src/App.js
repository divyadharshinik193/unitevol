import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import VolunteerAbout from './pages/VolunteerAbout';
import NGOAbout from './pages/NGOAbout';
import ProjectLeadAbout from './pages/ProjectLeadAbout';
import SheLeadsAbout from './pages/SheLeadsAbout';
import Volunteer from './pages/VolunteerDashboard';
import NGOProfile from './pages/NGOProfile';
import NGODashboard from './pages/NGODashboard';
import NGOProjects from './pages/NGOProjects';
import VolunteerProfile from './pages/VolunteerProfile';
import ProjectLeadProfile from './pages/ProjectLeadProfile';
import SheLeadsProfile from './pages/SheLeadsProfile';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ProjectLeadDashboard from './pages/ProjectLeadDashboard';
import SheLeadsDashboard from './pages/SheLeadsDashboard';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import NGOVolunteers from './pages/NGOVolunteers';
import ProjectLeadProjects from './pages/ProjectLeadProjects';
import ProjectLeadVolunteers from './pages/ProjectLeadVolunteers';
import SheLeadsProjects from './pages/SheLeadsProjects';
import SheLeadsVolunteers from './pages/SheLeadsVolunteers';

// Wrapper component to handle layout
const AppLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isPublicRoute = ['/', '/about', '/login', '/signup', '/unauthorized', '/volunteer', '/ngo', '/project-lead', '/she-leads'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {isPublicRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/volunteer/about" element={<VolunteerAbout />} />
            <Route path="/ngo/about" element={<NGOAbout />} />
            <Route path="/project-lead/about" element={<ProjectLeadAbout />} />
            <Route path="/she-leads/about" element={<SheLeadsAbout />} />

            {/* Protected Routes */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Role-specific Routes */}
            <Route
              path="/volunteer"
              element={<VolunteerAbout />}
            />
            <Route
              path="/volunteer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer/profile"
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <VolunteerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer/projects"
              element={
                <ProtectedRoute allowedRoles={['volunteer']}>
                  <Projects />
                </ProtectedRoute>
              }
            />

            {/* NGO Routes */}
            <Route
              path="/ngo"
              element={<NGOAbout />}
            />
            <Route
              path="/ngo/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NGODashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo/projects"
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NGOProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo/profile"
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NGOProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo/volunteers"
              element={
                <ProtectedRoute allowedRoles={['ngo']}>
                  <NGOVolunteers />
                </ProtectedRoute>
              }
            />

            {/* Project Lead Routes */}
            <Route
              path="/project-lead"
              element={<ProjectLeadAbout />}
            />
            <Route
              path="/project-lead/dashboard"
              element={
                <ProtectedRoute allowedRoles={['project_lead']}>
                  <ProjectLeadDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-lead/profile"
              element={
                <ProtectedRoute allowedRoles={['project_lead']}>
                  <ProjectLeadProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-lead/projects"
              element={
                <ProtectedRoute allowedRoles={['project_lead']}>
                  <ProjectLeadProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-lead/volunteers"
              element={
                <ProtectedRoute allowedRoles={['project_lead']}>
                  <ProjectLeadVolunteers />
                </ProtectedRoute>
              }
            />

            {/* She Leads Routes */}
            <Route
              path="/she-leads"
              element={<SheLeadsAbout />}
            />
            <Route
              path="/she-leads/dashboard"
              element={
                <ProtectedRoute allowedRoles={['she_leads']}>
                  <SheLeadsDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/she-leads/profile"
              element={
                <ProtectedRoute allowedRoles={['she_leads']}>
                  <SheLeadsProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/she-leads/projects"
              element={
                <ProtectedRoute allowedRoles={['she_leads']}>
                  <SheLeadsProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/she-leads/volunteers"
              element={
                <ProtectedRoute allowedRoles={['she_leads']}>
                  <SheLeadsVolunteers />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
