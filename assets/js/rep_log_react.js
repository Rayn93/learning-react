import React from "react";
import ReactDom from "react-dom";

const el = React.createElement(
    'h2',
    null,
    'Lift History with React!',
    React.createElement('span', null, 'My span element 2')
);
console.log(el);
ReactDom.render(el, document.getElementById('lift-stuff-app'));


