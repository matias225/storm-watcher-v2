import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';

export function StormApp() {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}