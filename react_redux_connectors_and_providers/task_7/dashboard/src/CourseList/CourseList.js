import React from 'react';
import PropTypes from 'prop-types';
import CourseShape from './CourseShape';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  CourseList: {
    width: '100%',
    border: '1px lightgrey solid',
    textAlign: 'left',
  },
});

function CourseList({ listCourses }) {
  return (
    <table className={css(styles.CourseList)}>
      <thead>
        <CourseListRow className={css(styles.CourseListCaption)} isHeader={true} textFirstCell="Available courses" />
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {
          listCourses && listCourses.length && listCourses.length > 0
          ? listCourses.map(course => (
            <CourseListRow key={`courseId:${course.id}`} isHeader={false} textFirstCell={course.name} textSecondCell={course.credit} />
          ))
          : (<CourseListRow key="courseId:undefined" isHeader={false} textFirstCell="No course available yet" />)
        }
      </tbody>
    </table>
  );
}

CourseList.defaultProps = {
  listCourses: [],
};
CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

export default CourseList;
