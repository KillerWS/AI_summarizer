import React, { useState } from 'react';
import './Dropdown.css'; // 样式文件
import { Link } from 'react-router-dom';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  
  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption : 'Select an option'}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              <Link to={`/v1/${option.toLowerCase()}`}>{option}</Link>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

