import React from "react";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

  if (!localStorage.getItem("login_recipe_recommender")) {
    history.push("/login");
  }

  return (
    <div>
      <ul className="navbar-ul">
        <li
          className="navbar-li nav-brand"
          onClick={() => history.push("/home")}
          style={{ cursor: "pointer" }}
        >
          Recipe Recommender
        </li>

        <li
          className="navbar-li navbar-li-right"
          onClick={() => {
            localStorage.removeItem("login_recipe_recommender");
            history.push("/login");
          }}
          style={{ cursor: "pointer" }}
        >
          Logout
        </li>
        <li
          className="navbar-li navbar-li-right"
          onClick={() => history.push("/add-recipe")}
          style={{ cursor: "pointer" }}
        >
          Add Recipes
        </li>
        <li
          className="navbar-li navbar-li-right"
          onClick={() => history.push("/search-recipe")}
          style={{ cursor: "pointer" }}
        >
          Search Recipes
        </li>
        <li
          className="navbar-li navbar-li-right"
          onClick={() => history.push("/saved-recipes")}
          style={{ cursor: "pointer" }}
        >
          Saved Recipes
        </li>
      </ul>
    </div>
  );
}
export default Header;
