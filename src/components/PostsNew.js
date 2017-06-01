import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postPost } from '../actions'
class PostNew extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'title',
      categories: 'categories',
      content: 'content'
    }
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const fieldClass = `form-group ${touched ? error ? 'has-danger' : 'has-success' : ''}`

    return (
      <div className={fieldClass}>
        <label>{field.label}</label>
        <input
          placeholder={field.placeholderText}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  };
  onSubmit(values) {
    this.props.postPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name={this.state.title} component={this.renderField} label="Title" />
        <Field name={this.state.categories} placeholderText="Enter your tags seperated by commas" component={this.renderField} label="Categories" />
        <Field name={this.state.content} component={this.renderField} label="Post Content" />
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  };
};

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Please enter a title.";
  }
  if (!values.categories) {
    errors.categories = "Remember to pick some categories!";
  }
  if (!values.content) {
    errors.content = "Remember to include the blog post!";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { postPost })(PostNew));