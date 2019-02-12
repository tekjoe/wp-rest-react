import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

export class Post extends Component {
  state = {
    imageUrl: "",
    author: "",
    isLoaded: false
  };

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { featured_media, author } = this.props.post;
    const getImageUrl = axios.get(
      `https://tekjoe.page/wp-json/wp/v2/media/${featured_media}`
    );
    const getAuthor = axios.get(
      `https://tekjoe.page/wp-json/wp/v2/users/${author}`
    );

    Promise.all([getImageUrl, getAuthor]).then(res => {
      this.setState({
        imageUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true
      });
    });
  }

  render() {
    const { id, title, excerpt } = this.props.post;
    const { author, imageUrl, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          <h2>{title.rendered}</h2>
          <small>
            Review by <strong>{author}</strong>
          </small>
          <br />
          <img style={{ width: "100%" }} src={imageUrl} alt={title.rendered} />
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
          <Link to={`/post/${id}`}>Read Review</Link>
          <hr />
        </div>
      );
    }
    return <h3>Loading...</h3>;
  }
}

export default Post;
