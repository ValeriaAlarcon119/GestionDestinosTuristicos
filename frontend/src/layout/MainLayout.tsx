import { type PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { Globe, LayoutDashboard, Calendar, Users, BarChart3, LogOut, Search } from 'lucide-react'
import './MainLayout.css'

export function MainLayout({ children }: PropsWithChildren) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-mark">HB</span>
            <span className="logo-text">HotelBediaX</span>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-group">
            <NavLink
              to="/destinations"
              className={({ isActive }) =>
                isActive ? 'nav-item nav-item-active' : 'nav-item'
              }
            >
              <LayoutDashboard size={20} />
              <span>{t.sidebar.destinations}</span>
            </NavLink>
          </div>

          <div className="nav-group">
            <div className="nav-section-title">{t.sidebar.otherModules}</div>
            <Link to="/bookings" className="nav-item nav-item-disabled">
              <Calendar size={20} />
              <span>{t.sidebar.bookings}</span>
            </Link>
            <Link to="/customers" className="nav-item nav-item-disabled">
              <Users size={20} />
              <span>{t.sidebar.customers}</span>
            </Link>
            <Link to="/reports" className="nav-item nav-item-disabled">
              <BarChart3 size={20} />
              <span>{t.sidebar.reports}</span>
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
           <button className="logout-button">
             <LogOut size={18} />
             <span>Cerrar Sesión</span>
           </button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">{t.topbar.title}</h1>
          </div>
          <div className="topbar-actions">
            <div className="search-pill">
              <Search size={16} />
              <input type="text" placeholder={t.destinations.search} disabled />
            </div>
            
            <button className="lang-toggle" onClick={toggleLanguage} title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
            
            <div className="user-profile">
              <div className="user-avatar">{t.topbar.user.charAt(0)}</div>
              <div className="user-info">
                <span className="user-name">{t.topbar.user}</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  )
}
