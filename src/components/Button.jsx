import classNames from 'classnames';
import PropTypes from 'prop-types';

function Button({ children, outline, onClick }) {
  return (
    <button
      className={classNames('button', {
        'button-outline': outline,
      })}
      onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
