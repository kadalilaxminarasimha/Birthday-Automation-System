import { useState } from "react";
import Button from "./Button.jsx";

/**
 * Reusable form for creating or editing a member.
 *
 * Props:
 *  - initialValues: { name, phone, dob }
 *  - onSubmit: async function(values) -> called when form is valid
 *  - submitLabel: text for the submit button
 */
export default function MemberForm({
  initialValues = { name: "", phone: "", dob: "" },
  onSubmit,
  submitLabel = "Save Member",
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Simple client-side validation before hitting the API
  const validate = () => {
    const newErrors = {};

    if (!values.name || values.name.trim().length < 2) {
      newErrors.name = "Please enter a valid full name (at least 2 characters).";
    }

    const digits = (values.phone || "").replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!values.dob) {
      newErrors.dob = "Please select a date of birth.";
    } else if (new Date(values.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="e.g. John Smith"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          placeholder="e.g. +1 555 123 4567"
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={values.dob}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.dob && (
          <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
        )}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
