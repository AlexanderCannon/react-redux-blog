import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../actions';

class PostsDetails extends Component {
  componentDidMount() {
    //stops re-rendering (possibly not needed to keep contnt fresh)
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return (<div>
        <Link to="/" className="btn btn-primary">X</Link>
        <br />Loading...</div>)
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">X</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  };
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetails);
