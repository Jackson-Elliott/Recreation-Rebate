import { Navigate, Route, Routes } from 'react-router-dom'
import ActivitiesScreen from './screens/ActivitiesScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import LoadingScreen from './screens/LoadingScreen'
import RedeemedScreen from './screens/RedeemedScreen'
import UploadScreen from './screens/UploadScreen'

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/upload" element={<UploadScreen />} />
        <Route path="/redeemed" element={<RedeemedScreen />} />
        <Route path="/activities" element={<ActivitiesScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
