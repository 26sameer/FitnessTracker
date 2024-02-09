import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider attribute="class">
      <Theme accentColor="sky" grayColor="olive" radius="large">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  </Router>
);
