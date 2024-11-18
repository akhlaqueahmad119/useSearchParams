

import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import DropDown from "./DropDown";
import { useSearchParams } from "react-router-dom";

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const selectedCategory = React.useMemo(() => {
    let category = searchParams.get("category");
    return category ? category.split(",") : [];
  }, [searchParams]);


  useEffect(() => {
    setSearchParams({})
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let data = [];
        if (selectedCategory.length === 0) {
          const response = await fetch("https://fakestoreapi.com/products");
          if (response.status !== 200) {
            throw new Error(`Failed to fetch all products`);
          }
          data = await response.json();
        } else {
          const allData = await Promise.all(
            selectedCategory.map(async (category) => {
              const response = await fetch(
                `https://fakestoreapi.com/products/category/${category}`
              );
              if (response.status !== 200) {
                throw new Error(`Failed to fetch category: ${category}`);
              }
              return response.json();
            })
          );
          data = allData.flat();
        }

        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <DropDown
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        setSearchParams={setSearchParams}
      />
      <h1>All Products</h1>
      <Cart allProducts={allProducts} loading={loading} />
    </div>
  );
};

export default AllProduct;













// import React, { useEffect, useState } from "react";
// import Cart from "./Cart";
// import DropDown from "./DropDown";
// import { useSearchParams } from "react-router-dom";

// const AllProduct = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   console.log(allProducts,"fariyad")
//   const [selectedCategories, setSelectedCategories] = useState(["all"]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log(searchParams, "searchParams");
//   const [loading, setLoading] = useState(false);

//   // Fetch products
//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         if (response.status !== 200)
//           throw new Error(`Getting Error: ${response.status}`);
//         const data = await response.json();
//         setAllProducts(data);
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//     setSearchParams({});
//   }, []);
//   // const selectedCategory = (searchParams.get("category") || "all").split(",");

//   // const selectedCategory = React.memo(()=>(searchParams.get("category") || "all").split(","),[searchParams])
//    const selectedCategory = React.useMemo(() => {
//      const category = searchParams.get("category");
//      return category ? category.split(",") : ["all"];
//    }, [searchParams]);

//   const allCategories = React.useMemo(() => {
//    return ["all", ...new Set(allProducts.map((item) => item.category))];
//   }, [allProducts]);
//   const filteredProduct = React.useMemo(() => {
//     return allProducts.filter((product) =>
//       selectedCategory.includes("all")
//         ? true
//         : selectedCategory.includes(product.category)
//     );
//   }, [allProducts,selectedCategory]);
//   return (
//     <div>
//       <DropDown
//         allCategories={allCategories}
//         setSelectedCategories={setSelectedCategories}
//         selectedCategories={selectedCategories}
//         setSearchParams={setSearchParams}
//       />
//       <h1>All Products</h1>
//       <Cart
//         allProducts={filteredProduct}
//         loading={loading}
//         setSelectCategories={setSelectedCategories}
//       />
//     </div>
//   );
// };

// export default AllProduct;

