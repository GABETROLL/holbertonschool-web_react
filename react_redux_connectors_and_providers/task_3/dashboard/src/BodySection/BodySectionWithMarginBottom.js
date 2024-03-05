import React from 'react';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: 40,
  },
});

function BodySectionWithMarginBottom(props) {
  return (
    <div className={css(styles.bodySectionWithMargin)}>
      <BodySection {...props} />
    </div>
  );
}
BodySectionWithMarginBottom.propTypes = BodySection.propTypes;
export default BodySectionWithMarginBottom;
