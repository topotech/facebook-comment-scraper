import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from '../_common/Icon';

import { decode, encode } from '../../utils/base64';
import { download } from '../../utils/file';

const read = () => encode(window.localStorage['facebook-comment-scraper']);

const write = (data) => {
  if (confirm('This will permanently overwrite your previous settings. Do you really want to continue?')) {
    window.localStorage['facebook-comment-scraper'] = data;
    window.location.reload();
  }
};

export default class Settings extends PureComponent {
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
              placeholder="eg. 100001234567890"
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
              placeholder="eg. 3dbafd352b6f06caeb2b997281001b7a"
              pattern="^[0-9a-f]*$"
            />
          </div>

          <div>
            <label htmlFor="export">Export data</label>
            <button
              id="export"
              onClick={this.onClickExport}
            >
              <Icon>file_upload</Icon>
              Export data
            </button>
          </div>

          <div>
            <label htmlFor="import">Import data</label>
            <input
              type="file"
              id="import"
              onChange={this.onSelectFile}
            />
          </div>
        </fieldset>
      </section>
    );
  }
}
