import { createRoot } from 'react-dom/client';

import { Home } from './screen/Home/Home';

import '../src/style/global.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Home />);