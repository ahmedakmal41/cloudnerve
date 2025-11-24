// Content Loader for CloudNerve Website
// This script loads dynamic content from admin/config.json

class ContentLoader {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.updateContent();
    }

    async loadConfig() {
        try {
            // Try loading from localStorage first (admin panel changes)
            const savedConfig = localStorage.getItem('cloudnerve_config');
            if (savedConfig) {
                this.config = JSON.parse(savedConfig);
                console.log('Loaded config from localStorage');
                return;
            }

            // Fallback to config.json
            const response = await fetch('admin/config.json');
            this.config = await response.json();
            console.log('Loaded config from config.json');
        } catch (error) {
            console.error('Error loading configuration:', error);
        }
    }

    updateContent() {
        if (!this.config) return;

        // Update based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        switch (currentPage) {
            case 'index.html':
            case '':
                this.updateHomePage();
                break;
            case 'services.html':
                this.updateServicesPage();
                break;
            case 'about.html':
                this.updateAboutPage();
                break;
            case 'portfolio.html':
                this.updatePortfolioPage();
                break;
            case 'contact.html':
                this.updateContactPage();
                break;
        }

        // Update common elements (logo, footer, etc.)
        this.updateCommonElements();
    }

    updateHomePage() {
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroVideo = document.querySelector('.hero-video source');

        if (heroTitle) heroTitle.textContent = this.config.hero?.title;
        if (heroSubtitle) heroSubtitle.textContent = this.config.hero?.subtitle;
        if (heroVideo) heroVideo.src = this.config.hero?.video;

        // Update hero buttons
        const primaryBtn = document.querySelector('.hero-buttons .btn-primary');
        const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

        if (primaryBtn) {
            primaryBtn.textContent = this.config.hero?.primaryButton?.text;
            primaryBtn.href = this.config.hero?.primaryButton?.link;
        }
        if (secondaryBtn) {
            secondaryBtn.textContent = this.config.hero?.secondaryButton?.text;
            secondaryBtn.href = this.config.hero?.secondaryButton?.link;
        }
    }

    updateServicesPage() {
        // Update section header
        const sectionTitle = document.querySelector('.services .section-title');
        const sectionDesc = document.querySelector('.services .section-description');

        if (sectionTitle) sectionTitle.textContent = this.config.services?.pageTitle;
        if (sectionDesc) sectionDesc.textContent = this.config.services?.pageSubtitle;

        // Note: Service cards are static in HTML for now
        // To make them fully dynamic, you'd need to rebuild the HTML structure
    }

    updateAboutPage() {
        // Update section header
        const pageTitle = document.querySelector('.about .section-title');
        const pageSubtitle = document.querySelector('.about .section-description');
        const mainHeading = document.querySelector('.about-content h2');

        if (pageTitle) pageTitle.textContent = this.config.about?.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = this.config.about?.pageSubtitle;
        if (mainHeading) mainHeading.textContent = this.config.about?.mainHeading;

        // Update descriptions
        const descriptions = document.querySelectorAll('.about-content > p');
        if (descriptions[0]) descriptions[0].textContent = this.config.about?.description1;
        if (descriptions[1]) descriptions[1].textContent = this.config.about?.description2;

        // Update mission/vision/values
        const missionCards = document.querySelectorAll('.mission-card');
        if (missionCards[0]) {
            missionCards[0].querySelector('p').textContent = this.config.about?.mission;
        }
        if (missionCards[1]) {
            missionCards[1].querySelector('p').textContent = this.config.about?.vision;
        }
        if (missionCards[2]) {
            missionCards[2].querySelector('p').textContent = this.config.about?.values;
        }
    }

    updatePortfolioPage() {
        const pageTitle = document.querySelector('.portfolio-section .section-title');
        const pageSubtitle = document.querySelector('.portfolio-section .section-description');

        if (pageTitle) pageTitle.textContent = this.config.portfolio?.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = this.config.portfolio?.pageSubtitle;

        // Note: Portfolio projects are static in HTML for now
    }

    updateContactPage() {
        const pageTitle = document.querySelector('.contact .section-title');
        const pageSubtitle = document.querySelector('.contact .section-description');
        const formHeading = document.querySelector('.contact-container h2');
        const formDesc = document.querySelector('.contact-container .section-description');

        if (pageTitle) pageTitle.textContent = this.config.contact?.pageTitle;
        if (pageSubtitle) pageSubtitle.textContent = this.config.contact?.pageSubtitle;
        if (formHeading) formHeading.textContent = this.config.contact?.formHeading;
        if (formDesc) formDesc.textContent = this.config.contact?.formDescription;
    }

    updateCommonElements() {
        // Update logo
        const logos = document.querySelectorAll('.logo');
        logos.forEach(logo => {
            if (logo.tagName === 'IMG') {
                logo.src = this.config.site?.logo;
                logo.alt = this.config.site?.name;
            }
        });

        // Update footer
        const footerBrand = document.querySelector('.footer-brand p');
        const footerCopyright = document.querySelector('.footer-bottom p');

        if (footerBrand) footerBrand.textContent = this.config.footer?.brandDescription;
        if (footerCopyright) footerCopyright.textContent = this.config.footer?.copyright;

        // Update social links
        const socialLinks = document.querySelectorAll('.footer-social a');
        if (socialLinks[0]) socialLinks[0].href = this.config.footer?.social?.linkedin;
        if (socialLinks[1]) socialLinks[1].href = this.config.footer?.social?.twitter;
        if (socialLinks[2]) socialLinks[2].href = this.config.footer?.social?.github;

        // Update contact info in footer
        const contactInfo = document.querySelectorAll('.footer-contact li');
        if (contactInfo[0]) {
            contactInfo[0].querySelector('span').textContent = this.config.contact?.address;
        }
        if (contactInfo[1]) {
            contactInfo[1].querySelector('a').textContent = this.config.contact?.email;
            contactInfo[1].querySelector('a').href = `mailto:${this.config.contact?.email}`;
        }
        if (contactInfo[2]) {
            contactInfo[2].querySelector('a').textContent = this.config.contact?.phone;
            contactInfo[2].querySelector('a').href = `tel:${this.config.contact?.phone.replace(/\s/g, '')}`;
        }

        // Update page title
        if (this.config.site?.name) {
            document.title = document.title.replace(/CloudNerve/g, this.config.site.name);
        }
    }
}

// Initialize content loader when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ContentLoader();
    });
} else {
    new ContentLoader();
}
