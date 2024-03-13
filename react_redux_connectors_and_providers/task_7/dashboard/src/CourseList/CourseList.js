import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import getListCourses from '../selectors/courseSelector';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  CourseList: {
    width: '100%',
    border: '1px lightgrey solid',
    textAlign: 'left',
  },
});

/**
 * Assumes `courses` comes from `courseReducer`, and has that format.
 * Returns `{ listCourses: Immutable.List<Course> }`.
 *
 * interface Course = { id: string, isSelected: boolean, name: string, credit: number };
 */
export function mapStateToProps({ courses }) {
  return { listCourses: getListCourses(courses) };
}
export const mapDispatchToProps = { fetchCourses, selectCourse, unSelectCourse };

class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeRow = this.onChangeRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow(id, checked) {
    console.log(this.props);

    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  }

  render() {
    return (
      <table className={css(styles.CourseList)}>
        <thead>
          <CourseListRow className={css(styles.CourseListCaption)} isHeader={true} textFirstCell="Available courses" />
          <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
        <tbody>
          {
            this.props.listCourses && !this.props.listCourses.isEmpty()
            ? this.props.listCourses.map(course => (
              <CourseListRow key={`courseId:${course.id}`} isHeader={false} id={course.id} isChecked={course.isSelected} onChangeRow={this.onChangeRow} textFirstCell={course.name} textSecondCell={course.credit} />
            ))
            // THIS MAY CAUSE AN ERROR!
            : (<CourseListRow key="courseId:undefined" isHeader={false} textFirstCell="No course available yet" />)
          }
        </tbody>
      </table>
    );
  }
}

CourseList.defaultProps = {
  listCourses: List([]),
  fetchCourses: (...args) => console.log(`DEFAULT \`CourseList\` PROP CALLED: fetchCourses(${args.join(', ')})`),
  selectCourse: (...args) => console.log(`DEFAULT \`CourseList\` PROP CALLED: selectCourse(${args.join(', ')})`),
  unSelectCourse: (...args) => console.log(`DEFAULT \`CourseList\` PROP CALLED: unSelectCourse(${args.join(', ')})`),
};
CourseList.propTypes = {
  listCourses: PropTypes.instanceOf(List),
  fetchCourses: PropTypes.func,
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
};

export const StatelessCourseList = CourseList;
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
