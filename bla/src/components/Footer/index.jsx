import React from 'react';

import WebsocketStatus from 'containers/WebsocketStatus';
import CopyRight from 'containers/Footer/CopyRight';
import Version from './Version';

const Footer = () => (
  <footer>
    <CopyRight />
    <p className="text-center">
      <WebsocketStatus title="Websocket Status" />
    </p>
    <span className="pull-right">Version: <Version /></span>
  </footer>
);

export default Footer;
