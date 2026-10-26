document.addEventListener('DOMContentLoaded', () => {

    // 1. Side Flyout Menu Toggle & Outside Click Listener
    const menuToggleBtn = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    if (menuToggleBtn && sideMenu) {
        menuToggleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            menuToggleBtn.classList.toggle('active');
            sideMenu.classList.toggle('open');
        });

        // Close flyout menu when clicking outside container
        document.addEventListener('click', (event) => {
            if (!menuToggleBtn.contains(event.target) && !sideMenu.contains(event.target)) {
                menuToggleBtn.classList.remove('active');
                sideMenu.classList.remove('open');
            }
        });
    }

    // 2. Drawer Sidebar Menu Item & Pane Switcher (Hover & Click)
    const sidebarItems = document.querySelectorAll('.drawer-sidebar .menu-item');
    const contentPanes = document.querySelectorAll('.menu-pane-content');

    sidebarItems.forEach(item => {
        const handleTabSwitch = () => {
            const targetTab = item.getAttribute('data-tab');

            // Toggle active highlight on sidebar items
            sidebarItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // Switch right-hand dynamic content panel
            contentPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        };

        item.addEventListener('mouseenter', handleTabSwitch);
        item.addEventListener('click', (e) => {
            e.preventDefault();
            handleTabSwitch();
        });
    });

    // 3. Hero Tab Data Content Dictionary
    const tabData = {
        plt: {
            title: "PRACTICAL LEGAL TRAINING",
            description: "Develop legal skills, build real world experience and prepare for your first role through flexible online PLT, designed around how lawyers work today."
        },
        cpd: {
            title: "CONTINUING PROFESSIONAL DEVELOPMENT",
            description: "Stay ahead with practical CPD seminars designed for legal professionals to meet annual compliance requirements and enhance expertise."
        },
        psc: {
            title: "PROFESSIONAL SHORT COURSES",
            description: "Build targeted practical legal knowledge and specialized skills through focused short courses applied directly in daily legal practice."
        },
        about: {
            title: "LEO CUSSEN CENTRE FOR LAW",
            description: "Providing over five decades of practical legal education, supporting legal professionals at every stage of their career journey."
        }
    };

    // 4. Hero Section Content Switcher
    const tabItems = document.querySelectorAll('.tab-item');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all hero tabs
            tabItems.forEach(item => item.classList.remove('active'));
            
            // Highlight clicked hero tab box
            tab.classList.add('active');

            // Swap hero section content dynamically
            const tabKey = tab.getAttribute('data-tab');
            if (tabData[tabKey] && heroTitle && heroDescription) {
                heroTitle.textContent = tabData[tabKey].title;
                heroDescription.textContent = tabData[tabKey].description;
            }
        });
    });

    // 5. Animated Number Counters on Scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const decimals = parseInt(element.getAttribute('data-decimals')) || 0;
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 1200; // Animation duration (1.2s rapid speed)
        const start = 1;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Cubic ease-out formula
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (target - start) * easeOutProgress;

            // Format numbers with commas (e.g., 9,800)
            const formattedNumber = currentValue.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });

            element.textContent = formattedNumber + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }

        requestAnimationFrame(updateNumber);
    }

    // Intersection Observer for Statistics Section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true; // Prevents re-triggering animation
                    statNumbers.forEach(stat => animateCounter(stat));
                }
            });
        }, {
            threshold: 0.3 // Triggers when 30% of section is visible
        });

        observer.observe(statsSection);
    }

});