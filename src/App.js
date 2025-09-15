import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import DocPage from './pages/DocPage';
import DocViewerPage from './pages/DocViewerPage';
import ContributorsPage from './pages/ContributorsPage';
import AboutUsPage from './pages/AboutUsPage';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isDocPage = location.pathname.startsWith('/docs');
  return (
    <main className={`flex-grow w-full pt-24 pb-8 ${isDocPage ? 'lg:pl-64' : ''}`}>
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocPage />} />
          <Route path="/docs/:category/:file" element={<DocViewerPage />} />
          <Route path="/contributors" element={<ContributorsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <Router>
          <>
            <Navbar />
            <Sidebar />
            <div className="flex flex-col min-h-screen">
              <AppContent />
              <Footer />
            </div>
          </>
        </Router>
      </SidebarProvider>
    </ErrorBoundary>
  );
}

export default App;
