import React from 'react';

class NoteError extends React.Component {
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
        <p>Something went wrong, this component failed to load</p>
      )
    }
    return this.props.children;
  }
}

export default NoteError;