import classNames from "classnames";

function Button({ children, outline, onClick }) {
  return (
    <button 
      className={classNames('button', {
        'button-outline': outline,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;