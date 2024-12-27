import { Suspense } from 'react';
import PostsProvider from './providers/PostsProvider';
import { BrowserRouter } from 'react-router';
import RouterProvider from './providers/RouterProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';
import PostsProviderOptimistic from './providers/PostsProviderOptimistic';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          {/* <PostsProvider> */}
          <PostsProviderOptimistic>
            <RouterProvider />
          </PostsProviderOptimistic>
          {/* </PostsProvider> */}
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
