import { FC, ReactElement  } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactElement | string;
  outline?: boolean;
  black?: boolean;
  className: string;
  onClick?: any;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, outline, black, onClick, className  } = props;
  return (
    <button
      className={classNames('button', className, {
        'button--outline': outline,
        'button--black': black,
      })}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
