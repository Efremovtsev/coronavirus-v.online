import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="legend">
        <span>0</span>
        <span>&gt;&nbsp;10000</span>
      </div> */}

      <nav className="links">
        <span>© 2020</span>
        <a href="https://www.facebook.com/alexander.efremovtsev" target="_blank" rel="noopener noreferrer">
          Alexander Efremovtsev
        </a>
        <a href="https://money.yandex.ru/to/410011304773625" target="_blank" rel="noopener noreferrer">
          Donate
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
