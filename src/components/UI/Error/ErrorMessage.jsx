export default function ErrorMessage({ children }) {
  return (
    <p className="no-data-fetch" role="alert" aria-live="assertive">
      {children || "Something went wrong. Please try again."}
    </p>
  );
}
