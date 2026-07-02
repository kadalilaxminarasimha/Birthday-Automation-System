import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import MemberForm from "../components/MemberForm.jsx";
import { createMember } from "../api/api.js";

export default function AddMember() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await createMember(values);
      setSuccessMessage("Member saved successfully!");
      // Give the user a moment to see the success message, then
      // send them to the Members page to see the new entry.
      setTimeout(() => navigate("/members"), 900);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setErrorMessage(
        typeof detail === "string"
          ? detail
          : "Something went wrong while saving the member. Please try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Card>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Add Member
        </h2>
        <p className="text-gray-500 mb-6">
          Fill in the details below to add a new birthday to track.
        </p>

        {successMessage && (
          <div className="mb-5 rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-5 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">
            {errorMessage}
          </div>
        )}

        <MemberForm onSubmit={handleCreate} submitLabel="Save Member" />
      </Card>
    </div>
  );
}
