import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SAlert from "../../components/Alert";
import SBreadCrumb from "../../components/Breadcrumb";
import {
  fetchListsCategories,
  fetchListsTalents,
} from "../../redux/lists/actions";
import { setNotif } from "../../redux/notif/actions";
import { getData, postData, putData } from "../../utils/fetch";
import EventsForm from "./form";

export default function EventsEdit() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    title: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    tickets: [
      {
        type: "",
        status: "",
        stock: "",
        price: "",
      },
    ],
    category: "",
    talent: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneCategories = async () => {
    const res = await getData(`/cms/events/${eventId}`);

    setForm({
      ...form,
      title: res.data.data.title,
      date: moment(res.data.data.date).format("YYYY-MM-DDTHH:SS"),
      file: res.data.data.image._id,
      avatar: res.data.data.image.name,
      about: res.data.data.about,
      venueName: res.data.data.venueName,
      tagline: res.data.data.tagline,
      keyPoint: res.data.data.keyPoint,
      category: {
        label: res?.data?.data?.category?.name,
        target: { name: "category", value: res?.data?.data?.category?._id },
        value: res?.data?.data?.category?._id,
      },
      talent: {
        label: res?.data?.data?.talent?.name,
        target: { name: "talent", value: res?.data?.data?.talent?._id },
        value: res?.data?.data?.talent?._id,
      },
      tickets: res.data.data.tickets,
    });
  };

  useEffect(() => {
    fetchOneCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListsTalents());
    dispatch(fetchListsCategories());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png/jpg/jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (e.target.name === "category" || e.target.name === "talent") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      date: form.date,
      image: form.file,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
    };

    const res = await putData(`/cms/events/${eventId}`, payload);
    if (res.data.data) {
      dispatch(
        setNotif(true, "success", `Berhasil ubah event ${res.data.data.title}`)
      );

      navigate("/events");
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push("");

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp.map((_, i) => i).indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: "",
      status: "",
      stock: "",
      price: "",
    });

    setForm({ ...form, tickets: _temp });
  };

  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp.map((_, i) => i).indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <SBreadCrumb
        textSecond={"Events"}
        urlSecond={"/events"}
        textThird="Edit"
      />

      {alert.status && <SAlert type={alert.type} message={alert.message} />}

      <EventsForm
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
        edit
      />
    </Container>
  );
}
