import { Link, useLocation } from "react-router-dom";

/**
 * Simple top navigation bar used across all pages.
 */
export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/add-member", label: "Add Member" },
    { to: "/members", label: "Members" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          🎂 Birthday Automation
        </Link>

        <div className="flex gap-2 sm:gap-4">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
