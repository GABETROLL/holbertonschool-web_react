import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  bodySectionTitle: {
    fontSize: 28,
  },
});

function BodySection({title, children}) {
  return (
    <div className="bodySection">
      <h2 className={css(styles.bodySectionTitle)}>{title}</h2>
      {children}
    </div>
  );
}

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node, // correct type ?
};

export default BodySection;
