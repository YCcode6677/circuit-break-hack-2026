import logo from "../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="pixel-navbar">
      <a href="#home" className="pixel-brand">
        <img
          src={logo}
          alt="Circuit Break Logo"
          className="navbar-logo"
        />

        <div className="brand-text">
          <span>CIRCUIT</span>
          <span className="purple-text">BREAK</span>
        </div>
      </a>

      <div className="pixel-nav-links">
        <a href="#instrument">
          <span>01</span>
          ITEM
        </a>

        <a href="#band">
          <span>02</span>
          PLAYERS
        </a>

        <a href="#music">
          <span>03</span>
          LEVELS
        </a>

        <a href="#live" className="live-nav">
          <span>04</span>
          LIVE
        </a>
      </div>

      <div className="navbar-status">
        <span className="status-dot"></span>
        PLAYER 1
      </div>
    </nav>
  );
}

export default Navbar;