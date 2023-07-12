import React from 'react';
import PropTypes from 'prop-types';
import styles from '../FeedbackWidget/FeedbackWidget.module.css';

class Notification extends React.Component {
  render() {
    return <div className={styles.notification}>{this.props.message}</div>;
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
