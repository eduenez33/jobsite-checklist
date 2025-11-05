import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Edwin Duenez</p>
      <p className="footer__date">{currentYear}</p>
    </footer>
  );
}

export default Footer;
