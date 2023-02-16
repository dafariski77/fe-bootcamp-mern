import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import { setNotif } from "../../redux/notif/actions";
import { postData } from "../../utils/fetch";
import CategoriesForm from "./form";

export default function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData("/cms/categories", form);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil tambah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <>
      <Container>
        <SBreadCrumb
          textSecond={"Categories"}
          urlSecond={"/categories"}
          textThird="Create"
        />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <CategoriesForm
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );
}
