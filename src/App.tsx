import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';

function App() {
  return (
      //rotas
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/autores" replace />} />
            <Route path="/autores" element={<AuthorsPage />} />
            <Route path="/livros" element={<BooksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;