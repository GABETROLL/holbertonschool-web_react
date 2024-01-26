import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  CourseListTh: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: '3px lightgrey solid',
  },
  // #CourseList thead tr:first-child
  CourseListCaption: {
    textAlign: 'center',
  },
});

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  // console.log(typeof isHeader, typeof textFirstCell, typeof textSecondCell);

  const headerRowStyle = { backgroundColor: '#deb5b545' };
  const bodyRowStyle = { backgroundColor: '#f5f5f5ab' };

  if (isHeader) {
    if (!textSecondCell) {
      return (
        <tr style={headerRowStyle}>
          <th className={css(styles.CourseListTh, styles.CourseListCaption)} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr style={headerRowStyle}>
        <th className={css(styles.CourseListTh)}>{textFirstCell}</th>
        <th className={css(styles.CourseListTh)}>{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr style={bodyRowStyle}>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
