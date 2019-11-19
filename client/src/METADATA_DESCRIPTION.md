# Metadata

The metadata stored in the app config will have the following format:

```js
metadata = {
  gracePeriodMin, // integer number
  maxLateDaysPerSemester, // integer number
  maxLateDaysPerAssignment, // integer number
  assignmentGroupIdsToCount, // array of assignment group ids
};
```