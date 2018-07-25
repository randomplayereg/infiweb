import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import "react-image-gallery/styles/css/image-gallery.css";

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
