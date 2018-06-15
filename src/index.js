import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
