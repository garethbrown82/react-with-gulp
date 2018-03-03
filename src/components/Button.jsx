import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    render() {
        return (
            <button>
                {this.props.text || this.props.children}
            </button>
        );
    }
};

Button.propTypes = {
    text: PropTypes.string,
}