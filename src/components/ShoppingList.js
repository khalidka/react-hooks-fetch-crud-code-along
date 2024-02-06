import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
// Update state by passing the array of items to setItems 
  useEffect(() =>{
    fetch("http://localhost:4000/items")
    .then((response) => response.json())
    
    .then((items) => setItems(items))
  }, [])

  // add this callback function
  function handleUpdateItem(updatedItem) {
    console.log("In ShoppingCart:", updatedItem);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  
  // add this callback function
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  

  return (
    <div className="ShoppingList">
      {/* add the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
