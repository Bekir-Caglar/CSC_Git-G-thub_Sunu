import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SlideViewer } from './components/SlideViewer';
import { CertificatePage } from './components/CertificatePage';
import './index.css';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app">
        <Routes>
          <Route path="/" element={<SlideViewer />} />
          <Route path="/sertifika" element={<CertificatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
