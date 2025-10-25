export default function Toast({ message, type }) {
  const bg =
    type === "error"
      ? "bg-red-500"
      : type === "success"
        ? "bg-green-500"
        : "bg-gray-700";

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 transform rounded-lg px-6 py-3 text-white shadow-lg ${bg} animate-fadeIn`}
    >
      {message}
    </div>
  );
}
