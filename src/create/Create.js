import "./Create.css";
import { useEffect, useState } from "react";
import { useFetch } from "../components/hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../components/firebase/config";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setNewIngredients] = useState([]);

  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    // postData({title, method, cookingTime, ingredients})
    const doc = { title, method, cookingTime, ingredients };
    projectFirestore.collection("recipes").add(doc);
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setNewIngredients((prev) => [...prev, newIngredient]);
    }
    setNewIngredient("");
  };

  return (
    <form onSubmit={handleForm} className="create">
      <label>
        <span>Title:</span>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label>
        <span>Ingredients:</span>
        <div className="ingredients">
          <input
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
          />
          <button onClick={handleClick}>Add</button>
        </div>
        <p>
          <strong>Ing: </strong>
          {ingredients.map((ing) => {
            return <small key={ing}>{ing}, </small>;
          })}
        </p>
      </label>

      <label>
        <span>Method:</span>
        <textarea
          required
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        ></textarea>
      </label>

      <label>
        <span>Cooking Time:</span>
        <input
          type="number"
          required
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
        />
      </label>

      <button>Submit</button>
    </form>
  );
}

export default Create;
