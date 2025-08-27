import React, { Suspense, lazy } from 'react';

// Lazy load 3D components to reduce initial bundle size
const MillenniumFalcon = lazy(() => import('./MillenniumFalcon.jsx'));
const Globe = lazy(() => import('./globe.jsx'));

// Loading fallback for 3D components
const ThreeJSFallback = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-300 text-lg">Loading 3D Experience...</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your interactive portfolio</p>
    </div>
  </div>
);

// Error fallback for 3D components
const ThreeJSErrorFallback = ({ error, retry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-8">
    <div className="text-center">
      <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 className="text-xl font-semibold text-red-200 mb-2">3D Loading Error</h3>
      <p className="text-red-300 mb-4 max-w-md">
        We encountered an issue loading the 3D content. This might be due to device compatibility or network issues.
      </p>
      <button
        onClick={retry}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mr-3"
      >
        Try Again
      </button>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

// Lazy Millennium Falcon component
export const LazyMillenniumFalcon = (props) => (
  <Suspense fallback={<ThreeJSFallback />}>
    <ErrorBoundary fallback={<ThreeJSErrorFallback />}>
      <MillenniumFalcon {...props} />
    </ErrorBoundary>
  </Suspense>
);

// Lazy Globe component
export const LazyGlobe = (props) => (
  <Suspense fallback={<ThreeJSFallback />}>
    <ErrorBoundary fallback={<ThreeJSErrorFallback />}>
      <Globe {...props} />
    </ErrorBoundary>
  </Suspense>
);

// Simple error boundary for lazy components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback({ 
        error: this.state.error, 
        retry: () => this.setState({ hasError: false, error: null }) 
      });
    }

    return this.props.children;
  }
}

export default { LazyMillenniumFalcon, LazyGlobe };
