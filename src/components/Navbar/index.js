import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  accessCategories,
  accessEvents,
  accessOrders,
  accessParticipant,
  accessPayments,
  accessTalents,
} from "../../const/access";
import NavAccess from "../NavAccess";

export default function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavAccess
            action={() => navigate("/")}
            role={role}
            roles={accessCategories.lihat}
          >
            Home
          </NavAccess>
          <NavAccess
            action={() => navigate("/categories")}
            role={role}
            roles={accessCategories.lihat}
          >
            Categories
          </NavAccess>
          <NavAccess
            action={() => navigate("/talents")}
            role={role}
            roles={accessTalents.lihat}
          >
            Talents
          </NavAccess>
          <NavAccess
            action={() => navigate("/payments")}
            role={role}
            roles={accessPayments.lihat}
          >
            Payment
          </NavAccess>
          <NavAccess
            action={() => navigate("/events")}
            role={role}
            roles={accessEvents.lihat}
          >
            Events
          </NavAccess>
          <NavAccess
            action={() => navigate("/participant")}
            role={role}
            roles={accessParticipant.lihat}
          >
            Participant
          </NavAccess>
          <NavAccess
            action={() => navigate("/orders")}
            role={role}
            roles={accessOrders.lihat}
          >
            Orders
          </NavAccess>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
