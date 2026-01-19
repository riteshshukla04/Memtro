import { EditorProvider } from './features/editor/context/EditorContext';
import { EditorLayout } from './features/editor/EditorLayout';

function App() {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  )
}

export default App
