import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/authors" replace />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/books" element={<BooksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;