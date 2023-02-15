import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";

export default function DashboardPage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <>
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb />
        <Button>Tambah</Button>

        <Table className="mt-3" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Last</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>dap</td>
              <td>ris</td>
              <td>@dap</td>
            </tr>
            <tr>
              <td>1</td>
              <td>dap</td>
              <td>ris</td>
              <td>@dap</td>
            </tr>
            <tr>
              <td>1</td>
              <td>dap</td>
              <td>ris</td>
              <td>@dap</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
