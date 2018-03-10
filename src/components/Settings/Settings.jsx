import React, { Component } from 'react';
import PropTypes from 'prop-types';

const read = () => btoa(unescape(encodeURIComponent(window.localStorage['facebook-comment-scraper'])));

const decode = str => decodeURIComponent(escape(atob(str)));

const write = (data) => {
  if (confirm('This will permanently overwrite your previous settings. Do you really want to continue?')) {
    window.localStorage['facebook-comment-scraper'] = data;
    window.location.reload();
  }
};

const download = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export default class Settings extends Component {
  static propTypes = {
    apiId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    setKey: PropTypes.func.isRequired,
  }

  onClickExport = () => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getTime()}`;
    const content = read();

    download(`${timestamp}.fcsbackup`, content);
  }

  onSelectFile = (event) => {
    const [file] = event.target.files;
    const [, extension] = file.name.split('.');

    if (extension === 'fcsbackup') {
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const encodedData = readEvent.target.result;
        try {
          const data = decode(encodedData);
          write(data);
        } catch (error) {
          alert('Invalid file (error code: 2).');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Invalid file (error code: 1).');
    }
  }

  render() {
    const { apiId, apiKey } = this.props;

    return (
      <section>
        <h2>Settings</h2>

        <fieldset>
          <div>
            <label htmlFor="id">Facebook ID</label>
            <input
              type="text"
              id="id"
              defaultValue={apiId}
              onChange={event => this.props.setId(event.target.value)}
              pattern="^[0-9]*$"
            />
          </div>

          <div>
            <label htmlFor="key">API Key</label>
            <input
              type="text"
              id="key"
              defaultValue={apiKey}
              onChange={event => this.props.setKey(event.target.value)}
              pattern="^[0-9a-f]*$"
            />
          </div>

          <div>
            <label htmlFor="import">Export data</label>
            <button onClick={this.onClickExport}>
              Export data
            </button>
          </div>

          <div>
            <label htmlFor="import">Import data</label>
            <input type="file" onChange={this.onSelectFile} />
          </div>
        </fieldset>
      </section>
    );
  }
}
