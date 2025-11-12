import './Button.scss';

interface ButtonProps {
  type?: string;
  children: React.ReactNode;
  customClassName?: string;
  onClick?: () => void;
}

const Button = ({type = 'primary', children, customClassName, onClick}: ButtonProps) => {

  const buttonClasses = `button-main button-main--${type} ${customClassName || ''}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;