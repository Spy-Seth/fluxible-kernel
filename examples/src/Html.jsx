import React from 'react';

class Html extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />

                <title>{this.props.title}</title>

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>

                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            </body>
            </html>
        );
    }
}

Html.propTypes = {
    title: React.PropTypes.string,
    markup: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
};

Html.defaultProps = {
    title: 'Demo page',
};

export default Html;
