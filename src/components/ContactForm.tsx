import { useState } from "react";
import { motion } from "framer-motion";
import { useContactForm, useTrackEvent } from "@hooks/useApi";
import "./ContactForm.scss";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const { mutate: trackEvent } = useTrackEvent();
  const {
    mutate: submit,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useContactForm();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(form, {
      onSuccess: () => {
        trackEvent({ eventType: "contact_submit" });
        setForm({ name: "", email: "", company: "", subject: "", message: "" });
      },
    });
  }

  if (isSuccess) {
    return (
      <motion.div
        className="contact-form__success"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="contact-form__success-icon" aria-hidden>
          ✓
        </span>
        <h4 className="contact-form__success-title">Message received</h4>
        <p className="contact-form__success-sub">
          I'll get back to you within 24 hours on weekdays.
        </p>
        <button className="btn btn--ghost" onClick={reset}>
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-name">
            Name <span aria-hidden>*</span>
          </label>
          <input
            className="contact-form__input"
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Sarah Connor"
            value={form.name}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-email">
            Email <span aria-hidden>*</span>
          </label>
          <input
            className="contact-form__input"
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="sarah@company.com"
            value={form.email}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-company">
            Company
          </label>
          <input
            className="contact-form__input"
            id="cf-company"
            name="company"
            type="text"
            placeholder="Skynet GmbH"
            value={form.company}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="cf-subject">
            Subject
          </label>
          <input
            className="contact-form__input"
            id="cf-subject"
            name="subject"
            type="text"
            placeholder="Senior Frontend role"
            value={form.subject}
            onChange={handleChange}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="cf-message">
          Message <span aria-hidden>*</span>
        </label>
        <textarea
          className="contact-form__input contact-form__input--textarea"
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          value={form.message}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {isError && (
        <motion.p
          className="contact-form__error"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(error as Error)?.message ||
            "Something went wrong. Please try again."}
        </motion.p>
      )}

      <button
        type="submit"
        className="btn btn--primary contact-form__submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="contact-form__spinner" aria-hidden />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 7.5h11M9 3.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Send message</span>
          </>
        )}
      </button>
    </form>
  );
}
