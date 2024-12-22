import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// Google client id is required
	<GoogleOAuthProvider clientId='google-client-id'>
		<App />
	</GoogleOAuthProvider>
);
