"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  source: string;
  status: string;
};

type ApiError = {
  error?: string;
};

const inputClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-10 sm:text-sm";

const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10 [&>option]:bg-card [&>option]:text-foreground`;

export function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    status: "NEW",
  });

  const createContactMutation = useMutation({
    mutationFn: async (contact: ContactFormData) => {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data: ApiError = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create contact.");
      }

      return data;
    },

    onSuccess: () => {
      router.push("/contacts");
      router.refresh();
    },
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (createContactMutation.isPending) return;

    createContactMutation.mutate(formData);
  }

  const error = createContactMutation.error?.message;
  const isSubmitting = createContactMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="position" className="text-sm font-medium">
            Position
          </label>
          <input
            id="position"
            name="position"
            autoComplete="organization-title"
            value={formData.position}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="source" className="text-sm font-medium">
            Source
          </label>
          <input
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Website, LinkedIn, Referral..."
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={selectClass}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="INTERESTED">Interested</option>
            <option value="CONVERTED">Converted</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="h-11 rounded-lg border px-5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 sm:h-10"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10"
        >
          {isSubmitting ? "Creating..." : "Create contact"}
        </button>
      </div>
    </form>
  );
}
