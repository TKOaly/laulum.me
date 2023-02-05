import { Link } from "@/components/Link";

const Offline = () => {
  return (
    <main>
      <h1>No internet connection</h1>
      <p>You can still view songs that have been cached.</p>
      <nav
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Link href="/" variant="primary">
          Return to main page
        </Link>
      </nav>
    </main>
  );
};

export default Offline;
