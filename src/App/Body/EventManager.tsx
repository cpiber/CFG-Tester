import React from "react";
import Query from "../Logic/querys";

let hashInit = false;

const EventManager = () => {
  const q = Query.useContainer().updateQuery;

  if (!hashInit) {
    hashInit = true;

    window.addEventListener('hashchange', () => q(window.location.hash));
    q(window.location.hash);
  }

  return <React.Fragment />;
}
export default EventManager;