/**
 * Buskey Authentication & Session Management
 * Handles login, registration, password validation, role-based dashboards,
 * and dynamic navigation state synchronization.
 */
(function(window) {
    const STORAGE_KEY = 'buskey_current_user';
    const REGISTERED_USERS_KEY = 'buskey_registered_users';

    const BuskeyAuth = {
        // Password validation rules
        validatePassword: function(password) {
            const rules = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)
            };
            const isValid = Object.values(rules).every(Boolean);
            return { isValid, rules };
        },

        // Email validation
        validateEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(String(email).trim().toLowerCase());
        },

        // Get currently logged-in user
        getCurrentUser: function() {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        },

        // Set logged-in user
        setCurrentUser: function(user) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
                this.updateNav();
            } catch (e) {
                console.error("Failed to save auth state", e);
            }
        },

        // Login with email, password, and selected role
        login: function(email, password, role) {
            email = String(email).trim();
            role = role || 'admin';

            const errors = [];

            if (!email) {
                errors.push("Email is required.");
            } else if (!this.validateEmail(email)) {
                errors.push("Please enter a valid email address (e.g. name@domain.com).");
            }

            if (!password) {
                errors.push("Password is required.");
            } else {
                const passVal = this.validatePassword(password);
                if (!passVal.isValid) {
                    const failedReqs = [];
                    if (!passVal.rules.length) failedReqs.push("at least 8 characters");
                    if (!passVal.rules.uppercase) failedReqs.push("1 uppercase letter");
                    if (!passVal.rules.lowercase) failedReqs.push("1 lowercase letter");
                    if (!passVal.rules.number) failedReqs.push("1 number");
                    if (!passVal.rules.symbol) failedReqs.push("1 special symbol");
                    errors.push("Password must contain: " + failedReqs.join(", ") + ".");
                }
            }

            if (errors.length > 0) {
                return { success: false, errors };
            }

            // Valid login! Save session
            const user = {
                email: email,
                name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                role: role,
                loginTime: new Date().toISOString()
            };

            this.setCurrentUser(user);
            return { success: true, user };
        },

        // Register new user
        register: function(name, email, password, role) {
            name = String(name || '').trim();
            email = String(email || '').trim();
            role = role || 'admin';

            const errors = [];
            if (!name) {
                errors.push("Full name is required.");
            }

            if (!email) {
                errors.push("Email is required.");
            } else if (!this.validateEmail(email)) {
                errors.push("Please enter a valid email address.");
            }

            if (!password) {
                errors.push("Password is required.");
            } else {
                const passVal = this.validatePassword(password);
                if (!passVal.isValid) {
                    const failedReqs = [];
                    if (!passVal.rules.length) failedReqs.push("at least 8 characters");
                    if (!passVal.rules.uppercase) failedReqs.push("1 uppercase letter");
                    if (!passVal.rules.lowercase) failedReqs.push("1 lowercase letter");
                    if (!passVal.rules.number) failedReqs.push("1 number");
                    if (!passVal.rules.symbol) failedReqs.push("1 special symbol");
                    errors.push("Password must contain: " + failedReqs.join(", ") + ".");
                }
            }

            if (errors.length > 0) {
                return { success: false, errors };
            }

            const user = {
                email: email,
                name: name,
                role: role,
                loginTime: new Date().toISOString()
            };

            // Save to registered list
            try {
                const existing = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
                existing.push(user);
                localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(existing));
            } catch (e) {}

            // Auto-login
            this.setCurrentUser(user);
            return { success: true, user };
        },

        // Switch role on the fly
        switchRole: function(newRole) {
            const user = this.getCurrentUser();
            if (user) {
                user.role = newRole;
                this.setCurrentUser(user);
                window.location.reload();
            }
        },

        // Logout
        logout: function(redirectTo) {
            localStorage.removeItem(STORAGE_KEY);
            this.updateNav();
            window.location.href = redirectTo || 'login.html';
        },

        // Guard function for dashboard
        requireAuth: function() {
            const user = this.getCurrentUser();
            if (!user) {
                window.location.href = 'login.html?redirect=dashboard.html';
                return null;
            }
            return user;
        },

        // Dynamically sync navbar state across all pages
        updateNav: function() {
            const user = this.getCurrentUser();
            const loginItem = document.getElementById('nav-login-item');
            const registerItem = document.getElementById('nav-register-item');
            const dashboardItem = document.getElementById('nav-dashboard-item');
            const logoutItem = document.getElementById('nav-logout-item');

            if (user) {
                // User is logged in: Hide Login & Register, Show Dashboard only (Logout is only inside dashboard)
                if (loginItem) loginItem.style.display = 'none';
                if (registerItem) registerItem.style.display = 'none';
                if (dashboardItem) {
                    dashboardItem.style.display = '';
                    const link = dashboardItem.querySelector('a');
                    if (link) {
                        link.innerHTML = `<i class="fa fa-th-large"></i> Dashboard <span class="badge bg-primary text-white" style="font-size: 10px; margin-left: 3px; text-transform: uppercase;">${user.role}</span>`;
                    }
                }
                if (logoutItem) logoutItem.style.display = 'none';
            } else {
                // User is logged out: Show Login & Register, Hide Dashboard & Logout
                if (loginItem) loginItem.style.display = '';
                if (registerItem) registerItem.style.display = '';
                if (dashboardItem) dashboardItem.style.display = 'none';
                if (logoutItem) logoutItem.style.display = 'none';
            }
        }
    };

    // Auto-update nav when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            BuskeyAuth.updateNav();
        });
    } else {
        BuskeyAuth.updateNav();
    }

    window.BuskeyAuth = BuskeyAuth;
    window.StacklyAuth = BuskeyAuth;
})(window);
