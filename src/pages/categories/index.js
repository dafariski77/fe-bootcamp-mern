import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SNavbar from "../../components/Navbar";
import { config } from "../../configs";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoriesAPI = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      setData(res.data.data);
    } catch (err) {
      setIsLoading(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getCategoriesAPI();
  }, []);

  if (!token) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <>
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb textSecond="Categories" />
        <SButton action={() => navigate("/categories/create")}>Tambah</SButton>

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
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 4} style={{ textAlign: "center" }}>
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Last</td>
                  <td>@dap</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
