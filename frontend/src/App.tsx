import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import BlogPost from "./pages/Blog/BlogPost";
import Contacts from "./pages/Contacts/Contacts";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Feeds from "./pages/Feeds/Feeds";
import FeedDetails from "./pages/Feeds/FeedDetails";
import Notifications from "./pages/Notifications/Notifications";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import RegisterSuccess from "./pages/Auth/RegisterSuccess/RegisterSuccess";
import FeedGeneratorStep1 from "./pages/FeedGenerator/Step1/FeedGeneratorStep1";
import FeedGeneratorStep2 from "./pages/FeedGenerator/Step2/FeedGeneratorStep2";
import FeedGeneratorStep3 from "./pages/FeedGenerator/Step3/FeedGeneratorStep3";

import CabinetLayout from "./pages/Cabinet/CabinetLayout/CabinetLayout";
import CabinetProfile from "./pages/Cabinet/Profile/CabinetProfile";
import CabinetSubscription from "./pages/Cabinet/Subscription/CabinetSubscription";
import CabinetNotifications from "./pages/Cabinet/Notifications/CabinetNotifications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:postId" element={<BlogPost />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/feeds" element={<Feeds />} />
      <Route path="/feeds/:feedId" element={<FeedDetails />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/feed-generator" element={<FeedGeneratorStep1 />} />
      <Route path="/feed-generator/step-2" element={<FeedGeneratorStep2 />} />
      <Route path="/feed-generator/step-3" element={<FeedGeneratorStep3 />} />
      <Route path="/cabinet" element={<CabinetLayout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<CabinetProfile />} />
        <Route path="subscription" element={<CabinetSubscription />} />
        <Route path="notifications" element={<CabinetNotifications />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
