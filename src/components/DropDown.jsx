
import React from "react";

const DropDown = ({
  allCategories,
  setSelectedCategories,
  selectedCategories,
  setSearchParams,
}) => {
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    let updatedCategories;

    if (e.target.checked) {
      updatedCategories = [...selectedCategories, value];
    } else {
      updatedCategories = selectedCategories.filter((cat) => cat !== value);
    }
    setSelectedCategories(updatedCategories);
    if (updatedCategories.length > 0) {
      setSearchParams({ category:updatedCategories.join(",") });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      {allCategories.map((category) => (
        <span key={category}>
          <label>
            {category}:{" "}
            <input
              type="checkbox"
              name="myCheckbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
          </label>
        </span>
      ))}
    </div>
  );
};

export default DropDown;





