import React from 'react';
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css';

function BodySectionWithMarginBottom(props) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection {...props} />
    </div>
  );
}
BodySectionWithMarginBottom.propTypes = BodySection.propTypes;
export default BodySectionWithMarginBottom;
