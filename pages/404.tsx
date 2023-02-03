import { Link } from "@/components/Link";

const Custom404 = () => {
  return (
    <main>
      <h1>404 - Not found</h1>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link href="/" variant="primary">
          Return to main page
        </Link>
        <Link
          href="https://github.com/TKOaly/laulum.me"
          variant="secondary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Contribute a song
        </Link>
      </nav>
    </main>
  );
};

export default Custom404;
