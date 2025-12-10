# Admin Panel Quick Start Guide

## 🚀 Quick Access

**URL**: `/admin` (e.g., `http://localhost:5173/forest-bar/admin`)

## 📋 What's Available

### 1. Dashboard (`/admin`)
View all your business statistics in one place:
- Total products, employees, vendors, vacancies
- Average prices and salary expenses
- Quick stats and activity feed

### 2. Products Management (`/admin/products`)
Manage your 100 berry products:
- ✏️ Edit product details (name, price, descriptions)
- ➕ Add new products
- 🗑️ Delete products
- 🔍 Search products by name or description
- 📄 Paginate through products (10, 25, 50, 100 per page)

### 3. Vendors Management (`/admin/vendors`)
Manage your 10 partner vendors:
- ✏️ Edit vendor information (address, phone, email)
- ➕ Add new vendors
- 🗑️ Delete vendors
- 🗺️ Update GPS coordinates
- 🔍 Search by title, address, phone

### 4. Employees Management (`/admin/employees`)
Manage your 12 employees:
- ✏️ Edit employee details (name, position, salary)
- ➕ Add new employees
- 🗑️ Delete employees
- 🏷️ Update employee status (active, vacation, inactive)
- 📊 Track salaries and departments
- 🔍 Search by name, position, department

### 5. Vacancies Management (`/admin/vacancies`)
Manage your 8 job vacancies:
- ✏️ Edit job postings
- ➕ Add new vacancies
- 🗑️ Delete old postings
- 📝 Manage conditions and requirements
- 💰 Set salary ranges
- 🏷️ Update status (open, on-hold, closed)
- 🔍 Search by title, city, department

## 🎯 Common Actions

### Adding New Item
1. Click "Add New" button (top right of any table)
2. Fill in the form
3. Click "Create"
4. ✅ Success notification appears

### Editing Item
1. Click pencil icon (✏️) in Actions column
2. Modify form fields
3. Click "Update"
4. ✅ Success notification appears

### Deleting Item
1. Click trash icon (🗑️) in Actions column
2. Confirm deletion
3. ✅ Item removed with notification

### Searching
1. Type in search box at top of table
2. Results filter in real-time
3. Works across multiple fields

### Sorting
1. Click column headers to sort
2. Click again to reverse sort
3. Arrow shows current direction

## 💾 Important Notes

⚠️ **Data is NOT saved permanently!**
- All changes are in memory only
- Refresh = data resets to original
- This is demo/development mode

⚠️ **No Authentication Yet!**
- Anyone can access `/admin`
- No login required
- Add auth before production!

## 🎨 Features Included

✅ **Search & Filter** - All tables searchable  
✅ **Pagination** - Navigate large datasets  
✅ **Sorting** - Sort by any column  
✅ **Responsive Design** - Works on mobile  
✅ **Form Validation** - Prevents invalid data  
✅ **Notifications** - Success/error messages  
✅ **Statistics** - Real-time dashboard metrics  
✅ **Dark Theme** - Professional UI  

## 🔧 Tech Stack

- **React 19** + TypeScript
- **Mantine UI 8.3+** components
- **React Router 7** for navigation
- **Tabler Icons** for icons
- **Mantine Hooks** for utilities

## 📱 Responsive Design

The admin panel works on:
- 💻 Desktop (optimized)
- 📱 Tablet (responsive)
- 📱 Mobile (hamburger menu)

## 🎨 UI Highlights

- **Dark Theme** - Easy on the eyes
- **Color-Coded Badges** - Status indicators
- **Hover Effects** - Interactive feedback
- **Smooth Animations** - Professional feel
- **Clean Layout** - Easy navigation

## 🚧 Next Steps for Production

Before going live, you should:

1. ✅ **Add Authentication**
   - Login/logout system
   - JWT or session auth
   - Password protection

2. ✅ **Connect to Backend**
   - Replace mock data with API
   - Real database integration
   - Persistent storage

3. ✅ **Add Authorization**
   - Role-based access
   - Admin vs Manager roles
   - Permission levels

4. ✅ **Add File Upload**
   - Image upload for products
   - Employee photos
   - Document attachments

5. ✅ **Add Audit Logs**
   - Track who changed what
   - History of modifications
   - Security monitoring

## 📊 Current Mock Data

- **Products**: 100 items (various berries)
- **Vendors**: 10 partners (across Russia)
- **Employees**: 12 staff members
- **Vacancies**: 8 job openings

## 🎯 Tips & Tricks

1. **Use Search First** - Faster than scrolling
2. **Change Items Per Page** - See more data at once
3. **Sort by Status** - Group active/inactive items
4. **Check Dashboard First** - Get overview before diving in
5. **Mobile Menu** - Tap hamburger icon on small screens

## 🐛 Report Issues

If something doesn't work:
1. Check browser console for errors
2. Verify all packages installed
3. Check that dev server is running
4. Clear browser cache

## 📚 Full Documentation

See `ADMIN_PANEL_DOCS.md` for complete documentation including:
- Detailed feature descriptions
- Data models and types
- File structure
- Future enhancements
- Contributing guide

---

**Happy Managing! 🎉**

