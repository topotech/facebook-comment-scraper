import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { find, stringToArray } from '../../utils/string';

export default class Mark extends PureComponent {
  static propTypes = {
    children: PropTypes.string,
    mark: PropTypes.string,
  }

  static defaultProps = {
    mark: '',
  }

  render() {
    const { children, mark } = this.props;

    if (!mark || !children) {
      return children;
    }

    const string = children.toString();
    const markArr = stringToArray(mark);

    const results = {};
    let hasResults = false;
    markArr.forEach((markWord) => {
      const where = find(string, markWord);
      if (where.length) {
        results[markWord] = where;
        hasResults = true;
      }
    });

    if (!hasResults) {
      return children;
    }

    const strArr = [...children];
    let shorterBy = 0;
    Object.keys(results).forEach((markWord) => {
      const where = results[markWord];
      where.forEach((position) => {
        const adjustedPosition = position - shorterBy;

        const result = (
          <mark key={`${markWord}_${position}`}>
            {strArr.slice(adjustedPosition, adjustedPosition + markWord.length)}
          </mark>
        );

        strArr.splice(adjustedPosition, markWord.length, result);
        shorterBy += markWord.length - 1;
      });
    });

    return strArr;
  }
}
