import { FC, ReactElement  } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactElement;
  outline: boolean, 
  onClick: any;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, outline, onClick } = props;
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

export default Button;
