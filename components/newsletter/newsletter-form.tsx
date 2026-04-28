"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

type NewsletterFormProps = {
  formClassName: string;
  inputId: string;
  placeholder: string;
  inputClassName: string;
  buttonClassName: string;
  buttonLabel: string;
  ariaLabel: string;
  messageClassName?: string;
  showSendIcon?: boolean;
};

type Status = "idle" | "success" | "error";

export function NewsletterForm({
  formClassName,
  inputId,
  placeholder,
  inputClassName,
  buttonClassName,
  buttonLabel,
  ariaLabel,
  messageClassName = "",
  showSendIcon
}: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = await response.json().catch(() => ({})) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to subscribe right now. Please try again later.");
      }

      formRef.current?.reset();
      setStatus("success");
      setMessage("Thank you for subscribing!");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className={formClassName} aria-label={ariaLabel} onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        name="email"
        type="email"
        required
        placeholder={placeholder}
        disabled={isSubmitting}
        className={inputClassName}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClassName}
      >
        {showSendIcon ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
        {isSubmitting ? "Subscribing..." : buttonLabel}
      </button>
      {message ? (
        <p
          className={`absolute left-0 top-full mt-2 w-full text-center text-sm ${status === "success" ? "text-emerald-700" : "text-red-600"} ${messageClassName}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
