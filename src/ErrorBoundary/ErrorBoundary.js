import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className='Noteful_error-message'>Something went wrong, this component failed</p>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;