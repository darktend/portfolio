import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import {
  validateEmail,
  validateInput,
  validateMessage,
} from "../utils/FormValidation";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setAlertMessage("");
    setAlertType("");
  };

  const clearMessages = () => {
    setAlertMessage("");
    setAlertType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    const nameError = validateInput(form.name);
    const emailError = validateEmail(form.email);
    const messageError = validateMessage(form.message);

    setErrors({ email: emailError, name: nameError, message: messageError });

    if (!emailError && !nameError && !messageError) {
      setLoading(true);
      try {
        await emailjs.send(
          "service_9a9tol9",
          "template_2m83mz9",
          {
            from_name: form.name,
            to_name: "Vlad",
            from_email: form.email,
            to_email: "vladgodunubg@gmail.com",
            message: form.message,
          },
          "kht3j7uL9pALWPOYL"
        );
        setLoading(false);
        setSubmitSuccess(true);
        setAlertMessage(
          "Thank you. I will get back to you as soon as possible."
        );
        setAlertType("success");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } catch (error) {
        setLoading(false);
        setAlertMessage("Something went wrong");
        setAlertType("error");
      }
    } else {
      if (!(form.name || form.email || form.message)) {
        setAlertMessage("Please fill in all fields.");
      } else {
        setAlertMessage(
          "Thank you. I will get back to you as soon as possible."
        );
      }
    }
    setTimeout(clearMessages, 3000);
  };

  const renderInput = (name, label) => (
    <label key={name} className="flex flex-col">
      <span className="text-white font-medium mb-4">{label}</span>
      <input
        type="text"
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={`What's your ${name.toLowerCase()}?`}
        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
      />
      {errors[name] && <div className="text-red-500">{errors[name]}</div>}
    </label>
  );

  const renderTextarea = (name, label) => (
    <label key={name} className="flex flex-col">
      <span className="text-white font-medium mb-4">{label}</span>
      <textarea
        rows="7"
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={`What do you want to say about your ${name.toLowerCase()}?`}
        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
      />
      {errors[name] && <div className="text-red-500">{errors[name]}</div>}
    </label>
  );

  useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 3000);
    }
  }, [submitSuccess]);

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      {alertMessage && (
        <div
          className={`fixed top-[10%] left-1/2 transform -translate-x-1/2 ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white p-3 rounded-lg z-10 w-11/12 sm:w-10/12 text-center opacity-100 transition-opacity ease-in-out duration-300`}
        >
          {alertMessage}
        </div>
      )}

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {renderInput("name", "Your Name")}
          {renderInput("email", "Your Email")}
          {renderTextarea("message", "Your Message")}
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
