import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: '#e53e3e', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
                    <div style={{ background: '#fff5f5', padding: '1rem', borderRadius: '8px', border: '1px solid #feb2b2' }}>
                        <h3 style={{ marginTop: 0 }}>Error:</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{this.state.error && this.state.error.toString()}</pre>
                        <h3>Stack Trace:</h3>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#666' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
