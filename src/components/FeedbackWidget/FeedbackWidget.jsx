import React from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackWidget.module.css';

class FeedbackWidget extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = (type) => {
    this.setState((prevState) => ({
      [type]: prevState[type] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = good + neutral + bad;
    const positivePercentage = totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

    return (
      <div>
        <Section title="Give Feedback">
          <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={this.handleFeedback} />
        </Section>

        <Section title="Statistics">
          {totalFeedback > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}

class FeedbackOptions extends React.Component {
  render() {
    const { options, onLeaveFeedback } = this.props;

    return (
      <div>
        {options.map((option) => (
          <button
            key={option}
            className={styles.button}
            onClick={() => onLeaveFeedback(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
}

class Statistics extends React.Component {
  render() {
    const { good, neutral, bad, total, positivePercentage } = this.props;

    return (
      <div>
        <div>Good: {good}</div>
        <div>Neutral: {neutral}</div>
        <div>Bad: {bad}</div>
        <div>Total Feedback: {total}</div>
        <div>Positive Feedback Percentage: {positivePercentage}%</div>
      </div>
    );
  }
}

class Section extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    );
  }
}

class Notification extends React.Component {
  render() {
    return <div className={styles.notification}>{this.props.message}</div>;
  }
}

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number.isRequired,
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FeedbackWidget;
