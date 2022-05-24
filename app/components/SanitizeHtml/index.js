/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

function SanitizeHtml({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

SanitizeHtml.propTypes = {
  html: PropTypes.string.isRequired,
};

export default SanitizeHtml;
