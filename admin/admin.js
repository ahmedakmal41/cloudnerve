// Admin Panel JavaScript
let config = {};

// Load configuration on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
    loadConfiguration();
    setupEventListeners();
});

// Initialize admin panel
function initializeAdmin() {
    console.log('CloudNerve Admin Panel Initialized');
}

// Load configuration from JSON file or localStorage
async function loadConfiguration() {
    try {
        // Try to load from localStorage first
        const savedConfig = localStorage.getItem('cloudnerve_config');
        if (savedConfig) {
            config = JSON.parse(savedConfig);
        } else {
            // Load from config.json
            const response = await fetch('config.json');
            config = await response.json();
        }

        populateForm();
        showToast('Configuration loaded successfully', 'success');
    } catch (error) {
        console.error('Error loading configuration:', error);
        showToast('Error loading configuration', 'error');
    }
}

// Populate form with configuration data
function populateForm() {
    // General Settings
    document.getElementById('siteName').value = config.site?.name || '';
    document.getElementById('siteTagline').value = config.site?.tagline || '';
    document.getElementById('siteDescription').value = config.site?.description || '';
    document.getElementById('siteLogo').value = config.site?.logo || '';
    document.getElementById('contactEmail').value = config.contact?.email || '';
    document.getElementById('contactPhone').value = config.contact?.phone || '';
    document.getElementById('contactAddress').value = config.contact?.address || '';

    // Hero Section
    document.getElementById('heroTitle').value = config.hero?.title || '';
    document.getElementById('heroSubtitle').value = config.hero?.subtitle || '';
    document.getElementById('heroVideo').value = config.hero?.video || '';
    document.getElementById('heroPrimaryBtn').value = config.hero?.primaryButton?.text || '';
    document.getElementById('heroPrimaryLink').value = config.hero?.primaryButton?.link || '';
    document.getElementById('heroSecondaryBtn').value = config.hero?.secondaryButton?.text || '';
    document.getElementById('heroSecondaryLink').value = config.hero?.secondaryButton?.link || '';

    // Services
    document.getElementById('servicesPageTitle').value = config.services?.pageTitle || '';
    document.getElementById('servicesPageSubtitle').value = config.services?.pageSubtitle || '';
    renderServices();

    // About
    document.getElementById('aboutPageTitle').value = config.about?.pageTitle || '';
    document.getElementById('aboutPageSubtitle').value = config.about?.pageSubtitle || '';
    document.getElementById('aboutMainHeading').value = config.about?.mainHeading || '';
    document.getElementById('aboutDescription1').value = config.about?.description1 || '';
    document.getElementById('aboutDescription2').value = config.about?.description2 || '';
    document.getElementById('aboutMission').value = config.about?.mission || '';
    document.getElementById('aboutVision').value = config.about?.vision || '';
    document.getElementById('aboutValues').value = config.about?.values || '';

    // Portfolio
    document.getElementById('portfolioPageTitle').value = config.portfolio?.pageTitle || '';
    document.getElementById('portfolioPageSubtitle').value = config.portfolio?.pageSubtitle || '';
    renderPortfolio();

    // Contact
    document.getElementById('contactPageTitle').value = config.contact?.pageTitle || '';
    document.getElementById('contactPageSubtitle').value = config.contact?.pageSubtitle || '';
    document.getElementById('contactFormHeading').value = config.contact?.formHeading || '';
    document.getElementById('contactFormDescription').value = config.contact?.formDescription || '';

    // Footer
    document.getElementById('footerBrandDesc').value = config.footer?.brandDescription || '';
    document.getElementById('footerCopyright').value = config.footer?.copyright || '';
    document.getElementById('socialLinkedin').value = config.footer?.social?.linkedin || '';
    document.getElementById('socialTwitter').value = config.footer?.social?.twitter || '';
    document.getElementById('socialGithub').value = config.footer?.social?.github || '';
}

// Render services list
function renderServices() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';

    if (!config.services || !config.services.items) return;

    config.services.items.forEach((service, index) => {
        const serviceHTML = `
            <div class="service-item">
                <div class="item-header">
                    <h4>Service ${index + 1}</h4>
                    <button class="delete-btn" onclick="deleteService(${index})">🗑️ Delete</button>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" value="${service.title}" onchange="updateService(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="3" onchange="updateService(${index}, 'description', this.value)">${service.description}</textarea>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', serviceHTML);
    });
}

// Render portfolio projects
function renderPortfolio() {
    const container = document.getElementById('portfolioList');
    container.innerHTML = '';

    if (!config.portfolio || !config.portfolio.projects) return;

    config.portfolio.projects.forEach((project, index) => {
        const projectHTML = `
            <div class="project-item">
                <div class="item-header">
                    <h4>Project ${index + 1}</h4>
                    <button class="delete-btn" onclick="deleteProject(${index})">🗑️ Delete</button>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" value="${project.title}" onchange="updateProject(${index}, 'title', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="2" onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
                </div>
                <div class="button-group">
                    <div class="form-group">
                        <label>Client</label>
                        <input type="text" value="${project.client}" onchange="updateProject(${index}, 'client', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Year</label>
                        <input type="text" value="${project.year}" onchange="updateProject(${index}, 'year', this.value)">
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', projectHTML);
    });
}

// Update service
function updateService(index, field, value) {
    if (!config.services.items[index]) return;
    config.services.items[index][field] = value;
}

// Update project
function updateProject(index, field, value) {
    if (!config.portfolio.projects[index]) return;
    config.portfolio.projects[index][field] = value;
}

// Delete service
function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        config.services.items.splice(index, 1);
        renderServices();
        showToast('Service deleted');
    }
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        config.portfolio.projects.splice(index, 1);
        renderPortfolio();
        showToast('Project deleted');
    }
}

// Add new service
function addService() {
    if (!config.services.items) config.services.items = [];
    config.services.items.push({
        title: 'New Service',
        description: 'Service description',
        icon: 'service'
    });
    renderServices();
    showToast('Service added');
}

// Add new project
function addProject() {
    if (!config.portfolio.projects) config.portfolio.projects = [];
    config.portfolio.projects.push({
        title: 'New Project',
        description: 'Project description',
        category: 'web',
        client: 'Client Name',
        year: '2024',
        tags: []
    });
    renderPortfolio();
    showToast('Project added');
}

// Save configuration
async function saveConfiguration() {
    try {
        // Update config object with form values
        config.site = {
            name: document.getElementById('siteName').value,
            tagline: document.getElementById('siteTagline').value,
            description: document.getElementById('siteDescription').value,
            logo: document.getElementById('siteLogo').value
        };

        config.contact = {
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            address: document.getElementById('contactAddress').value
        };

        config.hero = {
            title: document.getElementById('heroTitle').value,
            subtitle: document.getElementById('heroSubtitle').value,
            video: document.getElementById('heroVideo').value,
            primaryButton: {
                text: document.getElementById('heroPrimaryBtn').value,
                link: document.getElementById('heroPrimaryLink').value
            },
            secondaryButton: {
                text: document.getElementById('heroSecondaryBtn').value,
                link: document.getElementById('heroSecondaryLink').value
            }
        };

        config.services.pageTitle = document.getElementById('servicesPageTitle').value;
        config.services.pageSubtitle = document.getElementById('servicesPageSubtitle').value;

        config.about = {
            pageTitle: document.getElementById('aboutPageTitle').value,
            pageSubtitle: document.getElementById('aboutPageSubtitle').value,
            mainHeading: document.getElementById('aboutMainHeading').value,
            description1: document.getElementById('aboutDescription1').value,
            description2: document.getElementById('aboutDescription2').value,
            mission: document.getElementById('aboutMission').value,
            vision: document.getElementById('aboutVision').value,
            values: document.getElementById('aboutValues').value
        };

        config.portfolio.pageTitle = document.getElementById('portfolioPageTitle').value;
        config.portfolio.pageSubtitle = document.getElementById('portfolioPageSubtitle').value;

        if (config.contact) {
            config.contact.pageTitle = document.getElementById('contactPageTitle').value;
            config.contact.pageSubtitle = document.getElementById('contactPageSubtitle').value;
            config.contact.formHeading = document.getElementById('contactFormHeading').value;
            config.contact.formDescription = document.getElementById('contactFormDescription').value;
        }

        config.footer = {
            ...config.footer,
            brandDescription: document.getElementById('footerBrandDesc').value,
            copyright: document.getElementById('footerCopyright').value,
            social: {
                linkedin: document.getElementById('socialLinkedin').value,
                twitter: document.getElementById('socialTwitter').value,
                github: document.getElementById('socialGithub').value
            }
        };

        // Save to localStorage
        localStorage.setItem('cloudnerve_config', JSON.stringify(config));

        // Save to file (download)
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'config.json';
        link.click();

        showToast('Changes saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving configuration:', error);
        showToast('Error saving configuration', 'error');
    }
}

// Export configuration
function exportConfiguration() {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cloudnerve-config-${Date.now()}.json`;
    link.click();
    showToast('Configuration exported successfully!');
}

// Import configuration
function importConfiguration(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            config = JSON.parse(e.target.result);
            localStorage.setItem('cloudnerve_config', JSON.stringify(config));
            populateForm();
            showToast('Configuration imported successfully!', 'success');
        } catch (error) {
            console.error('Error importing configuration:', error);
            showToast('Error importing configuration', 'error');
        }
    };
    reader.readAsText(file);
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        });
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveConfiguration);

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportConfiguration);

    // Import button
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', importConfiguration);

    // Add service button
    document.getElementById('addServiceBtn').addEventListener('click', addService);

    // Add project button
    document.getElementById('addProjectBtn').addEventListener('click', addProject);

    // Preview button
    document.getElementById('previewBtn').addEventListener('click', () => {
        window.open('../index.html', '_blank');
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset to default configuration?')) {
            localStorage.removeItem('cloudnerve_config');
            location.reload();
        }
    });
}

// Switch section
function switchSection(section) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update content
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.querySelector(`.section[data-section="${section}"]`).classList.add('active');

    // Update title
    const titles = {
        general: 'General Settings',
        hero: 'Hero Section',
        services: 'Services Management',
        about: 'About Page',
        portfolio: 'Portfolio Management',
        contact: 'Contact Page',
        footer: 'Footer Settings'
    };
    document.getElementById('sectionTitle').textContent = titles[section] || section;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
