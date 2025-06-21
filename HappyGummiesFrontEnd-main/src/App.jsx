// import React from 'react';
// import Dashboard from './pages/Dashboard';
// import DashboardPage from './pages/DashboardPage';


// export default function App() {
//   return <DashboardPage />;
// }

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import IndividualOrderPage from './pages/IndividualOrderPage';
import Inventory from './pages/Inventory';
import ProductGrid from './pages/ProductGrid';
import ProductDetailCard from './pages/ProductDetailCard';
import LoginPage from './LoginPage';
import PasswordChangeFlow from './PasswordChangeFlow';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<DashboardPage />} />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Order Details route */}
          <Route path="/order-details" element={<OrderDetailsPage />} />

          <Route path="/individual-order/:orderId" element={<IndividualOrderPage />} />
          
          {/* Add routes for other sidebar items */}
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/products" element={<ProductGrid/>} />
          <Route path="/productdetail/:id" element={<ProductDetailCard/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/change-password" element={<PasswordChangeFlow/>} />
          {/* You can add more routes here as needed */}
          {/* <Route path="/customers" element={<CustomersPage />} /> */}
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          
          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;