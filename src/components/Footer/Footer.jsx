import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        Developed by{" "}
        <a
          href="https://github.com/eduenez33"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Edwin Duenez
        </a>
      </p>
      <p className="footer__date">{currentYear}</p>
    </footer>
  );
}

export default Footer;
