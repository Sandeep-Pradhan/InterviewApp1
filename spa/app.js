"use strict";

import Navbar from "./views/components/navbar.js";
import Interviews from "./views/pages/Interviews.js";
import editInterview from "./views/pages/editInterview.js";
import showInterview from "./views/pages/showInterview.js";
import newInterview from "./views/pages/newInterview.js";

import Participants from "./views/pages/participants.js";
import editParticipant from "./views/pages/editParticipant.js";
import showParticipant from "./views/pages/showParticipant.js";
import addParticipant from "./views/pages/addParticipant.js";
import Error404 from "./views/pages/Error404.js";
import Utils from "./services/Utils.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Interviews,
  "/interviews/:id/edit": editInterview,
  "/interviews/:id/show": showInterview,
  "/interviews/new": newInterview,

  "/participants": Participants,
  "/participants/:id/edit": editParticipant,
  "/participants/:id/show": showParticipant,
  "/participants/new": addParticipant,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");

  // Render the Header and footer of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
