import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/news" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;