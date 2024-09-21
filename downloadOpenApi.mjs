import fs from 'node:fs';
import https from 'node:https';

function downloadFile(url, destination, { accessToken, prefix = 'Token' }) {
  const file = fs.createWriteStream(destination);

  const options = {
    headers: {
      'Authorization': `${prefix} ${accessToken}`,
    },
  };

  https.get(url, options, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to get '${url}' (${response.statusCode})`);
      return;
    }

    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('Download completed!');
    });
  }).on('error', (err) => {
    fs.unlink(destination, () => {});
    console.error(`Error: ${err.message}`);
  });
}

const url = process.env.OPENAPI_URL;
const destination = 'openapi.json';
const accessToken = process.env.OPENAPI_TOKEN;

downloadFile(url, destination, { accessToken });
