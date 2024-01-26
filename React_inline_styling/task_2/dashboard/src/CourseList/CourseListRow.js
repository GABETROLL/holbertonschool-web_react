import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  CouseListHeaderRow: {
    backgroundColor: '#deb5b545',
  },
  CourseListBodyRow: {
    backgroundColor: '#f5f5f5ab'
  },
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

  return (
    <tr class={css( isHeader ? styles.CouseListHeaderRow : styles.CourseListBodyRow )}>
      {
        isHeader ? (
          <>
            <th className={css(styles.CourseListTh, textSecondCell ? undefined : styles.CourseListCaption)} colSpan={textSecondCell ? '1' : '2'}>{textFirstCell}</th>
            {
              textSecondCell ? (
                <th className={css(styles.CourseListTh)} colSpan="2">{textSecondCell}</th>
              ) : (<></>)
            }
          </>
        ) : (
          <>
            <td>{textFirstCell}</td>
            <td>{textSecondCell}</td>
          </>
        )
      }
    </tr>
  );

  /* if (isHeader) {
    if (!textSecondCell) {
      return (
        <>
          <th className={css(styles.CourseListTh, styles.CourseListCaption)} colSpan="2">{textFirstCell}</th>
        </>
      );
    }
    return (
      <>
        <th className={css(styles.CourseListTh)}>{textFirstCell}</th>
        <th className={css(styles.CourseListTh)}>{textSecondCell}</th>
      </>
    );
  }
  return (
    <>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </>
  ); */
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
