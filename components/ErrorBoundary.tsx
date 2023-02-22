import React from "react";
import { Link } from "./Link";

type ErrorState = {
  error?: Error;
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorState
> {
  state: ErrorState = {};

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return {
      error,
    };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>An unexpected error occurred.</h2>
          <pre style={{ marginBottom: "2rem" }}>
            {this.state.error.name}:{" "}
            {this.state.error.message || "No message provided"}
          </pre>
          <Link href="/" variant="primary">
            Return to the front page
          </Link>
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
