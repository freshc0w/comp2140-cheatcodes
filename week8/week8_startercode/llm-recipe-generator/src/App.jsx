import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeGenerator from './components/RecipeGenerator';
import Header from './layoutcomponents/Header';
import Footer from './layoutcomponents/Footer';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <main>
          <RecipeGenerator />
      </main>
      <Footer />
    </div>

    
  );
}

export default App;


