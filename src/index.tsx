import { createRoot } from 'react-dom/client';

import { App } from './screen/App';

import '../src/style/global.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);