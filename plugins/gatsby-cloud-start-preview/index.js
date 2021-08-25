import React from "react";
import PropTypes from "prop-types";
import getIt from "get-it";
import jsonResponse from "get-it/lib/middleware/jsonResponse";
import promise from "get-it/lib/middleware/promise";
import Button from "part:@sanity/components/buttons/default";

import styles from "./Cats.css";

const request = getIt([promise(), jsonResponse()]);

class Cats extends React.Component {
  static propTypes = {
    imageWidth: PropTypes.number,
  };

  static defaultProps = {
    imageWidth: 600,
  };

  state = {
    imageUrl: null,
    error: null,
    postStatus: "",
    postStatusMessage: "waiting",
  };
  getCat = () => {
    request({ url: "https://api.thecatapi.com/v1/images/search" })
      .then((response) => {
        const imageUrl = response.body[0].url;
        this.setState({ imageUrl });
      })
      .catch((error) => this.setState({ error }));
  };

  postWebHook = () => {
    var url =
      "https://webhook.gatsbyjs.com/hooks/data_source/94d47276-df4b-4d9d-b368-63cc85cdf361";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Content-Length", "0");

    var parentThis = this;

    xhr.onreadystatechange = function (parentThis) {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        if (xhr.status == 204)
          parentThis.setState({
            postStatusMessage: "Request Sent, building preview.",
          });
        console.log(xhr.responseText);
      }
    };

    xhr.send();
    // console.log("pressed");
  };

  componentDidMount() {
    this.getCat();
  }

  render() {
    const { imageUrl, error, postStatusMessage } = this.state;
    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }
    const { imageWidth } = this.props;
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>(Re)Start Preview Server</h2>
        </header>
        <div className={styles.content}>
          <p>
            If the preview is not working, or you're getting an error saying it
            needs to be restarted, press this button, once, then wait for 2
            minutes and try again. Preview should work then.
          </p>
        </div>
        <div className={styles.footer}>
          <Button color="primary" onClick={this.postWebHook}>
            Start Cloud Preview
          </Button>
          {/* <p>{postStatusMessage}</p> */}
        </div>
      </div>
    );
  }
}

export default {
  name: "gatsby-cloud-start-preview",
  component: Cats,
};
