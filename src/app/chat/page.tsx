import ProtectedRoute from '@/components/ProtectedRoute'
import ChatPage from '@/components/ChatPage' // If your code is in a separate component
// or just define the full code in this file if not split

export default function ChatWrapper() {
  return (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  )
}
