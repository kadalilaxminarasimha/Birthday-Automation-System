import Button from "./Button.jsx";

/**
 * Displays a list of members in a table with Edit/Delete actions.
 *
 * Props:
 *  - members: array of { id, name, phone, dob }
 *  - onEdit: function(member)
 *  - onDelete: function(member)
 */
export default function MemberTable({ members, onEdit, onDelete }) {
  if (!members || members.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No members added yet. Click "Add Member" to get started.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-gray-500">
            <th className="py-3 px-4 font-medium">Name</th>
            <th className="py-3 px-4 font-medium">Phone Number</th>
            <th className="py-3 px-4 font-medium">Date of Birth</th>
            <th className="py-3 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 text-gray-800">{member.name}</td>
              <td className="py-3 px-4 text-gray-600">{member.phone}</td>
              <td className="py-3 px-4 text-gray-600">{member.dob}</td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                    onClick={() => onEdit(member)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="px-3 py-1.5 text-sm"
                    onClick={() => onDelete(member)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
