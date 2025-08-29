import React from "react";
import PopiLooViews from "./PopiLooViews.jsx";

// ErrorBoundary para capturar errores silenciosos que causan pantalla blanca
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, err: error };
  }
  componentDidCatch(error, info) {
    console.error("PopiLoo ErrorBoundary:", error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>⚠️ Se rompió una vista en runtime</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fee2e2", padding: 12 }}>
{String(this.state.err)}
          </pre>
          {this.state.info && (
            <details style={{ marginTop: 8 }}>
              <summary>Stack</summary>
              <pre style={{ whiteSpace: "pre-wrap" }}>
{this.state.info?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <PopiLooViews />
    </ErrorBoundary>
  );
}
