import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-2 pt-20">
      <p>&copy; {new Date().getFullYear()} My Company</p>
    </footer>
  );
}

export default Footer;
