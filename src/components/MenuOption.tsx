import React from 'react';
import "./MenuPage.css"

interface MenuOptionProps {
  icon: React.ReactNode;  // Icon for the menu option
  label: string;          // Label for the menu option
  onClick: () => void;    // Function to handle click event
}

const MenuOption: React.FC<MenuOptionProps> = ({ icon, label, onClick }) => {
  return (
    <div className="menu-option" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default MenuOption;
