# CloudNerve Admin Panel 🔧

A powerful, user-friendly admin panel to manage all content on your CloudNerve website.

## 📋 Features

### ✅ Complete Content Management
- **General Settings**: Site name, tagline, description, logo, contact info
- **Hero Section**: Title, subtitle, video, call-to-action buttons
- **Services**: Add, edit, remove services with titles and descriptions
- **About Page**: Mission, vision, values, and company information
- **Portfolio**: Manage projects with details, clients, and years
- **Contact Page**: Customize contact form headings and descriptions
- **Footer**: Brand description, social links, copyright

### 🎨 User Interface
- Modern, dark-themed interface
- Responsive design for all devices
- Intuitive tabbed navigation
- Real-time preview of changes
- Toast notifications for actions

### 💾 Data Management
- **Auto-save**: Changes saved to localStorage
- **Export**: Download configuration as JSON
- **Import**: Upload existing configurations
- **Reset**: Restore to default settings

## 🚀 How to Use

### Access the Admin Panel
1. Navigate to: `http://yourwebsite.com/admin/index.html`
2. Or open `/admin/index.html` in your browser

### Making Changes
1. **Select a section** from the left sidebar
2. **Edit the content** in the form fields
3. **Click "Save Changes"** to download updated config
4. **Replace** `/admin/config.json` with the downloaded file
5. **Refresh** your website to see changes

### Managing Services
- Click "+ Add Service" to create new services
- Edit title and description for each service
- Click "Delete" button to remove services

### Managing Portfolio Projects
- Click "+ Add Project" to create new projects
- Fill in project details, client, and year
- Click "Delete" button to remove projects

### Export/Import
- **Export**: Creates a backup of your current configuration
- **Import**: Upload a previously exported configuration
- **Reset**: Clears all changes and reloads defaults

## 📁 File Structure
```
admin/
├── index.html      # Admin panel interface
├── admin.css       # Styling
├── admin.js        # Functionality
├── config.json     # Content configuration
└── README.md       # This file
```

## 🔒 Security Notes

**Important**: This admin panel is currently client-side only.

For production use, you should:
1. Add authentication/login system
2. Protect the `/admin` directory
3. Use server-side API for saving changes
4. Implement role-based access control

## 🛠️ Technical Details

### Data Storage
- Configuration stored in JSON format
- Changes saved to `localStorage` (browser storage)
- Export creates downloadable JSON file

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6+ support

## 📝 Configuration Schema

```json
{
  "site": { "name": "...", "tagline": "...", "logo": "..." },
  "hero": { "title": "...", "subtitle": "...", "video": "..." },
  "services": { "pageTitle": "...", "items": [...] },
  "about": { "mission": "...", "vision": "..." },
  "portfolio": { "projects": [...] },
  "contact": { ...},
  "footer": { ... }
}
```

## 🎯 Next Steps

### For Deployment
1. Move config.json to a secure location
2. Add authentication
3. Implement server-side API
4. Set up automated deployment on saves

### Recommended Integrations
- **Azure Static Web Apps**: Use Azure Functions API
- **GitHub Actions**: Auto-commit config changes
- **Headless CMS**: Integrate with Strapi/Sanity

## 💡 Tips

1. **Always export** before making major changes
2. **Test changes** using the Preview button
3. **Keep backups** of your configuration files
4. **Use descriptive content** for better SEO

## 🆘 Support

For issues or questions:
- Check browser console for errors
- Ensure config.json is valid JSON
- Try resetting to defaults
- Export current config before troubleshooting

---

**CloudNerve Admin Panel** - Making content management simple and powerful! 🚀
