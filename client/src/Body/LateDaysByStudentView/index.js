import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from '../../shared/ItemList';

import './style.css';

class LateDaysByStudentView extends Component {
  /**
   * Render LateDaysByStudentView
   */
  render() {
    const {
      students,
      lateDaysMapForEveryone,
      maxLateDaysPerSemester,
      onStudentClicked,
    } = this.props;

    const items = students.map((student) => {
      const usageNumbers = Object.values(lateDaysMapForEveryone[student.id]);
      const totalLateDaysUsed = usageNumbers.reduce((a, b) => {
        return a + b;
      }, 0);

      return {
        name: student.name,
        value: totalLateDaysUsed,
        onClick: () => {
          onStudentClicked(student);
        },
      };
    });

    return (
      <div className="latedaysbystudentview-container">
        <div className="latedaysbystudentview-header font-weight-bold">
          Late Days By Student
        </div>
        <ItemList
          items={items}
          valueDenominator={maxLateDaysPerSemester}
          nameHeader="Student Name"
          valueHeader="Total Late Days"
          valueSuffix="Used"
          footerMessage="Click a student for their assignment breakdown"
        />
      </div>
    );
  }
}

LateDaysByStudentView.propTypes = {
  // Students
  students: PropTypes.arrayOf(
    PropTypes.shape({
      // the name of the student
      name: PropTypes.string.isRequired,
      // the id of the student
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  // Late days usage map
  lateDaysMapForEveryone: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.number)
  ).isRequired,
  // The number of late days allowed per semester
  maxLateDaysPerSemester: PropTypes.number.isRequired,
  // Handler for when user clicks a student
  // @param {object} student - the student that was clicked
  onStudentClicked: PropTypes.func.isRequired,
};

export default LateDaysByStudentView;
