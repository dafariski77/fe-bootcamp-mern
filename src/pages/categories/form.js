import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

export default function CategoriesForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukkan nama kategori"}
        label={"Nama Kategori"}
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <SButton variant={"primary"} action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </SButton>
    </Form>
  );
}
