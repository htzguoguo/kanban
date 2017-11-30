import React from 'react';

export default class Editable extends React.Component {
    render () {
        const {value, onEdit, onValueClick, editing, onDelete, ...props} = this.props;
        return (
            <div {...props}>
                {editing ? this.renderEdit() : this.renderValue()}
            </div>
        );
    }
    renderEdit = () => {
        return <input type="text"
                    ref = {(e) => e ? e.selectionStart = this.props.value.length : null}
                    autoFocus={true}
                    defaultValue={this.props.value}
                    onBlur={this.finishEdit}
                    onKeyPress={this.checkEnter}
        />
    };
    renderValue = () => {
        return (
            <div onClick={this.props.onValueClick}>
                <span className="value">{this.props.value}</span>
                {this.props.onDelete ? this.renderDelete() : null }
            </div>
        );
    };
    renderDelete = () => {
        return (<button
            className="delete"
            onClick={this.props.onDelete}>x</button>);
    };
    finishEdit = (e) => {
        const value = e.target.value;
        if (this.props.onEdit) {
            this.props.onEdit(value);
        }
    };
    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    };
}