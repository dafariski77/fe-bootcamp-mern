import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import axios from "axios";
import SAlert from "../../components/Alert";

export default function PageSignin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/cms/auth/signin",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log(res); 
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <Container md={12}>
      <SAlert type="danger" message="test" />
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Login</Card.Title>
          <Form>
            <TextInputWithLabel
              label="Email Address"
              name="email"
              value={form.email}
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />

            <TextInputWithLabel
              label="Password"
              name="password"
              value={form.password}
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />

            <SButton variant="primary" action={handleSubmit}>
              Submit
            </SButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
