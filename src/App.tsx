import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';

// Auth Screens
import WelcomeScreen from './screens/auth/WelcomeScreen';
import CreateAccountDetails from './screens/auth/CreateAccountDetails';
import CreateAccountAvatar from './screens/auth/CreateAccountAvatar';
import SignInScreen from './screens/auth/SignInScreen';
import SocialSignIn from './screens/auth/SocialSignIn';

// Home & Navigation
import HomeScreen from './screens/home/HomeScreen';
import ToolsMenu from './screens/home/ToolsMenu';

// AI Tools
import FaceSwapTool from './screens/tools/FaceSwapTool';
import AIAvatarTool from './screens/tools/AIAvatarTool';
import CouplePhotoTool from './screens/tools/CouplePhotoTool';
import BabyPredictorTool from './screens/tools/BabyPredictorTool';
import GenderSwapTool from './screens/tools/GenderSwapTool';
import AgeTransformTool from './screens/tools/AgeTransformTool';
import EnhanceTool from './screens/tools/EnhanceTool';

// Social Screens
import DiscoveryFeed from './screens/social/DiscoveryFeed';
import SearchExplore from './screens/social/SearchExplore';
import ReelView from './screens/social/ReelView';
import CreatorProfile from './screens/social/CreatorProfile';

// Profile & Settings
import UserProfile from './screens/profile/UserProfile';
import Dashboard from './screens/profile/Dashboard';
import ChoosePlan from './screens/profile/ChoosePlan';
import Wallet from './screens/profile/Wallet';
import Rewards from './screens/profile/Rewards';
import Notifications from './screens/profile/Notifications';

function App() {
  return (
    <AuthProvider>
      <TokenProvider>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/social-sign-in" element={<SocialSignIn />} />
            <Route path="/create-account" element={<CreateAccountDetails />} />
            <Route path="/create-account/avatar" element={<CreateAccountAvatar />} />
            <Route path="/sign-in" element={<SignInScreen />} />

            {/* Home & Navigation */}
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/tools" element={<ToolsMenu />} />

            {/* AI Tools */}
            <Route path="/tools/face-swap" element={<FaceSwapTool />} />
            <Route path="/tools/ai-avatar" element={<AIAvatarTool />} />
            <Route path="/tools/couple-photo" element={<CouplePhotoTool />} />
            <Route path="/tools/baby-predictor" element={<BabyPredictorTool />} />
            <Route path="/tools/gender-swap" element={<GenderSwapTool />} />
            <Route path="/tools/age-transform" element={<AgeTransformTool />} />
            <Route path="/tools/enhance" element={<EnhanceTool />} />

            {/* Social Routes */}
            <Route path="/discover" element={<DiscoveryFeed />} />
            <Route path="/search" element={<SearchExplore />} />
            <Route path="/reel/:id" element={<ReelView />} />
            <Route path="/profile/:username" element={<CreatorProfile />} />

            {/* Profile & Settings */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<ChoosePlan />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TokenProvider>
    </AuthProvider>
  );
}

export default App;
