import React from "react";
import ReactDom from "react-dom";

// const el = React.createElement(
//     'h2',
//     null,
//     'Lift History with React!',
//     React.createElement('span', null, 'Elo React!')
// );

const el = <h2>Lift History with React! <span>Elo React!</span></h2>

console.log(el);
ReactDom.render(el, document.getElementById('lift-stuff-app'));


