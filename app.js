/**
 * Nested Checkbox Tree - Best Practices Implementation
 * 
 * Follows WAI-ARIA Tree View Pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 * 
 * Key Features:
 * - Full keyboard navigation (Arrow keys, Space, Enter, Home, End)
 * - ARIA roles and states (tree, treeitem, group, aria-checked="mixed")
 * - Event delegation for performance
 * - Tri-state checkbox behavior
 * - Visual tree hierarchy with connecting lines
 * - Focus management
 */

// Tool data structure
const toolsData = [
    {
        id: 'azure-operations',
        name: 'Azure operations',
        tools: [
            { id: 'azure-1', name: 'Resource provisioning', description: 'Provision and manage Azure resources', enabled: true },
            { id: 'azure-2', name: 'Virtual machine management', description: 'Start, stop, and manage VMs', enabled: true },
            { id: 'azure-3', name: 'Network configuration', description: 'Configure virtual networks and subnets', enabled: true },
            { id: 'azure-4', name: 'Storage management', description: 'Manage blob and file storage', enabled: true },
            { id: 'azure-5', name: 'Identity management', description: 'Manage Azure AD identities', enabled: true },
            { id: 'azure-6', name: 'Key vault operations', description: 'Manage secrets and certificates', enabled: true },
            { id: 'azure-7', name: 'App service deployment', description: 'Deploy and manage web apps', enabled: true },
            { id: 'azure-8', name: 'Function app management', description: 'Manage serverless functions', enabled: true },
            { id: 'azure-9', name: 'Container registry', description: 'Manage container images', enabled: true },
            { id: 'azure-10', name: 'Kubernetes service', description: 'Manage AKS clusters', enabled: true },
            { id: 'azure-11', name: 'SQL database operations', description: 'Manage SQL databases', enabled: true },
            { id: 'azure-12', name: 'Cosmos DB operations', description: 'Manage NoSQL databases', enabled: true },
            { id: 'azure-13', name: 'Redis cache management', description: 'Manage in-memory caching', enabled: true },
            { id: 'azure-14', name: 'Service bus messaging', description: 'Manage message queues', enabled: true },
            { id: 'azure-15', name: 'Event hub streaming', description: 'Manage event streaming', enabled: true },
            { id: 'azure-16', name: 'Logic app workflows', description: 'Manage automated workflows', enabled: true },
            { id: 'azure-17', name: 'API management', description: 'Manage API gateways', enabled: true },
            { id: 'azure-18', name: 'CDN configuration', description: 'Configure content delivery', enabled: true },
            { id: 'azure-19', name: 'Traffic manager', description: 'Manage DNS traffic routing', enabled: true },
            { id: 'azure-20', name: 'Load balancer config', description: 'Configure load balancing', enabled: true },
            { id: 'azure-21', name: 'Firewall management', description: 'Manage network firewalls', enabled: true },
            { id: 'azure-22', name: 'DDoS protection', description: 'Configure DDoS protection', enabled: true }
        ]
    },
    {
        id: 'code-analysis',
        name: 'Code analysis',
        tools: [
            { id: 'code-1', name: 'Static code analysis', description: 'Analyze code for bugs and vulnerabilities', enabled: true },
            { id: 'code-2', name: 'Dependency scanning', description: 'Scan for vulnerable dependencies', enabled: false },
            { id: 'code-3', name: 'Code quality metrics', description: 'Calculate code quality scores', enabled: true }
        ]
    },
    {
        id: 'devops',
        name: 'DevOps',
        tools: [
            { id: 'devops-1', name: 'Pipeline management', description: 'Create and manage CI/CD pipelines', enabled: true },
            { id: 'devops-2', name: 'Build automation', description: 'Automate build processes', enabled: true },
            { id: 'devops-3', name: 'Release management', description: 'Manage deployment releases', enabled: true },
            { id: 'devops-4', name: 'Artifact management', description: 'Store and manage build artifacts', enabled: true },
            { id: 'devops-5', name: 'Test automation', description: 'Run automated test suites', enabled: true },
            { id: 'devops-6', name: 'Environment provisioning', description: 'Create dev/test environments', enabled: true },
            { id: 'devops-7', name: 'Configuration management', description: 'Manage app configurations', enabled: true },
            { id: 'devops-8', name: 'Secret rotation', description: 'Rotate secrets automatically', enabled: true },
            { id: 'devops-9', name: 'Deployment slots', description: 'Manage staging slots', enabled: true },
            { id: 'devops-10', name: 'Rollback operations', description: 'Rollback failed deployments', enabled: true },
            { id: 'devops-11', name: 'Blue-green deployment', description: 'Zero-downtime deployments', enabled: true },
            { id: 'devops-12', name: 'Canary releases', description: 'Gradual feature rollouts', enabled: true },
            { id: 'devops-13', name: 'Feature flags', description: 'Manage feature toggles', enabled: true },
            { id: 'devops-14', name: 'Git operations', description: 'Perform git operations', enabled: true },
            { id: 'devops-15', name: 'Pull request automation', description: 'Automate PR workflows', enabled: true },
            { id: 'devops-16', name: 'Branch policies', description: 'Enforce branch rules', enabled: true },
            { id: 'devops-17', name: 'Work item tracking', description: 'Manage work items', enabled: true },
            { id: 'devops-18', name: 'Sprint management', description: 'Manage agile sprints', enabled: true },
            { id: 'devops-19', name: 'Dashboard creation', description: 'Create project dashboards', enabled: true }
        ]
    },
    {
        id: 'diagnostics',
        name: 'Diagnostics',
        tools: [
            { id: 'diag-1', name: 'Log analytics', description: 'Query and analyze logs', enabled: true },
            { id: 'diag-2', name: 'Metric collection', description: 'Collect and view metrics', enabled: true }
        ]
    },
    {
        id: 'knowledge-base',
        name: 'Knowledge base',
        tools: [
            { id: 'kb-1', name: 'Documentation search', description: 'Search Azure documentation', enabled: true },
            { id: 'kb-2', name: 'Best practices', description: 'Get recommended best practices', enabled: true },
            { id: 'kb-3', name: 'Architecture patterns', description: 'View reference architectures', enabled: true },
            { id: 'kb-4', name: 'Troubleshooting guides', description: 'Access troubleshooting docs', enabled: true },
            { id: 'kb-5', name: 'API reference', description: 'Browse API documentation', enabled: true },
            { id: 'kb-6', name: 'Sample code', description: 'Access code samples', enabled: true }
        ]
    },
    {
        id: 'monitoring',
        name: 'Monitoring',
        tools: [
            { id: 'mon-1', name: 'Alert management', description: 'Configure and manage alerts', enabled: true },
            { id: 'mon-2', name: 'Application insights', description: 'Monitor application performance', enabled: true },
            { id: 'mon-3', name: 'Health checks', description: 'Run resource health checks', enabled: false },
            { id: 'mon-4', name: 'Cost analysis', description: 'Analyze resource costs', enabled: true },
            { id: 'mon-5', name: 'Budget alerts', description: 'Set spending alerts', enabled: true },
            { id: 'mon-6', name: 'Resource utilization', description: 'View resource usage', enabled: true },
            { id: 'mon-7', name: 'SLA monitoring', description: 'Track SLA compliance', enabled: true },
            { id: 'mon-8', name: 'Availability tests', description: 'Run availability tests', enabled: false }
        ]
    },
    {
        id: 'security',
        name: 'Security',
        tools: [
            { id: 'sec-1', name: 'Security center', description: 'View security recommendations', enabled: true },
            { id: 'sec-2', name: 'Compliance check', description: 'Check compliance status', enabled: true },
            { id: 'sec-3', name: 'Vulnerability scanning', description: 'Scan for vulnerabilities', enabled: true },
            { id: 'sec-4', name: 'Access reviews', description: 'Review access permissions', enabled: true },
            { id: 'sec-5', name: 'Threat detection', description: 'Detect security threats', enabled: true }
        ]
    }
];

/**
 * TreeCheckbox Class - Manages the nested checkbox tree
 * Uses event delegation and proper ARIA patterns
 */
class TreeCheckbox {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.focusedItem = null;
        this.treeItems = [];
        
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.updateTotalCount();
    }

    /**
     * Render the tree structure with proper ARIA roles
     */
    render() {
        const treeHtml = `
            <ul class="tree-root" role="tree" aria-label="Tools selection">
                ${this.data.map((category, catIndex) => this.renderCategory(category, catIndex)).join('')}
            </ul>
        `;
        this.container.innerHTML = treeHtml;
        
        // Cache tree items for keyboard navigation
        this.treeItems = Array.from(this.container.querySelectorAll('[role="treeitem"]'));
        
        // Set initial indeterminate states
        this.data.forEach(category => {
            this.updateParentCheckboxVisual(category.id);
        });
    }

    /**
     * Render a category (parent node) with its children
     */
    renderCategory(category, catIndex) {
        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;
        const checkState = this.getCheckState(enabledCount, totalCount);
        const ariaChecked = checkState === 'indeterminate' ? 'mixed' : (checkState === 'checked' ? 'true' : 'false');

        return `
            <li class="tree-category" 
                role="treeitem"
                aria-expanded="false"
                aria-checked="${ariaChecked}"
                aria-level="1"
                aria-setsize="${this.data.length}"
                aria-posinset="${catIndex + 1}"
                data-category-id="${category.id}"
                tabindex="${catIndex === 0 ? '0' : '-1'}">
                
                <div class="tree-node-content">
                    <button class="expand-btn" 
                            type="button" 
                            aria-hidden="true"
                            tabindex="-1">
                        <svg class="expand-icon" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M4 1l5 5-5 5V1z"/>
                        </svg>
                    </button>
                    
                    <div class="category-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="3" width="7" height="7" rx="1"/>
                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                            <rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                    </div>
                    
                    <span class="tree-label" id="label-${category.id}">${category.name}</span>
                    <span class="tree-count" aria-live="polite">${enabledCount}/${totalCount} tools enabled</span>
                    
                    <label class="checkbox-container" data-state="${checkState}">
                        <input type="checkbox"
                               id="cat-${category.id}"
                               class="tree-checkbox visually-hidden"
                               data-category="${category.id}"
                               data-type="parent"
                               ${checkState === 'checked' ? 'checked' : ''}
                               aria-labelledby="label-${category.id}"
                               tabindex="-1">
                        <span class="checkbox-custom" aria-hidden="true">
                            <svg class="check-icon" viewBox="0 0 16 16" fill="none">
                                <path class="checkmark" d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path class="indeterminate-mark" d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                    </label>
                </div>
                
                <ul class="tree-children" role="group" aria-label="${category.name} tools">
                    ${category.tools.map((tool, toolIndex) => this.renderTool(tool, category.id, toolIndex, category.tools.length)).join('')}
                </ul>
            </li>
        `;
    }

    /**
     * Render a tool (child node)
     */
    renderTool(tool, categoryId, toolIndex, totalTools) {
        return `
            <li class="tree-item"
                role="treeitem"
                aria-checked="${tool.enabled ? 'true' : 'false'}"
                aria-level="2"
                aria-setsize="${totalTools}"
                aria-posinset="${toolIndex + 1}"
                data-tool-id="${tool.id}"
                data-category-id="${categoryId}"
                tabindex="-1">
                
                <div class="tree-node-content">
                    <div class="tool-info">
                        <span class="tree-label" id="label-${tool.id}">${tool.name}</span>
                        <span class="tool-description">${tool.description}</span>
                    </div>
                    
                    <label class="checkbox-container" data-state="${tool.enabled ? 'checked' : 'unchecked'}">
                        <input type="checkbox"
                               id="tool-${tool.id}"
                               class="tree-checkbox visually-hidden"
                               data-tool="${tool.id}"
                               data-category="${categoryId}"
                               data-type="child"
                               ${tool.enabled ? 'checked' : ''}
                               aria-labelledby="label-${tool.id}"
                               tabindex="-1">
                        <span class="checkbox-custom" aria-hidden="true">
                            <svg class="check-icon" viewBox="0 0 16 16" fill="none">
                                <path class="checkmark" d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </label>
                </div>
            </li>
        `;
    }

    /**
     * Determine checkbox state based on child selection
     */
    getCheckState(checkedCount, totalCount) {
        if (checkedCount === 0) return 'unchecked';
        if (checkedCount === totalCount) return 'checked';
        return 'indeterminate';
    }

    /**
     * Attach event listeners using delegation pattern
     * Best Practice: Single event listener on container, not on each element
     */
    attachEventListeners() {
        // Single delegated click listener
        this.container.addEventListener('click', (e) => this.handleClick(e));
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Focus tracking
        this.container.addEventListener('focusin', (e) => {
            const treeItem = e.target.closest('[role="treeitem"]');
            if (treeItem) {
                this.focusedItem = treeItem;
            }
        });
        
        // Search functionality
        const searchInput = document.querySelector('.search-tools input');
        if (searchInput) {
            // Debounce search for performance
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, 150);
            });
        }
    }

    /**
     * Handle click events via delegation
     */
    handleClick(e) {
        const target = e.target;
        
        // Handle expand/collapse button click
        const expandBtn = target.closest('.expand-btn');
        if (expandBtn) {
            e.preventDefault();
            e.stopPropagation();
            const treeItem = expandBtn.closest('[role="treeitem"]');
            this.toggleExpand(treeItem);
            this.setFocus(treeItem);
            return;
        }

        // Handle checkbox container click (label wraps input)
        const checkboxContainer = target.closest('.checkbox-container');
        if (checkboxContainer) {
            e.preventDefault();
            e.stopPropagation();
            const treeItem = checkboxContainer.closest('[role="treeitem"]');
            this.toggleCheckbox(treeItem);
            this.setFocus(treeItem);
            return;
        }

        // Handle click on tree node content (for expand/focus)
        const treeNodeContent = target.closest('.tree-node-content');
        if (treeNodeContent && !target.closest('.checkbox-container')) {
            const treeItem = treeNodeContent.closest('[role="treeitem"]');
            const hasChildren = treeItem.querySelector('.tree-children');
            
            if (hasChildren) {
                this.toggleExpand(treeItem);
            }
            this.setFocus(treeItem);
        }
    }

    /**
     * Handle keyboard navigation following WAI-ARIA Tree View Pattern
     * https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
     */
    handleKeydown(e) {
        const treeItem = e.target.closest('[role="treeitem"]');
        if (!treeItem) return;

        const key = e.key;
        let handled = true;

        switch (key) {
            case 'ArrowDown':
                this.focusNextItem(treeItem);
                break;
            case 'ArrowUp':
                this.focusPreviousItem(treeItem);
                break;
            case 'ArrowRight':
                this.handleArrowRight(treeItem);
                break;
            case 'ArrowLeft':
                this.handleArrowLeft(treeItem);
                break;
            case 'Home':
                this.focusFirstItem();
                break;
            case 'End':
                this.focusLastItem();
                break;
            case ' ':
                // Space toggles checkbox
                this.toggleCheckbox(treeItem);
                break;
            case 'Enter':
                // Enter toggles expand for parents, checkbox for children
                const hasChildren = treeItem.querySelector('.tree-children');
                if (hasChildren) {
                    this.toggleExpand(treeItem);
                } else {
                    this.toggleCheckbox(treeItem);
                }
                break;
            case '*':
                // Expand all siblings
                this.expandAllSiblings(treeItem);
                break;
            default:
                // Type-ahead: focus item starting with typed character
                if (key.length === 1 && key.match(/[a-z]/i)) {
                    this.focusItemStartingWith(key, treeItem);
                } else {
                    handled = false;
                }
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    /**
     * Toggle checkbox state with proper tri-state behavior
     * Best Practice: Clicking indeterminate checkbox selects all children
     */
    toggleCheckbox(treeItem) {
        const checkbox = treeItem.querySelector(':scope > .tree-node-content .tree-checkbox');
        const checkboxContainer = treeItem.querySelector(':scope > .tree-node-content .checkbox-container');
        const isParent = checkbox.dataset.type === 'parent';
        const categoryId = checkbox.dataset.category;
        
        if (isParent) {
            // Get current state
            const currentState = checkboxContainer.dataset.state;
            
            // Tri-state behavior:
            // unchecked -> checked (select all)
            // indeterminate -> checked (select all) - Best practice!
            // checked -> unchecked (deselect all)
            const newState = currentState === 'checked' ? false : true;
            
            // Update all children
            const childItems = treeItem.querySelectorAll('.tree-children [role="treeitem"]');
            childItems.forEach(childItem => {
                const childCheckbox = childItem.querySelector('.tree-checkbox');
                const childContainer = childItem.querySelector('.checkbox-container');
                
                childCheckbox.checked = newState;
                childContainer.dataset.state = newState ? 'checked' : 'unchecked';
                childItem.setAttribute('aria-checked', newState ? 'true' : 'false');
                
                // Update data
                const toolId = childCheckbox.dataset.tool;
                this.updateToolData(categoryId, toolId, newState);
            });
            
            // Update parent
            checkbox.checked = newState;
            checkbox.indeterminate = false;
            checkboxContainer.dataset.state = newState ? 'checked' : 'unchecked';
            treeItem.setAttribute('aria-checked', newState ? 'true' : 'false');
            
        } else {
            // Child toggle
            const newState = !checkbox.checked;
            checkbox.checked = newState;
            checkboxContainer.dataset.state = newState ? 'checked' : 'unchecked';
            treeItem.setAttribute('aria-checked', newState ? 'true' : 'false');
            
            const toolId = checkbox.dataset.tool;
            this.updateToolData(categoryId, toolId, newState);
            
            // Update parent state
            this.updateParentState(categoryId);
        }
        
        this.updateCategoryCount(categoryId);
        this.updateTotalCount();
        
        // Announce change to screen readers
        this.announceChange(treeItem, checkbox.checked);
    }

    /**
     * Update data model
     */
    updateToolData(categoryId, toolId, enabled) {
        const category = this.data.find(c => c.id === categoryId);
        if (category) {
            const tool = category.tools.find(t => t.id === toolId);
            if (tool) {
                tool.enabled = enabled;
            }
        }
    }

    /**
     * Update parent checkbox state based on children
     * Best Practice: Use indeterminate state when partially selected
     */
    updateParentState(categoryId) {
        const parentItem = this.container.querySelector(`[data-category-id="${categoryId}"][aria-level="1"]`);
        if (!parentItem) return;

        const parentCheckbox = parentItem.querySelector(':scope > .tree-node-content .tree-checkbox');
        const parentContainer = parentItem.querySelector(':scope > .tree-node-content .checkbox-container');
        const childCheckboxes = parentItem.querySelectorAll('.tree-children .tree-checkbox');
        
        const checkedCount = Array.from(childCheckboxes).filter(cb => cb.checked).length;
        const totalCount = childCheckboxes.length;
        
        const state = this.getCheckState(checkedCount, totalCount);
        
        parentCheckbox.checked = state === 'checked';
        parentCheckbox.indeterminate = state === 'indeterminate';
        parentContainer.dataset.state = state;
        
        const ariaChecked = state === 'indeterminate' ? 'mixed' : (state === 'checked' ? 'true' : 'false');
        parentItem.setAttribute('aria-checked', ariaChecked);
    }

    /**
     * Update visual state of parent checkbox
     */
    updateParentCheckboxVisual(categoryId) {
        const category = this.data.find(c => c.id === categoryId);
        if (!category) return;

        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;
        const state = this.getCheckState(enabledCount, totalCount);

        const parentItem = this.container.querySelector(`[data-category-id="${categoryId}"][aria-level="1"]`);
        if (!parentItem) return;

        const parentCheckbox = parentItem.querySelector(':scope > .tree-node-content .tree-checkbox');
        const parentContainer = parentItem.querySelector(':scope > .tree-node-content .checkbox-container');

        parentCheckbox.checked = state === 'checked';
        parentCheckbox.indeterminate = state === 'indeterminate';
        parentContainer.dataset.state = state;
    }

    /**
     * Toggle expand/collapse state
     */
    toggleExpand(treeItem) {
        const isExpanded = treeItem.getAttribute('aria-expanded') === 'true';
        treeItem.setAttribute('aria-expanded', !isExpanded);
    }

    /**
     * Focus management methods
     * Best Practice: Roving tabindex pattern - only one item is tabbable
     */
    setFocus(treeItem) {
        if (!treeItem) return;
        
        // Remove tabindex from all items
        this.treeItems.forEach(item => item.setAttribute('tabindex', '-1'));
        
        // Set focus on target item
        treeItem.setAttribute('tabindex', '0');
        treeItem.focus();
        this.focusedItem = treeItem;
    }

    /**
     * Get visible (not hidden by collapsed parent or search) items
     */
    getVisibleItems() {
        return this.treeItems.filter(item => {
            // Check if item is hidden
            if (item.style.display === 'none') return false;
            
            // Check if any ancestor is collapsed
            const level = parseInt(item.getAttribute('aria-level'));
            if (level > 1) {
                const parent = item.closest('.tree-category');
                if (parent && parent.getAttribute('aria-expanded') !== 'true') {
                    return false;
                }
            }
            return true;
        });
    }

    focusNextItem(currentItem) {
        const visibleItems = this.getVisibleItems();
        const currentIndex = visibleItems.indexOf(currentItem);
        if (currentIndex < visibleItems.length - 1) {
            this.setFocus(visibleItems[currentIndex + 1]);
        }
    }

    focusPreviousItem(currentItem) {
        const visibleItems = this.getVisibleItems();
        const currentIndex = visibleItems.indexOf(currentItem);
        if (currentIndex > 0) {
            this.setFocus(visibleItems[currentIndex - 1]);
        }
    }

    focusFirstItem() {
        const visibleItems = this.getVisibleItems();
        if (visibleItems.length > 0) {
            this.setFocus(visibleItems[0]);
        }
    }

    focusLastItem() {
        const visibleItems = this.getVisibleItems();
        if (visibleItems.length > 0) {
            this.setFocus(visibleItems[visibleItems.length - 1]);
        }
    }

    /**
     * Arrow Right: If parent is closed, open it. If open, focus first child.
     */
    handleArrowRight(treeItem) {
        const hasChildren = treeItem.querySelector('.tree-children');
        if (!hasChildren) return;
        
        const isExpanded = treeItem.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
            treeItem.setAttribute('aria-expanded', 'true');
            // Refresh visible items cache
            this.treeItems = Array.from(this.container.querySelectorAll('[role="treeitem"]'));
        } else {
            const firstChild = treeItem.querySelector('.tree-children > [role="treeitem"]');
            if (firstChild) {
                this.setFocus(firstChild);
            }
        }
    }

    /**
     * Arrow Left: If child or expanded parent, close/move to parent
     */
    handleArrowLeft(treeItem) {
        const hasChildren = treeItem.querySelector('.tree-children');
        const isExpanded = treeItem.getAttribute('aria-expanded') === 'true';
        
        if (hasChildren && isExpanded) {
            treeItem.setAttribute('aria-expanded', 'false');
        } else {
            // Move focus to parent
            const level = parseInt(treeItem.getAttribute('aria-level'));
            if (level > 1) {
                const parent = treeItem.closest('.tree-category');
                if (parent) {
                    this.setFocus(parent);
                }
            }
        }
    }

    /**
     * Expand all sibling nodes (when * is pressed)
     */
    expandAllSiblings(treeItem) {
        const parent = treeItem.parentElement;
        const siblings = parent.querySelectorAll(':scope > [role="treeitem"]');
        siblings.forEach(sibling => {
            if (sibling.querySelector('.tree-children')) {
                sibling.setAttribute('aria-expanded', 'true');
            }
        });
        // Refresh visible items cache
        this.treeItems = Array.from(this.container.querySelectorAll('[role="treeitem"]'));
    }

    /**
     * Type-ahead: Focus item starting with typed character
     */
    focusItemStartingWith(char, currentItem) {
        const visibleItems = this.getVisibleItems();
        const currentIndex = visibleItems.indexOf(currentItem);
        const searchChar = char.toLowerCase();
        
        // Search from current position wrapping around
        for (let i = 1; i <= visibleItems.length; i++) {
            const index = (currentIndex + i) % visibleItems.length;
            const item = visibleItems[index];
            const label = item.querySelector('.tree-label');
            if (label && label.textContent.toLowerCase().startsWith(searchChar)) {
                this.setFocus(item);
                return;
            }
        }
    }

    /**
     * Announce change to screen readers
     */
    announceChange(treeItem, isChecked) {
        const label = treeItem.querySelector('.tree-label')?.textContent || 'Item';
        const status = isChecked ? 'selected' : 'deselected';
        
        // Use aria-live region
        let announcer = document.getElementById('sr-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'sr-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'visually-hidden';
            document.body.appendChild(announcer);
        }
        announcer.textContent = `${label} ${status}`;
    }

    /**
     * Update category count display
     */
    updateCategoryCount(categoryId) {
        const category = this.data.find(c => c.id === categoryId);
        if (!category) return;

        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;

        const parentItem = this.container.querySelector(`[data-category-id="${categoryId}"][aria-level="1"]`);
        if (parentItem) {
            const countSpan = parentItem.querySelector('.tree-count');
            countSpan.textContent = `${enabledCount}/${totalCount} tools enabled`;
        }
    }

    /**
     * Update total tools count
     */
    updateTotalCount() {
        let totalEnabled = 0;
        let totalTools = 0;

        this.data.forEach(category => {
            totalTools += category.tools.length;
            totalEnabled += category.tools.filter(t => t.enabled).length;
        });

        const enabledEl = document.getElementById('total-enabled');
        const totalEl = document.getElementById('total-tools');
        
        if (enabledEl) enabledEl.textContent = totalEnabled;
        if (totalEl) totalEl.textContent = totalTools;
    }

    /**
     * Search/filter functionality
     */
    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        this.data.forEach(category => {
            const categoryItem = this.container.querySelector(`[data-category-id="${category.id}"][aria-level="1"]`);
            if (!categoryItem) return;

            const categoryName = category.name.toLowerCase();
            let hasVisibleTools = false;
            
            category.tools.forEach(tool => {
                const toolItem = this.container.querySelector(`[data-tool-id="${tool.id}"]`);
                if (!toolItem) return;

                const toolName = tool.name.toLowerCase();
                const toolDesc = tool.description.toLowerCase();
                
                const isMatch = term === '' || 
                                toolName.includes(term) || 
                                toolDesc.includes(term);
                
                toolItem.style.display = isMatch ? '' : 'none';
                if (isMatch) hasVisibleTools = true;
            });

            const categoryMatch = term === '' || categoryName.includes(term);
            categoryItem.style.display = (categoryMatch || hasVisibleTools) ? '' : 'none';
            
            // Auto-expand categories with matching tools
            if (term !== '' && hasVisibleTools) {
                categoryItem.setAttribute('aria-expanded', 'true');
            }
        });

        // Refresh cached items
        this.treeItems = Array.from(this.container.querySelectorAll('[role="treeitem"]'));
    }

    /**
     * Public API methods
     */
    selectAll() {
        this.data.forEach(category => {
            category.tools.forEach(tool => tool.enabled = true);
        });
        this.render();
        this.updateTotalCount();
    }

    deselectAll() {
        this.data.forEach(category => {
            category.tools.forEach(tool => tool.enabled = false);
        });
        this.render();
        this.updateTotalCount();
    }

    getSelectedTools() {
        const selected = [];
        this.data.forEach(category => {
            category.tools.forEach(tool => {
                if (tool.enabled) {
                    selected.push({ 
                        categoryId: category.id, 
                        categoryName: category.name,
                        toolId: tool.id, 
                        toolName: tool.name 
                    });
                }
            });
        });
        return selected;
    }

    expandAll() {
        this.container.querySelectorAll('[aria-expanded]').forEach(item => {
            item.setAttribute('aria-expanded', 'true');
        });
        this.treeItems = Array.from(this.container.querySelectorAll('[role="treeitem"]'));
    }

    collapseAll() {
        this.container.querySelectorAll('[aria-expanded]').forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.toolsTree = new TreeCheckbox('tools-tree', toolsData);
});
