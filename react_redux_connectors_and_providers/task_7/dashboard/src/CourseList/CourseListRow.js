import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  CouseListHeaderRow: {
    backgroundColor: '#deb5b545',
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
  CourseListBodyRow: {
    backgroundColor: '#f5f5f5ab'
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

/**
 * The props: `id`, `onChangeRow` and `isChecked`, are not needed,
 * if the component is meant to be a header row (`isHeader: true`).
 */
function CourseListRow({ id, onChangeRow, isChecked, isHeader, textFirstCell, textSecondCell }) {
  return (
    <tr className={css(
      isHeader ? styles.CouseListHeaderRow : [
        styles.CourseListBodyRow,
        isChecked && styles.rowChecked
      ],
    )}>
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
            <td>
              <input
                type="checkbox" name={`checkbox:${textFirstCell}`}
                onChange={(event) => onChangeRow(id, event.target.checked)}
                checked={isChecked}
              />
              {textFirstCell}
            </td>
            <td>{textSecondCell}</td>
          </>
        )
      }
    </tr>
  );
}

CourseListRow.defaultProps = {
  id: null,
  isChecked: false,
  onChangeRow: (id) => console.log(`CALLED DEFAULT \`CourseListRow\` PROP: onChangeRow(${id})`),
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  onChangeRow: PropTypes.func,
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
