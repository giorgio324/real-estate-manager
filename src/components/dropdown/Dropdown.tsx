import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DropdownButton from './DropdownButton';
import DropdownHeader from './DropdownHeader';
import DropdownBody from './DropdownBody';

type DropdownProps = {
  buttonTitle: string;
  headerTitle: string;
  children?: React.ReactNode;
};

const Dropdown = ({ buttonTitle, headerTitle, children }: DropdownProps) => {
  /* position იღებს ღილაკის ადგილმდებარეობას და ამის მიხედვით გამომაქვს მოდალის მსგავსი მენიუ რომლის პოზიცია ყენდება ამავე კოორდინატებით */
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const position = buttonRef.current?.getBoundingClientRect();
  let top = 0;
  let left = 0;

  if (position) {
    top = position.bottom + 10;
    left = position.left - 6;
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div>
      <DropdownButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        buttonTitle={buttonTitle}
        buttonRef={buttonRef}
      />
      {isOpen &&
        createPortal(
          <DropdownBody
            position={{ top, left }}
            onClose={() => setIsOpen(false)}
          >
            <DropdownHeader title={headerTitle} />
            {children}
          </DropdownBody>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
