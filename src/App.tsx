import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { SlideViewer } from './components/SlideViewer';
import { CertificatePage } from './components/CertificatePage';
import './index.css';

function App() {
  return (
    <Router>
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
