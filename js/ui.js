
export function initializeUI(calculators) {
    const sidebarNav = document.getElementById("sidebar-nav");
    const calculatorDisplay = document.getElementById("calculator-display");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar");

    let currentCalculatorId = null;
    let searchCache = null;

    function buildSearchCache() {
        const categories = document.querySelectorAll(".nav-category");
        searchCache = Array.from(categories).map(category => ({
            element: category,
            items: Array.from(category.querySelectorAll(".nav-item")).map(item => ({
                element: item,
                text: item.textContent.toLowerCase()
            }))
        }));
    }

    function loadCalculator(category, subcategory, id) {
        // Update Active State
        const buttons = document.querySelectorAll(".nav-item");
        buttons.forEach(btn => btn.classList.remove("active"));

        // Find the calculator object
        const calc = calculators[category].subcategories[subcategory].find(c => c.id === id);
        if (!calc) return;

        // Set active class on button
        // Since we regenerate buttons, we can't easily reference "this" from onclick unless passed.
        // But we can search by text or keep a reference if we wanted.
        // For simplicity, let's just loop and match text again as in original script,
        // or improved: match by checking if the onclick handler corresponds? No.
        // Match by text content is what the original did.
        for (const btn of buttons) {
            if (btn.dataset.calcId === id) {
                btn.classList.add("active");
                break;
            }
        }

        currentCalculatorId = id;
        document.title = calc.name + " - Universal Calculator";

        // Show Top Bar (was hidden on home page)
        const topBar = document.querySelector(".top-bar");
        if (topBar) topBar.classList.remove("hidden");

        // Close mobile sidebar
        sidebar.classList.remove("active");

        // Render Content
        calculatorDisplay.innerHTML = calc.generateHTML();

        // Focus on the calculator title for accessibility
        const titleElement = calculatorDisplay.querySelector('h2.calculator-title');
        if (titleElement) {
            titleElement.focus();
        }

        calc.attachEvents();
    }

    function renderSidebar() {
        sidebarNav.innerHTML = "";
        searchCache = null;

        for (const [catKey, category] of Object.entries(calculators)) {
            // Category Header
            const catHeader = document.createElement("div");
            catHeader.className = "nav-category";

            const catTitle = document.createElement("div");
            catTitle.className = "nav-category-header";
            catTitle.innerHTML = `
                <svg class="icon"><use href="#${category.icon}"></use></svg>
                ${category.label}
            `;
            catHeader.appendChild(catTitle);

            // Subcategories & Calculators
            const subcats = category.subcategories;
            for (const [subKey, calcList] of Object.entries(subcats)) {
                if (!calcList || calcList.length === 0) continue;

                calcList.forEach(calc => {
                    const btn = document.createElement("button");
                    btn.className = "nav-item";
                    btn.textContent = calc.name;
                    btn.dataset.calcId = calc.id;
                    btn.onclick = () => loadCalculator(catKey, subKey, calc.id);
                    catHeader.appendChild(btn);
                });
            }

            sidebarNav.appendChild(catHeader);
        }
    }

    // Mobile Menu Toggle & Draggable Logic
    let isDraggingButton = false;

    function makeDraggable(element) {
        let startX, startY, startLeft, startTop;

        function onMouseDown(e) {
            // Only trigger for left mouse button or touch
            if (e.type === 'mousedown' && e.button !== 0) return;

            isDraggingButton = false;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onMouseMove, { passive: false });
            document.addEventListener('touchend', onMouseUp);
        }

        function onMouseMove(e) {
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;

            // Threshold to consider it a drag
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                isDraggingButton = true;
                const rect = element.getBoundingClientRect();
                const newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, startLeft + dx));
                const newTop = Math.max(0, Math.min(window.innerHeight - rect.height, startTop + dy));
                element.style.left = `${newLeft}px`;
                element.style.top = `${newTop}px`;
                element.style.bottom = 'auto';
                element.style.right = 'auto';
                element.style.transform = 'none'; // Ensure no transform interferes
            }
        }

        function onMouseUp(e) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);

            // Reset flag after a short delay to allow click event to process
            setTimeout(() => { isDraggingButton = false; }, 100);
        }

        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('touchstart', onMouseDown);
    }

    // Initialize Draggable
    if (mobileMenuBtn) {
        makeDraggable(mobileMenuBtn);

        mobileMenuBtn.addEventListener("click", (e) => {
            if (isDraggingButton) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            sidebar.classList.toggle("active");
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
            // Check if click target is not sidebar and not the menu button
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target) && sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
            }
        }
    });

    // Search Functionality
    const searchInput = document.getElementById("calc-search");
    if (searchInput) {
        const handleSearch = debounce((query) => {
            if (!searchCache) buildSearchCache();

            // Fast path: empty query restores all items
            if (!query) {
                searchCache.forEach(category => {
                    category.element.style.display = "";
                    category.items.forEach(item => item.element.style.display = "");
                });
                return;
            }

            searchCache.forEach(category => {
                let hasVisibleItems = false;
                category.items.forEach(item => {
                    if (item.text.includes(query)) {
                        item.element.style.display = "block";
                        hasVisibleItems = true;
                    } else {
                        item.element.style.display = "none";
                    }
                });

                // Show/hide category header based on visible items
                category.element.style.display = hasVisibleItems ? "block" : "none";
            });
        }, 150);

        searchInput.addEventListener("input", (e) => {
            handleSearch(e.target.value.toLowerCase());
        });
    }

        // Theme Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const themeCards = document.querySelectorAll('.theme-card');

    // Helper to update the toggle icon
    const updateThemeIcon = (isDark) => {
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('use');
            if (icon) icon.setAttribute('href', isDark ? '#icon-sun' : '#icon-moon');
        }
    };

    // Initialize Theme
    const initTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const currentVariant = localStorage.getItem('themeVariant') || 'medium';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply stored theme or system preference
        if (currentTheme === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-variant', currentVariant);
            updateThemeIcon(true);
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            updateThemeIcon(false);
        }

        // Highlight active variant card
        themeCards.forEach(card => {
            if (card.dataset.variant === currentVariant) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    // Toggle Theme (Light <-> Dark)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const isDark = currentTheme === 'dark';

            if (isDark) {
                // Switch to Light
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            } else {
                // Switch to Dark (restore variant)
                const variant = localStorage.getItem('themeVariant') || 'medium';
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.setAttribute('data-variant', variant);
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            }
        });
    }

    // Settings Modal Logic
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                settingsModal.classList.remove('active');
            });
        }

        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });

        // Theme Selection
        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                const variant = card.dataset.variant;

                // Update UI active state
                themeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Save Variant
                localStorage.setItem('themeVariant', variant);

                // Apply immediately
                document.documentElement.setAttribute('data-variant', variant);

                // If not in dark mode, switch to it
                if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    updateThemeIcon(true);
                }
            });
        });
    }

    // Run initialization
    initTheme();

// Initial Render call
    renderSidebar();

    // Top bar is now visible by default to show the search bar
    const topBar = document.querySelector(".top-bar");
    if (topBar) {
        topBar.classList.remove("hidden");
    }

    // Global Enter Key Support
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            // Check if focus is on an input or select (but not the search bar)
            if ((e.target.tagName === "INPUT" || e.target.tagName === "SELECT") && e.target.id !== "calc-search") {
                // Find the calculate button within the active calculator display
                const calcBtn = document.querySelector("#calculator-display .calculate-btn");
                if (calcBtn) {
                    calcBtn.click();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * Debounce function to limit the frequency of function calls.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
