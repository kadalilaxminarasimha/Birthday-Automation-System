import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import MemberTable from "../components/MemberTable.jsx";
import MemberForm from "../components/MemberForm.jsx";
import Button from "../components/Button.jsx";
import { getMembers, updateMember, deleteMember } from "../api/api.js";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingMember, setEditingMember] = useState(null); // member being edited, or null
  const [memberToDelete, setMemberToDelete] = useState(null); // for delete confirmation

  const loadMembers = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await getMembers();
      setMembers(res.data);
    } catch (err) {
      setErrorMessage("Could not load members. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleUpdate = async (values) => {
    await updateMember(editingMember.id, values);
    setEditingMember(null);
    await loadMembers();
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    try {
      await deleteMember(memberToDelete.id);
      setMemberToDelete(null);
      await loadMembers();
    } catch (err) {
      setErrorMessage("Could not delete member. Please try again.");
      setMemberToDelete(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Members</h2>
        <p className="text-gray-500 mb-6">
          All the birthdays you're currently tracking.
        </p>

        {errorMessage && (
          <div className="mb-5 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading members...</p>
        ) : (
          <MemberTable
            members={members}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </Card>

      {/* Edit Member Panel */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md">
            <Card>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Member
              </h3>
              <MemberForm
                initialValues={{
                  name: editingMember.name,
                  phone: editingMember.phone,
                  dob: editingMember.dob,
                }}
                onSubmit={handleUpdate}
                submitLabel="Update Member"
              />
              <button
                onClick={() => setEditingMember(null)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 w-full text-center"
              >
                Cancel
              </button>
            </Card>
          </div>
        </div>
      )}

      {/* Delete Confirmation Panel */}
      {memberToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm">
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Member?
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-700">
                  {memberToDelete.name}
                </span>
                ? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setMemberToDelete(null)}
                >
                  Cancel
                </Button>
                <Button variant="danger" className="flex-1" onClick={confirmDelete}>
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
