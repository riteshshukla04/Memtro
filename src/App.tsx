import { EditorProvider } from './features/editor/context/EditorContext';
import { EditorLayout } from './features/editor/EditorLayout';
import { MobileWarning } from './components/MobileWarning';

function App() {
  return (
    <EditorProvider>
      <EditorLayout />
      {/* <MobileWarning /> */}
    </EditorProvider>
  )
}

export default App
