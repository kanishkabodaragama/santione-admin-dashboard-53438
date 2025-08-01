import React, { useState } from "react";
import "./DashboardLayout.css";
import logo from "./logo.svg";

// Sidebar menu items with icon emoji for simplicity
const sidebarItems = [
  { key: "portfolio", label: "Portfolio", icon: "🏘️" },
  { key: "bookings", label: "Bookings", icon: "📅" },
  { key: "tasks", label: "Tasks", icon: "✅" },
  { key: "revenue", label: "Revenue", icon: "💰" },
  { key: "issues", label: "Issues", icon: "🚨" },
  { key: "devices", label: "Smart Devices", icon: "🔐" },
  { key: "cameras", label: "Cameras", icon: "🎥" },
  { key: "parking", label: "Parking", icon: "🅿️" },
];

// Top nav actions (just for demonstration)
function UserMenuDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" tabIndex={0} onBlur={() => setOpen(false)}>
      <div
        className="dropdown-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="avatar">AB</span> <span className="dropdown-caret">▼</span>
      </div>
      {open && (
        <ul className="dropdown-menu">
          <li><button onClick={() => alert("Settings")}>Settings</button></li>
          <li><button onClick={onLogout}>Logout</button></li>
        </ul>
      )}
    </div>
  );
}

// Floating quick action panel
function QuickActionPanel() {
  return (
    <div className="quick-actions">
      <button className="quick-action-btn" title="Add Property">🏠 Add Property</button>
      <button className="quick-action-btn" title="OTA Sync">🔄 OTA Sync</button>
      <button className="quick-action-btn" title="Export">📤 Export</button>
      <button className="quick-action-btn" title="Search">🔍 Search</button>
    </div>
  );
}

// KPI Card
function KpiCard({ title, value, unit, icon, trend }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div>
        <div className="kpi-title">{title}</div>
        <div className="kpi-value">{value}{unit && <span className="kpi-unit">{unit}</span>}</div>
        {trend && <div className={`kpi-trend kpi-trend-${trend.type}`}>{trend.type === "up" ? "▲" : "▼"} {trend.value}%</div>}
      </div>
    </div>
  );
}

// Basic Chart Placeholder
function SimpleBarChart({ percent, label }) {
  // percent: 0 to 100
  return (
    <div className="bar-chart">
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="bar-label">{label}</span>
    </div>
  );
}

// Main Dashboard widget grid
function KpiWidgetGrid() {
  // Example mock data
  return (
    <div className="dashboard-grid">
      <KpiCard title="Managed Properties" value="8" icon="🏢" trend={{type: "up", value: 4}} />
      <KpiCard title="Total Bookings (week)" value="36" icon="📅" trend={{type: "down", value: 3}} />
      <KpiCard title="Active Tasks" value="12" icon="📝" />
      <KpiCard title="Revenue (YTD)" value="€23,590" icon="💰" trend={{type: "up", value: 14}} />
      <KpiCard title="Open Issues" value="3" icon="🚨" />
      <KpiCard title="Online Devices" value="21/22" icon="🔐" />
      <KpiCard title="Cameras Online" value="5/5" icon="🎥" />
      <KpiCard title="Parking Avail." value="9" unit="/18" icon="🅿️" />
      {/* Chart widgets */}
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-title">Occupancy Rate</div>
        <SimpleBarChart percent={78} label="78%" />
      </div>
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-title">Booking Sync Health</div>
        <SimpleBarChart percent={97} label="97%" />
      </div>
      <div className="dashboard-chart-card">
        <div className="dashboard-chart-title">Avg. Staff Task Completion</div>
        <SimpleBarChart percent={86} label="86%" />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout(){
    // Placeholder
    alert("Logging out...");
  }

  return (
    <div className={`dash-root`}>
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="Santione" />
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <div className="sidebar-link" key={item.key}>
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}
        </nav>
        <button className="sidebar-toggle" onClick={()=>setSidebarOpen(o=>!o)} aria-label="Toggle sidebar">
          {sidebarOpen ? "✖" : "☰"}
        </button>
      </aside>
      
      <main className="dashboard-main">
        {/* Top nav bar */}
        <header className="top-navbar">
          <div className="navbar-section navbar-left">
            <button className="mobile-sidebar-btn" onClick={()=>setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
            <img src={logo} alt="Santione" className="navbar-logo"/>
          </div>
          <div className="navbar-section navbar-center">
            <h1 className="navbar-title">Santione Dashboard</h1>
          </div>
          <div className="navbar-section navbar-right">
            <button title="Add Property" className="header-action-btn">🏠 Add Property</button>
            <button title="Notifications" className="header-action-btn">🔔</button>
            <UserMenuDropdown onLogout={handleLogout} />
          </div>
        </header>
        {/* KPI & widget grid */}
        <KpiWidgetGrid />
        {/* Floating quick actions */}
        <QuickActionPanel />
        {/* Themed Footer */}
        <footer className="dashboard-footer">
          <div>
            <span>Santione Admin • v1.0</span>
            <span className="footer-links">
              <a href="#">Support</a> | <a href="#">Privacy</a> | <a href="#">Terms</a>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
