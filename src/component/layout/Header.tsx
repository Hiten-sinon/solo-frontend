import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/images";

const Header = () => {
  const [lang, setLang] = useState("English");
  const [isSticky, setIsSticky] = useState(false);

  const handleSelect = (eventKey: string) => {
    setLang(eventKey);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className={`header ${isSticky ? "sticky" : ""}`}
        >
          <Container>
            <Navbar.Brand href="#">
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="#">Home</Link>
                  <Link to="#">Services</Link>
                  <NavDropdown
                    title="More"
                    id="nav-dropdown"
                    className="language-dropdown"
                  >
                    <NavDropdown.Item href="#">Team</NavDropdown.Item>
                    <NavDropdown.Item href="#">Careers</NavDropdown.Item>
                  </NavDropdown>
                  <Link to="#">About Us</Link>
                  <Link to="#">Contact us</Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title={lang}
                    onSelect={handleSelect}
                    className="language-dropdown"
                  >
                    <NavDropdown.Item eventKey="English">
                      English
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="Hindi">Hindi</NavDropdown.Item>
                  </NavDropdown>
                  <Link to="#" className="btn btn-teal">
                    Inquiry form
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
