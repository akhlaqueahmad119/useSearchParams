
import React from "react";

const DropDown = ({
  allCategories,
  setSelectedCategories,
  selectedCategories,
  setSearchParams,
}) => {
  const allProductsData = [
    "men's clothing",
    "electronics",
    "jewelery",
    "women's clothing",
  ]; 
  const handleChange = (event) => {
    const value = event.target.value
    console.log(value)
    let updatedChecked;
    if (event.target.checked) {
      updatedChecked = [...selectedCategories,value]
    } else {
      updatedChecked = selectedCategories.filter((item) => item !== value);
  }
    setSelectedCategories(updatedChecked)
    console.log(updatedChecked, "updates")
   updatedChecked.length > 0
     ? setSearchParams({ category: updatedChecked.join(",") })
     : setSearchParams({});

 }

  return (
    <div>
      {allProductsData.map((category) => (
        <span key={category}>
          <label>
            {category} :{" "}
            <input
              type="checkbox"
              name="myCheckbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleChange}
            />
          </label>
        </span>
      ))}
    </div>
  );
};

export default DropDown;

































































// import React from "react";

// const DropDown = ({
//   allCategories,
//   setSelectedCategories,
//   selectedCategories,
//   setSearchParams,
// }) => {
//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     let updatedCategories;

//     if (e.target.checked) {
//       updatedCategories = [...selectedCategories, value];
//     } else {
//       updatedCategories = selectedCategories.filter((cat) => cat !== value);
//     }
//     setSelectedCategories(updatedCategories);
//     if (updatedCategories.length > 0) {
//       setSearchParams({ category:updatedCategories.join(",") });
//     } else {
//       setSearchParams({});
//     }
//   };

//   return (
//     <div>
//       {allCategories.map((category) => (
//         <span key={category}>
//           <label>
//             {category}:{" "}
//             <input
//               type="checkbox"
//               name="myCheckbox"
//               value={category}
//               checked={selectedCategories.includes(category)}
//               onChange={handleCategoryChange}
//             />
//           </label>
//         </span>
//       ))}
//     </div>
//   );
// };

// export default DropDown;





