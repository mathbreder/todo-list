import { PropsWithChildren } from "react";

import './Checkbox.css';

type CheckboxProps = PropsWithChildren & {
  checked: boolean;
  onChange: () => void;
};

export const Checkbox = ({ children, checked, onChange }: CheckboxProps) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={checked} onChange={(onChange)} />
        <span className="label">{children}</span>
      </label>
    </div>
  );
};
