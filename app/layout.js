import './globals.css';
import {App} from './App';
import {Header} from './components/Header/Header.jsx';
import {Footer} from './components/Footer/footer.jsx';
export const metadata = {
  title: 'Pindie',
  description: 'Портал инди-игр от студентов Яндекс Практикума',
}
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
                <App>{children}</App>
            </body>
    </html>
  )
} 