/**
 * Simple rounded card with soft shadow, used to wrap page content.
 */
export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
