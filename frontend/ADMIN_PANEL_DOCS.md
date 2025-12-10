# Forest Bar Admin Panel Documentation

## Overview

A comprehensive, professional admin panel for managing all aspects of the Forest Bar business, including products, vendors, employees, and job vacancies.

## 🎯 Features

### 1. **Dashboard** (`/admin`)
- **Real-time Statistics**: Overview of key business metrics
- **Quick Stats Cards**:
  - Total Products count
  - Average product price
  - Number of active partners/vendors
  - Employee statistics (active/total)
  - Open vacancies tracking
  - Monthly salary expense overview
- **Activity Feed**: Recent system activities
- **Calculated Metrics**: 
  - Products per vendor average
  - Employees per department
  - Vacancy fill rate
  - Employee activity rate

### 2. **Products Management** (`/admin/products`)
- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Product Fields**:
  - Name
  - Price (₽)
  - Short description
  - Long description
  - Image URL
  - Video URL (optional)
  - Seller ID
- **Features**:
  - Real-time search across name and descriptions
  - Sortable columns (ID, name, price, seller ID)
  - Pagination (10, 25, 50, 100 items per page)
  - Image preview in table
  - Form validation
  - Success/error notifications

### 3. **Vendors Management** (`/admin/vendors`)
- **Full CRUD Operations**: Manage partner vendors
- **Vendor Fields**:
  - Title/Name
  - Full address
  - Phone number
  - Email (optional)
  - GPS Coordinates (latitude, longitude)
  - Description (optional)
- **Features**:
  - Search by title, address, phone, email
  - Sortable by ID and title
  - Location coordinates display
  - Pagination support
  - Form validation

### 4. **Employees Management** (`/admin/employees`)
- **Full CRUD Operations**: Complete employee management
- **Employee Fields**:
  - Full name (name, surname, middle name)
  - Phone number
  - Email
  - Position
  - Department
  - Hire date
  - Salary
  - Profile image URL (optional)
  - Status (active, inactive, vacation)
- **Features**:
  - Search across all name fields, position, department, email
  - Sortable by ID, name, position, department, status, salary
  - Status badges with color coding:
    - Green: Active
    - Yellow: On Vacation
    - Red: Inactive
  - Salary formatting with locale
  - Comprehensive form with validation

### 5. **Vacancies Management** (`/admin/vacancies`)
- **Full CRUD Operations**: Job posting management
- **Vacancy Fields**:
  - Job title
  - City
  - Department
  - Description
  - Conditions (array of benefits)
  - Requirements (array of qualifications)
  - Salary range (min/max)
  - Employment type (full-time, part-time, contract, internship)
  - Status (open, on-hold, closed)
  - Posted date
- **Features**:
  - Dynamic condition and requirement management
  - Add/remove conditions and requirements with badges
  - Status color coding:
    - Green: Open
    - Yellow: On Hold
    - Red: Closed
  - Employment type badges
  - Salary range display
  - Search by title, city, department, description

## 🎨 Design & UI

### Visual Theme
- **Dark Mode Interface**: Professional dark theme with custom colors
- **Color Palette**:
  - Background: Dark gray/black tones
  - Accents: Custom orange (`#F7BB1A` yellow) and custom yellow
  - Status colors: Green (active/open), Yellow (warning/vacation), Red (inactive/closed)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Responsive Design**: Works on desktop, tablet, and mobile

### Navigation
- **Sidebar Navigation**: Collapsible sidebar with icon-based menu
- **Menu Items**:
  - Dashboard (home icon)
  - Products (shopping bag icon)
  - Vendors (building icon)
  - Employees (users icon)
  - Vacancies (briefcase icon)
- **Active State**: Highlighted current page with custom styling
- **Mobile Menu**: Hamburger menu for mobile devices
- **Quick Links**: "Go to Site" button in header

### Components
- **DataTable**: Reusable table component with:
  - Search functionality
  - Sorting capabilities
  - Pagination controls
  - Action buttons (Edit, Delete)
  - Customizable columns
  - Empty state handling
  - Items per page selector

- **Modal Forms**: Professional modals for CRUD operations with:
  - Dark theme styling
  - Form validation
  - Error states
  - Submit/Cancel buttons
  - Responsive layout

- **Stat Cards**: Dashboard statistics cards with:
  - Hover animations
  - Color-coded borders
  - Icons
  - Description text
  - Interactive styling

## 📂 File Structure

```
src/
├── components/
│   └── Admin/
│       ├── AdminLayout.tsx       # Main admin layout with sidebar
│       └── DataTable.tsx         # Reusable data table component
├── pages/
│   └── Admin/
│       ├── Dashboard.tsx         # Dashboard with statistics
│       ├── ProductsManagement.tsx
│       ├── VendorsManagement.tsx
│       ├── EmployeesManagement.tsx
│       └── VacanciesManagement.tsx
├── types/
│   ├── product.ts               # Product type definition
│   ├── vendor.ts                # Vendor type definition
│   ├── employee.ts              # Employee type definition
│   └── vacancy.ts               # Vacancy type definition
├── data/
│   ├── mockProducts.ts          # 100 berry products
│   ├── mockVendors.ts           # 10 partner vendors
│   ├── mockEmployees.ts         # 12 employees
│   └── mockVacancies.ts         # 8 job vacancies
└── Router.tsx                   # Routing configuration
```

## 🛠️ Technical Stack

- **React 19**: Latest React version
- **TypeScript**: Full type safety
- **Mantine UI 8.3+**: Modern component library
- **React Router DOM 7**: Client-side routing
- **Tabler Icons**: Professional icon set
- **Mantine Hooks**: Useful React hooks
- **Mantine Form**: Form management
- **Mantine Notifications**: Toast notifications
- **Mantine Dates**: Date picker components

## 🚀 Getting Started

### Access the Admin Panel

Navigate to: `http://localhost:5173/forest-bar/admin`

Or in production: `https://your-domain.com/forest-bar/admin`

### Navigation Routes

- `/admin` - Dashboard
- `/admin/products` - Products Management
- `/admin/vendors` - Vendors Management
- `/admin/employees` - Employees Management
- `/admin/vacancies` - Vacancies Management

## 💡 Usage Guide

### Adding New Items

1. Navigate to the desired management page
2. Click the "Add New" button (top right)
3. Fill in the form fields
4. Click "Create" to save
5. Success notification will appear

### Editing Items

1. Find the item in the table
2. Click the edit icon (pencil) in the Actions column
3. Modify the form fields
4. Click "Update" to save changes
5. Success notification will appear

### Deleting Items

1. Find the item in the table
2. Click the delete icon (trash) in the Actions column
3. Confirm the deletion in the dialog
4. Item will be removed and notification shown

### Searching & Filtering

1. Use the search box at the top of each table
2. Type keywords to filter results in real-time
3. Results update automatically
4. Search works across multiple fields

### Sorting Data

1. Click on any sortable column header
2. First click: Sort ascending
3. Second click: Sort descending
4. Arrow indicators show current sort direction

### Pagination

1. Use the "per page" dropdown to change items per page
2. Use pagination controls at bottom to navigate pages
3. Page numbers show total pages available

## 🔐 Security Considerations

**Important**: This admin panel currently has NO authentication!

### Recommended Next Steps for Production:

1. **Add Authentication**:
   - Implement login requirement
   - Use JWT or session-based auth
   - Protected routes with auth guards

2. **Add Authorization**:
   - Role-based access control (RBAC)
   - Different permission levels
   - Admin, Manager, Viewer roles

3. **API Integration**:
   - Replace mock data with real API calls
   - Connect to backend database
   - Implement proper CRUD endpoints

4. **Data Validation**:
   - Server-side validation
   - Input sanitization
   - XSS protection

5. **Audit Logging**:
   - Track all CRUD operations
   - User activity logs
   - Change history

## 📊 Data Models

### Product
```typescript
{
  id: number;
  name: string;
  price: number;
  short_description: string;
  long_description: string;
  image_url: string;
  video_url?: string;
  seller_id: number;
}
```

### Vendor
```typescript
{
  id: number;
  title: string;
  address: string;
  phone: string;
  coords: [number, number];
  email?: string;
  description?: string;
}
```

### Employee
```typescript
{
  id: number;
  name: string;
  surname: string;
  middleName: string;
  phone: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  salary?: number;
  image_url?: string;
  status: 'active' | 'inactive' | 'vacation';
}
```

### Vacancy
```typescript
{
  id: number;
  title: string;
  city: string;
  department: string;
  description: string;
  conditions: string[];
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'open' | 'closed' | 'on-hold';
  posted_date: string;
}
```

## 🎯 Future Enhancements

### Suggested Features:

1. **Advanced Filtering**:
   - Multiple filter criteria
   - Date range filters
   - Status filters
   - Price range sliders

2. **Bulk Operations**:
   - Select multiple items
   - Bulk delete
   - Bulk status update
   - Export selected items

3. **Export/Import**:
   - Export to CSV/Excel
   - Import from CSV
   - PDF reports
   - Data backup

4. **Analytics**:
   - Sales trends charts
   - Employee performance metrics
   - Vacancy conversion rates
   - Revenue analytics

5. **File Upload**:
   - Direct image upload
   - File storage integration
   - Image optimization
   - Multiple file support

6. **Rich Text Editor**:
   - Formatted descriptions
   - HTML content
   - Markdown support
   - Preview mode

7. **Activity Feed**:
   - Real-time updates
   - User action history
   - System notifications
   - Change logs

8. **Settings Page**:
   - System configuration
   - User preferences
   - Email templates
   - Integration settings

## 🐛 Known Limitations

1. **No Backend**: Currently uses mock data only
2. **No Authentication**: Anyone can access admin panel
3. **No Persistence**: Changes lost on page refresh
4. **No Image Upload**: Must provide URLs only
5. **No Validation**: Limited server-side validation
6. **No Real-time Updates**: No WebSocket integration

## 📝 Notes

- All data is currently stored in memory (mock data)
- Changes will be lost on page refresh
- IDs are auto-generated based on existing data
- Form validation is client-side only
- Mobile responsive design included
- All tables have hover effects and transitions
- Notifications auto-dismiss after 4 seconds

## 🤝 Contributing

To extend this admin panel:

1. Add new types in `src/types/`
2. Create mock data in `src/data/`
3. Build management page in `src/pages/Admin/`
4. Add route in `src/Router.tsx`
5. Add navigation item in `AdminLayout.tsx`

## 📞 Support

For questions or issues with the admin panel, please refer to the main project documentation or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Mantine UI**

