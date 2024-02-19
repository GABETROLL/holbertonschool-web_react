import React from 'react';

export default function WithLogging(WrappedComponent) {
  const NAME_OF_THE_WRAPPED_COMPONENT = WrappedComponent.displayName || 'Component';

  class HOC extends React.Component {
    componentDidMount() {
      console.log(`Component ${NAME_OF_THE_WRAPPED_COMPONENT} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${NAME_OF_THE_WRAPPED_COMPONENT} is going to unmount`);
    }

    render() {
      return (<WrappedComponent {...(this.props)} />);
    }
  };
  HOC.displayName = `WithLogging(${NAME_OF_THE_WRAPPED_COMPONENT})`;
  return HOC;
}
