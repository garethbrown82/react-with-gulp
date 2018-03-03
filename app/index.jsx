import React from 'react';
import { render } from 'react-dom';
import Button from './components/button';

window.onload = () => {
    var root = document.createElement('div');
    root.id = 'react-root';
    document.body.appendChild(root);

    render(<Button text="Hello, World!" />, root);
}