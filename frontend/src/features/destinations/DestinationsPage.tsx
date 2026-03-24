import { useEffect, useMemo, useState } from 'react'
import {
  type Destination,
  type DestinationQuery,
  deleteDestination,
  getDestinations,
  createDestination,
  updateDestination,
} from '../../api/destinationsApi'
import { 
  Plus, 
  Search, 
  MapPin, 
  Euro, 
  Star, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Loader2,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import './DestinationsPage.css'

interface DestinationFormState {
  id?: number
  name: string
  country: string
  city: string
  description: string
  pricePerNight: string
  rating: string
  isActive: boolean
}

const defaultFilters: DestinationQuery = {
  search: '',
  page: 1,
  pageSize: 20,
  sortBy: 'name',
  sortDir: 'asc',
}

export function DestinationsPage() {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<DestinationQuery>(defaultFilters)
  const [data, setData] = useState<Destination[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [formState, setFormState] = useState<DestinationFormState>({
    name: '',
    country: '',
    city: '',
    description: '',
    pricePerNight: '',
    rating: '',
    isActive: true,
  })

  const isEditing = useMemo(() => formState.id !== undefined, [formState.id])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getDestinations({
          ...filters,
          page,
          pageSize,
        })
        setData(result.items)
        setTotalItems(result.totalItems)
        setTotalPages(result.totalPages)
      } catch (e) {
        console.error(e)
        setError(t.form.loading)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [filters, page, pageSize, t.form.loading])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  const handleOpenCreate = () => {
    setFormState({
      name: '',
      country: '',
      city: '',
      description: '',
      pricePerNight: '',
      rating: '',
      isActive: true,
    })
    setShowForm(true)
  }

  const handleOpenEdit = (destination: Destination) => {
    setFormState({
      id: destination.id,
      name: destination.name,
      country: destination.country,
      city: destination.city,
      description: destination.description,
      pricePerNight: destination.pricePerNight.toString(),
      rating: destination.rating.toString(),
      isActive: destination.isActive,
    })
    setShowForm(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? isChecked : value,
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      const payload = {
        name: formState.name.trim(),
        country: formState.country.trim(),
        city: formState.city.trim(),
        description: formState.description.trim(),
        pricePerNight: Number(formState.pricePerNight) || 0,
        rating: Number(formState.rating) || 0,
        isActive: formState.isActive,
      }

      if (!payload.name || !payload.country || !payload.city) {
        setError(t.form.requiredError)
        return
      }

      if (isEditing && formState.id != null) {
        await updateDestination(formState.id!, payload)
      } else {
        await createDestination(payload)
      }

      setShowForm(false)
      setPage(1)
      const result = await getDestinations({ ...filters, page: 1, pageSize })
      setData(result.items)
      setTotalItems(result.totalItems)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error(err)
      setError(t.form.saveError)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (destination: Destination) => {
    const confirmed = window.confirm(t.form.deleteConfirm.replace('{name}', destination.name))
    if (!confirmed) return
    try {
      setLoading(true)
      setError(null)
      await deleteDestination(destination.id)
      const result = await getDestinations({ ...filters, page, pageSize })
      setData(result.items)
      setTotalItems(result.totalItems)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error(err)
      setError(t.form.deleteError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="destinations-page"
    >
      <div className="destinations-header">
        <div className="header-titles">
          <h2 className="title-grad">{t.destinations.title}</h2>
          <p className="subtitle">{t.destinations.subtitle}</p>
        </div>
        <button className="create-btn" onClick={handleOpenCreate}>
          <Plus size={20} />
          <span>{t.destinations.newButton}</span>
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
           <MapPin className="stat-icon pink" size={24} />
           <div className="stat-info">
              <span className="stat-val">{totalItems}</span>
              <span className="stat-lab">{t.destinations.title}</span>
           </div>
        </div>
        <div className="stat-card">
           <Euro className="stat-icon blue" size={24} />
           <div className="stat-info">
              <span className="stat-val">€50-500</span>
              <span className="stat-lab">Price range</span>
           </div>
        </div>
        <div className="stat-card">
           <Star className="stat-icon orange" size={24} />
           <div className="stat-info">
              <span className="stat-val">4.5</span>
              <span className="stat-lab">Avg Rating</span>
           </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="filters-bar">
          <div className="search-box">
             <Search size={18} />
             <input
                type="text"
                placeholder={t.destinations.searchPlaceholder}
                value={filters.search ?? ''}
                onChange={handleSearchChange}
             />
          </div>
          <div className="filter-actions">
             {loading && <Loader2 className="animate-spin text-blue" size={20} />}
          </div>
        </div>

        <div className="table-wrapper">
          {error && (
            <div className="error-box">
              <Info size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <table className="modern-table">
            <thead>
              <tr>
                <th>{t.destinations.table.name}</th>
                <th>{t.destinations.table.country}</th>
                <th>{t.destinations.table.city}</th>
                <th>{t.destinations.table.price}</th>
                <th>{t.destinations.table.rating}</th>
                <th>{t.destinations.table.status}</th>
                <th></th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
                 <tbody>
                   {data.length === 0 && !loading ? (
                     <tr>
                       <td colSpan={7} className="empty-cell">
                         {t.destinations.table.empty}
                       </td>
                     </tr>
                   ) : (
                     data.map((d, i) => (
                       <motion.tr 
                         key={d.id}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.05 }}
                       >
                         <td className="font-bold">{d.name}</td>
                         <td>{d.country}</td>
                         <td>{d.city}</td>
                         <td><span className="price-tag">{d.pricePerNight.toFixed(2)} €</span></td>
                         <td>
                            <div className="rating-pill">
                               <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
                               <span>{d.rating.toFixed(1)}</span>
                            </div>
                         </td>
                         <td>
                           <span className={`status-badge ${d.isActive ? 'active' : 'inactive'}`}>
                             {d.isActive ? t.destinations.table.active : t.destinations.table.inactive}
                           </span>
                         </td>
                         <td className="actions-cell">
                           <button className="action-btn edit" onClick={() => handleOpenEdit(d)} title={t.destinations.table.edit}>
                             <Edit2 size={16} />
                           </button>
                           <button className="action-btn delete" onClick={() => handleDelete(d)} title={t.destinations.table.edit}>
                             <Trash2 size={16} />
                           </button>
                         </td>
                       </motion.tr>
                     ))
                   )}
                 </tbody>
            </AnimatePresence>
          </table>

          <div className="pagination-bar">
             <p className="pagination-info">
               {t.destinations.pagination.page} {page} {t.destinations.pagination.of} {totalPages || 1} · {totalItems} {t.destinations.pagination.total}
             </p>
             <div className="pagination-nav">
                <button 
                  className="nav-btn" 
                  disabled={page <= 1} 
                  onClick={() => handlePageChange(page - 1)}
                >
                  <ChevronLeft size={18} />
                  <span>{t.destinations.pagination.previous}</span>
                </button>
                <button 
                  className="nav-btn" 
                  disabled={page >= totalPages} 
                  onClick={() => handlePageChange(page + 1)}
                >
                  <span>{t.destinations.pagination.next}</span>
                  <ChevronRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="modal-overlay">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="modal-container"
            >
              <div className="modal-header">
                <h3>{isEditing ? t.form.editTitle : t.form.createTitle}</h3>
                <button className="close-btn" onClick={() => setShowForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>{t.form.country}</label>
                    <input
                      type="text"
                      name="country"
                      value={formState.country}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>{t.form.city}</label>
                    <input
                      type="text"
                      name="city"
                      value={formState.city}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>{t.form.price}</label>
                    <input
                      type="text"
                      name="pricePerNight"
                      placeholder="0.00"
                      value={formState.pricePerNight}
                      onChange={handleFormChange}
                      inputMode="decimal"
                    />
                  </div>
                  <div className="form-field">
                    <label>{t.form.rating}</label>
                    <input
                      type="text"
                      name="rating"
                      placeholder="0.0"
                      value={formState.rating}
                      onChange={handleFormChange}
                      inputMode="decimal"
                    />
                  </div>
                  <div className="form-field checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formState.isActive}
                        onChange={handleFormChange}
                      />
                      <span>{t.form.active}</span>
                    </label>
                  </div>
                </div>
                <div className="form-field full">
                  <label>{t.form.description}</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formState.description}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-link" onClick={() => setShowForm(false)}>
                    {t.form.cancel}
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (isEditing ? t.form.save : t.form.create)}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
