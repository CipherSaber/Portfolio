import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a suppressed error type
    const errorMessage = (error?.message || error?.toString() || '').toLowerCase();
    
    const suppressedPatterns = [
      'cannot read properties of undefined (reading \'value\')',
      'webgl',
      'three.js',
      'refreshuniformscommon',
      'framer-motion',
      'gltfloader',
      'khr_materials_pbrspecularglossiness',
      'unknown extension'
    ];
    
    const shouldSuppress = suppressedPatterns.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (shouldSuppress) {
      // Don't update state for suppressed errors - just ignore them
      return null;
    }
    
    // Update state for other errors
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorMessage = (error?.message || error?.toString() || '').toLowerCase();
    
    const suppressedPatterns = [
      'cannot read properties of undefined (reading \'value\')',
      'webgl',
      'three.js',
      'refreshuniformscommon',
      'framer-motion',
      'gltfloader',
      'khr_materials_pbrspecularglossiness',
      'unknown extension'
    ];
    
    const shouldSuppress = suppressedPatterns.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (shouldSuppress) {
      return; // Don't log or handle suppressed errors
    }
    
    // Log other errors normally
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for non-WebGL errors
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;