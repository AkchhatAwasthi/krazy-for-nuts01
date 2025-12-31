import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <h1 style={{ color: '#dc2626', marginBottom: '20px' }}>
                        ⚠️ Something went wrong
                    </h1>

                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Error Details:</h2>
                        <pre style={{
                            background: '#fff',
                            padding: '15px',
                            borderRadius: '4px',
                            overflow: 'auto',
                            fontSize: '14px'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                    </div>

                    <div style={{
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Common Solutions:</h2>
                        <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Check browser console (F12) for more details</li>
                            <li>Verify environment variables are set in Netlify</li>
                            <li>Ensure all required variables start with <code>VITE_</code></li>
                            <li>Redeploy after adding environment variables</li>
                            <li>Clear browser cache and reload</li>
                        </ol>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        Reload Page
                    </button>

                    <button
                        onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                        style={{
                            background: '#6b7280',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>

                    {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                        <details style={{ marginTop: '20px' }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                Stack Trace (Development Only)
                            </summary>
                            <pre style={{
                                background: '#f3f4f6',
                                padding: '15px',
                                borderRadius: '4px',
                                overflow: 'auto',
                                fontSize: '12px',
                                marginTop: '10px'
                            }}>
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
