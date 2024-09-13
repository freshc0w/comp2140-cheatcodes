import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatbot from './components/Chatbot';
import Header from './layoutcomponents/Header';
import Footer from './layoutcomponents/Footer';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <main>
          <Chatbot />
      </main>
      <Footer />
    </div>

    
  );
}

export default App;


