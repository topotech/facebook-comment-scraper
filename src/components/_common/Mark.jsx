import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Mark extends Component {
  static propTypes = {
    children: PropTypes.string,
    mark: PropTypes.string,
  }

  render() {
    const { children, mark } = this.props;

    if (
      !mark ||
      !children ||
      (typeof children !== 'string' && typeof children !== 'number')
    ) {
      return children;
    }

    const contentString = children.toString();
    const lowercasedContent = contentString.toLowerCase().split(mark.toLowerCase());

    if (lowercasedContent.length === 1) {
      return children;
    }

    let index = 0;
    const markedContent = lowercasedContent.reduce((arr, chunk) => {
      arr.push(contentString.substring(index, index += chunk.length));
      const markedChunk = contentString.substring(index, index += mark.length);
      if (markedChunk) {
        arr.push(
          <mark>{markedChunk}</mark>,
        );
      }
      return arr;
    }, []);

    return (
      <React.Fragment>
        {markedContent}
      </React.Fragment>
    );
  }
}
