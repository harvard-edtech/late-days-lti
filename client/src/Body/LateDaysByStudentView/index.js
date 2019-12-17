import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';

// Import other components
import ItemList from '../../shared/ItemList';

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
      <div className="latedaysbystudentview-container content-container">
        <h1 className="latedaysbystudentview-header text-center">
          Late Days By Student
        </h1>

        <div className="text-center mb-5">
          <div className="alert alert-info d-inline-block">
            <FontAwesomeIcon icon={faHandPointer} className="mr-2" />
            <strong>Click&nbsp;</strong>
            a student to get in touch and to
            see which assignments they used late days on
          </div>
        </div>

        <ItemList
          items={items}
          valueDenominator={maxLateDaysPerSemester}
          nameHeader="Student Name"
          valueHeader="Total Late Days"
          valueSuffix="Used"
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
