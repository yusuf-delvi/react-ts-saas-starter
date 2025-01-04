import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

if (!googleClientId) {
	throw new Error('Google Client ID is not defined in environment variables');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId={googleClientId}>
		<App />
	</GoogleOAuthProvider>
);
