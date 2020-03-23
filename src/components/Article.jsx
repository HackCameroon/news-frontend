import React, { Component } from "react";
import moment from "moment";

import { fetchArticleById } from "../api";
import CommentsByArticle from "./CommentsByArticle";
import Votes from "./Votes";
import ErrorMsg from "./ErrorMsg";

import S from "./StyledComponents";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    error: null
  };

  fetchArticle = id => {
    fetchArticleById(id)
      .then(({ data }) => {
        this.setState({ article: data.article, isLoading: false });
      })
      .catch(error => {
        this.setState({ error: error.response, isLoading: false });
      });
  };

  componentDidMount() {
    const { article_id } = this.props;
    this.fetchArticle(article_id);
  }

  render() {
    const {
      title,
      body,
      votes,
      topic,
      author,
      created_at,
      comment_count
    } = this.state.article;

    const { error, isLoading } = this.state;
    const { article_id, userLoggedIn } = this.props;

    if (error) {
      return <ErrorMsg status={error.status} msg={error.data.msg} />;
    } else if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <S.Article>
          <h1>{title}</h1>
          Written by{" "}
          <S.WrittenByLink to={`/articles/authors/${author}`}>
            {author}
          </S.WrittenByLink>{" "}
          in <S.TopicLink to={`/articles/topics/${topic}`}>{topic}</S.TopicLink>{" "}
          on {moment(created_at).format("DD-MM-YYYY")}
          <article>{body}</article>
          <div>
            <Votes type={"articles"} id={article_id} votes={votes} />
            <p>✎ {comment_count}</p>
          </div>
          <CommentsByArticle
            article_id={article_id}
            userLoggedIn={userLoggedIn}
            comment_count={comment_count}
          />
        </S.Article>
      );
    }
  }
}

export default Article;
