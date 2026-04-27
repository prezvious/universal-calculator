export function initializeUI(calculators) {
    const sidebarNav = document.getElementById("sidebar-nav");
    const calculatorDisplay = document.getElementById("calculator-display");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");
    const sidebar = document.querySelector(".sidebar");
    const homeBtn = document.getElementById("home-btn");
    const searchInput = document.getElementById("calc-search");
    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const settingsBtn = document.getElementById("settings-btn");
    const settingsModal = document.getElementById("settings-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const themeCards = document.querySelectorAll(".theme-card");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    let currentCalculatorId = null;
    let searchCache = null;

    function getCategoryEntries() {
        return Object.entries(calculators).map(([categoryKey, category]) => {
            const items = [];

            for (const [subKey, calcList] of Object.entries(category.subcategories)) {
                if (!Array.isArray(calcList)) {
                    continue;
                }

                calcList.forEach((calc) => {
                    items.push({
                        categoryKey,
                        categoryLabel: category.label,
                        categoryIcon: category.icon,
                        subKey,
                        calc
                    });
                });
            }

            return {
                key: categoryKey,
                label: category.label,
                icon: category.icon,
                items
            };
        });
    }

    function getAllCalculators() {
        return getCategoryEntries().flatMap((entry) => entry.items);
    }

    function getLibraryStats() {
        const categoryEntries = getCategoryEntries();

        return {
            categoryEntries,
            totalCalculators: categoryEntries.reduce((count, entry) => count + entry.items.length, 0),
            totalCategories: categoryEntries.length
        };
    }

    function updatePageMeta(title, subtitle) {
        if (pageTitle) {
            pageTitle.textContent = title;
        }

        if (pageSubtitle) {
            pageSubtitle.textContent = subtitle;
        }
    }

    function closeMobileMenu() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("active");

        if (mobileSidebarOverlay) {
            mobileSidebarOverlay.classList.remove("active");
            mobileSidebarOverlay.hidden = true;
        }

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
    }

    function openMobileMenu() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.add("active");

        if (mobileSidebarOverlay) {
            mobileSidebarOverlay.hidden = false;
            mobileSidebarOverlay.classList.add("active");
        }

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute("aria-expanded", "true");
        }
    }

    function toggleMobileMenu() {
        if (!sidebar) {
            return;
        }

        if (sidebar.classList.contains("active")) {
            closeMobileMenu();
            return;
        }

        openMobileMenu();
    }

    function updateActiveNav() {
        const buttons = document.querySelectorAll(".nav-item");

        buttons.forEach((btn) => {
            const isActive = btn.dataset.calcId === currentCalculatorId;
            btn.classList.toggle("active", isActive);

            if (isActive) {
                btn.setAttribute("aria-current", "page");
            } else {
                btn.removeAttribute("aria-current");
            }
        });
    }

    function buildSearchCache() {
        const categories = document.querySelectorAll(".nav-category");
        searchCache = Array.from(categories).map((category) => ({
            element: category,
            items: Array.from(category.querySelectorAll(".nav-item")).map((item) => ({
                element: item,
                text: item.textContent.toLowerCase()
            }))
        }));
    }

    function restoreSearchResults() {
        if (!searchCache) {
            buildSearchCache();
        }

        searchCache.forEach((category) => {
            category.element.style.display = "";
            category.items.forEach((item) => {
                item.element.style.display = "";
            });
        });
    }

    function resetSearchFilter() {
        if (!searchInput) {
            return;
        }

        searchInput.value = "";
        restoreSearchResults();
    }

    function loadCalculator(categoryKey, subKey, id, options = {}) {
        const calcList = calculators[categoryKey]?.subcategories?.[subKey];
        if (!calcList) {
            return;
        }

        const calc = calcList.find((item) => item.id === id);
        if (!calc) {
            return;
        }

        currentCalculatorId = id;
        updateActiveNav();

        updatePageMeta(calc.name, calc.description);
        document.title = `${calc.name} - Universal Calculator`;

        if (!options.preserveSearch) {
            resetSearchFilter();
        }

        closeMobileMenu();
        calculatorDisplay.innerHTML = calc.generateHTML();
        calculatorDisplay.scrollTop = 0;

        const titleElement = calculatorDisplay.querySelector(".calculator-title");
        if (titleElement) {
            titleElement.focus();
        }

        calc.attachEvents();
    }

    function loadCalculatorById(id, options = {}) {
        const entry = getAllCalculators().find((item) => item.calc.id === id);
        if (!entry) {
            return;
        }

        loadCalculator(entry.categoryKey, entry.subKey, id, options);
    }

    function renderSidebar() {
        const { categoryEntries } = getLibraryStats();
        sidebarNav.innerHTML = "";

        categoryEntries.forEach((entry) => {
            const category = document.createElement("section");
            category.className = "nav-category";
            category.dataset.category = entry.key;

            const header = document.createElement("div");
            header.className = "nav-category-header";
            header.innerHTML = `
                <span class="nav-category-heading">
                    <span class="nav-category-icon">
                        <svg class="icon"><use href="#${entry.icon}"></use></svg>
                    </span>
                    <span>${entry.label}</span>
                </span>
                <span class="nav-category-count">${entry.items.length}</span>
            `;
            category.appendChild(header);

            entry.items.forEach((item) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "nav-item";
                btn.textContent = item.calc.name;
                btn.dataset.calcId = item.calc.id;
                btn.addEventListener("click", () => loadCalculator(item.categoryKey, item.subKey, item.calc.id));
                category.appendChild(btn);
            });

            sidebarNav.appendChild(category);
        });

        searchCache = null;
        buildSearchCache();
        updateActiveNav();
    }

    function renderOverview() {
        const { categoryEntries, totalCalculators, totalCategories } = getLibraryStats();
        currentCalculatorId = null;
        updateActiveNav();
        closeMobileMenu();
        document.title = "Universal Calculator";
        updatePageMeta(
            "Workspace",
            `${totalCalculators} calculators across ${totalCategories} categories.`
        );

        const featuredLaunches = categoryEntries
            .map((entry) => entry.items[0])
            .filter(Boolean)
            .slice(0, 6);

        const categoryCards = categoryEntries.map((entry) => `
            <article class="category-card" data-category="${entry.key}">
                <div class="category-card-header">
                    <span class="category-card-icon">
                        <svg class="icon"><use href="#${entry.icon}"></use></svg>
                    </span>
                    <div>
                        <h3>${entry.label}</h3>
                        <p>${entry.items.length} calculators</p>
                    </div>
                </div>
                <div class="category-links">
                    ${entry.items.slice(0, 4).map((item) => `
                        <button type="button" class="overview-launch-btn" data-calc-id="${item.calc.id}">
                            ${item.calc.name}
                        </button>
                    `).join("")}
                </div>
            </article>
        `).join("");

        calculatorDisplay.innerHTML = `
            <section class="overview-shell">
                <section class="overview-hero">
                    <div class="overview-hero-copy">
                        <div class="overview-brand-badge">
                            <span class="overview-brand-mark">
                                <svg class="icon"><use href="#icon-brand"></use></svg>
                            </span>
                            <span>Universal Calculator</span>
                        </div>
                        <p class="overview-kicker">Workspace</p>
                        <h2>Precision tools for everyday quantitative work.</h2>
                        <p>A single workspace for formulas, conversions, and reference calculations.</p>
                    </div>
                    <div class="overview-stat-grid">
                        <div class="overview-stat">
                            <span class="overview-stat-value">${totalCalculators}</span>
                            <span class="overview-stat-label">Calculators</span>
                        </div>
                        <div class="overview-stat">
                            <span class="overview-stat-value">${totalCategories}</span>
                            <span class="overview-stat-label">Categories</span>
                        </div>
                        <div class="overview-stat">
                            <span class="overview-stat-value">${featuredLaunches.length}</span>
                            <span class="overview-stat-label">Quick Picks</span>
                        </div>
                    </div>
                </section>

                <section class="overview-panels">
                    <article class="overview-panel">
                        <div class="overview-panel-header">
                            <h3>Quick Launch</h3>
                            <span>${featuredLaunches.length} ready</span>
                        </div>
                        <div class="overview-quick-grid">
                            ${featuredLaunches.map((item) => `
                                <button type="button" class="overview-launch-btn" data-calc-id="${item.calc.id}">
                                    <span>${item.calc.name}</span>
                                    <small>${item.categoryLabel}</small>
                                </button>
                            `).join("")}
                        </div>
                    </article>

                    <article class="overview-panel">
                        <div class="overview-panel-header">
                            <h3>Library Snapshot</h3>
                            <span>${totalCategories} groups</span>
                        </div>
                        <div class="overview-chip-list">
                            ${categoryEntries.map((entry) => `
                                <div class="overview-chip" data-category="${entry.key}">
                                    <span class="overview-chip-icon">
                                        <svg class="icon"><use href="#${entry.icon}"></use></svg>
                                    </span>
                                    <span>${entry.label}</span>
                                    <strong>${entry.items.length}</strong>
                                </div>
                            `).join("")}
                        </div>
                    </article>
                </section>

                <section class="overview-category-grid">
                    ${categoryCards}
                </section>
            </section>
        `;

        calculatorDisplay.querySelectorAll("[data-calc-id]").forEach((button) => {
            button.addEventListener("click", () => {
                loadCalculatorById(button.dataset.calcId);
            });
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", (event) => {
            event.preventDefault();
            toggleMobileMenu();
        });
    }

    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener("click", closeMobileMenu);
    }

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            resetSearchFilter();
            renderOverview();
        });
    }

    if (searchInput) {
        const handleSearch = debounce((query) => {
            if (!searchCache) {
                buildSearchCache();
            }

            if (!query) {
                restoreSearchResults();
                return;
            }

            searchCache.forEach((category) => {
                let hasVisibleItems = false;

                category.items.forEach((item) => {
                    if (item.text.includes(query)) {
                        item.element.style.display = "";
                        hasVisibleItems = true;
                    } else {
                        item.element.style.display = "none";
                    }
                });

                category.element.style.display = hasVisibleItems ? "" : "none";
            });
        }, 120);

        searchInput.addEventListener("input", (event) => {
            handleSearch(event.target.value.trim().toLowerCase());
        });

        searchInput.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }

            const query = event.target.value.trim().toLowerCase();
            if (!query) {
                return;
            }

            const allCalculators = getAllCalculators();
            const match = allCalculators.find((item) => item.calc.name.toLowerCase().includes(query));
            if (!match) {
                return;
            }

            loadCalculator(match.categoryKey, match.subKey, match.calc.id, { preserveSearch: false });
        });
    }

    function updateThemeIcon(isDark) {
        if (!themeToggleBtn) {
            return;
        }

        const icon = themeToggleBtn.querySelector("use");
        if (icon) {
            icon.setAttribute("href", isDark ? "#icon-sun" : "#icon-moon");
        }
    }

    function syncThemeColor() {
        if (!themeColorMeta) {
            return;
        }

        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const variant = document.documentElement.getAttribute("data-variant") || "medium";
        const darkThemeColors = {
            enhanced: "#091119",
            medium: "#10161d",
            gentle: "#182026"
        };

        themeColorMeta.setAttribute("content", isDark ? darkThemeColors[variant] || darkThemeColors.medium : "#f4efe8");
    }

    function setActiveThemeCard(activeVariant) {
        themeCards.forEach((card) => {
            card.classList.toggle("active", card.dataset.variant === activeVariant);
        });
    }

    function closeSettingsModal() {
        if (settingsModal) {
            settingsModal.classList.remove("active");
        }
    }

    function applyThemeVariant(variant) {
        localStorage.setItem("themeVariant", variant);
        document.documentElement.setAttribute("data-variant", variant);
        setActiveThemeCard(variant);

        if (document.documentElement.getAttribute("data-theme") !== "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            updateThemeIcon(true);
        }

        syncThemeColor();
    }

    function initTheme() {
        const storedTheme = localStorage.getItem("theme");
        const storedVariant = localStorage.getItem("themeVariant") || "medium";
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);

        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

        if (isDark) {
            document.documentElement.setAttribute("data-variant", storedVariant);
        } else {
            document.documentElement.removeAttribute("data-variant");
        }

        updateThemeIcon(isDark);
        setActiveThemeCard(storedVariant);
        syncThemeColor();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";

            if (isDark) {
                document.documentElement.setAttribute("data-theme", "light");
                document.documentElement.removeAttribute("data-variant");
                localStorage.setItem("theme", "light");
                updateThemeIcon(false);
            } else {
                const variant = localStorage.getItem("themeVariant") || "medium";
                document.documentElement.setAttribute("data-theme", "dark");
                document.documentElement.setAttribute("data-variant", variant);
                localStorage.setItem("theme", "dark");
                updateThemeIcon(true);
            }

            syncThemeColor();
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
            if (settingsModal) {
                settingsModal.classList.add("active");
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeSettingsModal);
    }

    if (settingsModal) {
        settingsModal.addEventListener("click", (event) => {
            if (event.target === settingsModal) {
                closeSettingsModal();
            }
        });
    }

    themeCards.forEach((card) => {
        const activate = () => applyThemeVariant(card.dataset.variant);
        card.addEventListener("click", activate);
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSettingsModal();
            closeMobileMenu();
            return;
        }

        if (
            event.key === "Enter" &&
            (event.target.tagName === "INPUT" || event.target.tagName === "SELECT") &&
            event.target.id !== "calc-search"
        ) {
            const calcBtn = document.querySelector("#calculator-display .calculate-btn");
            if (calcBtn) {
                calcBtn.click();
                event.preventDefault();
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            closeMobileMenu();
        }
    });

    initTheme();
    renderSidebar();
    renderOverview();
}

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
