/**
 * Tree View with Connector Lines
 * Traditional nested tree with visual hierarchy
 */

const toolsData = [
    {
        id: 'azure-operations',
        name: 'Azure operations',
        tools: [
            { id: 'azure-1', name: 'Resource provisioning', description: 'Create and configure Azure resources using ARM templates', enabled: true },
            { id: 'azure-2', name: 'Virtual machine management', description: 'Start, stop, resize, and manage Azure VMs', enabled: true },
            { id: 'azure-3', name: 'Network configuration', description: 'Configure VNets, subnets, and network security groups', enabled: true },
            { id: 'azure-4', name: 'Storage management', description: 'Manage blob, file, and queue storage accounts', enabled: true },
            { id: 'azure-5', name: 'Identity management', description: 'Configure Azure AD users, groups, and service principals', enabled: true }
        ]
    },
    {
        id: 'code-analysis',
        name: 'Code analysis',
        tools: [
            { id: 'code-1', name: 'Static code analysis', description: 'Analyze source code for bugs and code smells', enabled: true },
            { id: 'code-2', name: 'Dependency scanning', description: 'Scan dependencies for known vulnerabilities', enabled: false },
            { id: 'code-3', name: 'Code quality metrics', description: 'Calculate cyclomatic complexity and maintainability index', enabled: true }
        ]
    },
    {
        id: 'devops',
        name: 'DevOps',
        tools: [
            { id: 'devops-1', name: 'Pipeline management', description: 'Create and manage CI/CD pipelines', enabled: true },
            { id: 'devops-2', name: 'Build automation', description: 'Configure automated build triggers and tasks', enabled: true },
            { id: 'devops-3', name: 'Release management', description: 'Manage deployment stages and approvals', enabled: true },
            { id: 'devops-4', name: 'Artifact management', description: 'Store and version build artifacts and packages', enabled: true },
            { id: 'devops-5', name: 'Test automation', description: 'Run automated tests as part of the pipeline', enabled: true }
        ]
    },
    {
        id: 'diagnostics',
        name: 'Diagnostics',
        tools: [
            { id: 'diag-1', name: 'Log analytics', description: 'Query and analyze logs from Azure resources', enabled: true },
            { id: 'diag-2', name: 'Metric collection', description: 'Collect and visualize performance metrics', enabled: true }
        ]
    },
    {
        id: 'knowledge-base',
        name: 'Knowledge base',
        tools: [
            { id: 'kb-1', name: 'Documentation search', description: 'Search official Azure documentation', enabled: true },
            { id: 'kb-2', name: 'Best practices', description: 'Access Azure Well-Architected Framework guidance', enabled: true },
            { id: 'kb-3', name: 'Architecture patterns', description: 'Browse reference architectures and design patterns', enabled: true },
            { id: 'kb-4', name: 'Troubleshooting guides', description: 'Find solutions for common Azure issues', enabled: true },
            { id: 'kb-5', name: 'API reference', description: 'Access Azure REST API and SDK documentation', enabled: true }
        ]
    },
    {
        id: 'monitoring',
        name: 'Monitoring',
        tools: [
            { id: 'mon-1', name: 'Alert management', description: 'Configure and manage Azure Monitor alerts', enabled: true },
            { id: 'mon-2', name: 'Application insights', description: 'Monitor application performance and usage', enabled: true },
            { id: 'mon-3', name: 'Health checks', description: 'Monitor resource health and availability', enabled: false },
            { id: 'mon-4', name: 'Cost analysis', description: 'Analyze Azure spending and usage trends', enabled: true },
            { id: 'mon-5', name: 'Budget alerts', description: 'Set up spending thresholds and notifications', enabled: true }
        ]
    },
    {
        id: 'security',
        name: 'Security',
        tools: [
            { id: 'sec-1', name: 'Security center', description: 'View security recommendations and secure score', enabled: true },
            { id: 'sec-2', name: 'Compliance check', description: 'Assess compliance with regulatory standards', enabled: true },
            { id: 'sec-3', name: 'Vulnerability scanning', description: 'Scan resources for security vulnerabilities', enabled: true },
            { id: 'sec-4', name: 'Access reviews', description: 'Review and audit user access permissions', enabled: true },
            { id: 'sec-5', name: 'Threat detection', description: 'Detect and respond to security threats', enabled: true }
        ]
    }
];

class TreeView {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.focusedNode = null;
        this.allNodes = [];
        
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.updateTotals();
    }

    render() {
        const html = this.data.map((category, idx, arr) => 
            this.renderCategory(category, idx === arr.length - 1)
        ).join('');
        
        this.container.innerHTML = html;
        this.allNodes = Array.from(this.container.querySelectorAll('.tree-node'));
        
        // Update parent states
        this.data.forEach(cat => this.updateParentState(cat.id));
    }

    renderCategory(category, isLast) {
        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;
        const checkState = this.getCheckState(enabledCount, totalCount);

        return `
            <div class="tree-node" 
                 role="treeitem"
                 aria-expanded="false"
                 aria-checked="${this.ariaChecked(checkState)}"
                 data-level="1"
                 data-category-id="${category.id}"
                 data-is-last="${isLast}"
                 tabindex="${this.allNodes.length === 0 ? '0' : '-1'}">
                <div class="tree-row">
                    <button class="tree-toggle" type="button" aria-label="Toggle ${category.name}">
                        <svg viewBox="0 0 12 12"><path d="M4 1l5 5-5 5V1z"/></svg>
                    </button>
                    ${this.renderCheckbox(category.id, 'parent', checkState)}
                    <span class="tree-label">${category.name}</span>
                    <span class="tree-badge">${enabledCount}/${totalCount}</span>
                </div>
                <div class="tree-children" role="group">
                    ${category.tools.map((tool, idx, arr) => 
                        this.renderTool(tool, category.id, idx === arr.length - 1, isLast)
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderTool(tool, categoryId, isLast, parentIsLast) {
        const checkState = tool.enabled ? 'checked' : 'unchecked';

        return `
            <div class="tree-node"
                 role="treeitem"
                 aria-checked="${tool.enabled}"
                 data-level="2"
                 data-tool-id="${tool.id}"
                 data-category-id="${categoryId}"
                 data-is-last="${isLast}"
                 tabindex="-1">
                <div class="tree-row">
                    <span class="tree-guide ${isLast ? 'is-last' : ''}"></span>
                    ${this.renderCheckbox(tool.id, 'child', checkState, categoryId)}
                    <div class="tree-icon tool">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                        </svg>
                    </div>
                    <div class="tree-label-group">
                        <span class="tree-label">${tool.name}</span>
                        <span class="tree-description">${tool.description}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderCheckbox(id, type, state, categoryId = '') {
        return `
            <div class="tree-checkbox" data-state="${state}">
                <input type="checkbox" 
                       data-id="${id}"
                       data-type="${type}"
                       data-category="${categoryId || id}"
                       ${state === 'checked' ? 'checked' : ''}>
                <span class="checkbox-visual">
                    <svg class="checkmark" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5"/>
                    </svg>
                    <svg class="indeterminate" viewBox="0 0 12 12">
                        <path d="M2.5 6h7"/>
                    </svg>
                </span>
            </div>
        `;
    }

    getCheckState(checked, total) {
        if (checked === 0) return 'unchecked';
        if (checked === total) return 'checked';
        return 'indeterminate';
    }

    ariaChecked(state) {
        if (state === 'indeterminate') return 'mixed';
        return state === 'checked' ? 'true' : 'false';
    }

    bindEvents() {
        // Click delegation
        this.container.addEventListener('click', (e) => this.handleClick(e));
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let timeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.handleSearch(e.target.value), 150);
            });
        }

        // Expand/Collapse all buttons
        document.getElementById('expand-all')?.addEventListener('click', () => this.expandAll());
        document.getElementById('collapse-all')?.addEventListener('click', () => this.collapseAll());
    }

    handleClick(e) {
        const toggle = e.target.closest('.tree-toggle');
        if (toggle) {
            e.preventDefault();
            const node = toggle.closest('.tree-node');
            this.toggleExpand(node);
            this.setFocus(node);
            return;
        }

        const checkbox = e.target.closest('.tree-checkbox');
        if (checkbox) {
            e.preventDefault();
            e.stopPropagation();
            const node = checkbox.closest('.tree-node');
            this.toggleCheck(node);
            this.setFocus(node);
            return;
        }

        const row = e.target.closest('.tree-row');
        if (row) {
            const node = row.closest('.tree-node');
            const level = node.dataset.level;
            if (level === '1') {
                this.toggleExpand(node);
            }
            this.setFocus(node);
        }
    }

    handleKeydown(e) {
        const node = e.target.closest('.tree-node');
        if (!node) return;

        let handled = true;

        switch (e.key) {
            case 'ArrowDown':
                this.focusNext(node);
                break;
            case 'ArrowUp':
                this.focusPrev(node);
                break;
            case 'ArrowRight':
                if (node.dataset.level === '1') {
                    if (node.getAttribute('aria-expanded') === 'true') {
                        this.focusFirstChild(node);
                    } else {
                        this.toggleExpand(node);
                    }
                }
                break;
            case 'ArrowLeft':
                if (node.dataset.level === '1') {
                    if (node.getAttribute('aria-expanded') === 'true') {
                        this.toggleExpand(node);
                    }
                } else {
                    this.focusParent(node);
                }
                break;
            case ' ':
                this.toggleCheck(node);
                break;
            case 'Enter':
                if (node.dataset.level === '1') {
                    this.toggleExpand(node);
                } else {
                    this.toggleCheck(node);
                }
                break;
            case 'Home':
                this.focusFirst();
                break;
            case 'End':
                this.focusLast();
                break;
            default:
                handled = false;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    toggleExpand(node) {
        const isExpanded = node.getAttribute('aria-expanded') === 'true';
        node.setAttribute('aria-expanded', !isExpanded);
        this.allNodes = Array.from(this.container.querySelectorAll('.tree-node'));
    }

    toggleCheck(node) {
        const checkbox = node.querySelector(':scope > .tree-row .tree-checkbox input');
        const checkboxContainer = node.querySelector(':scope > .tree-row .tree-checkbox');
        const type = checkbox.dataset.type;
        const categoryId = checkbox.dataset.category;

        if (type === 'parent') {
            const currentState = checkboxContainer.dataset.state;
            const newState = currentState !== 'checked';

            // Update all children
            const children = node.querySelectorAll('.tree-children .tree-node');
            children.forEach(child => {
                const childCb = child.querySelector('.tree-checkbox input');
                const childContainer = child.querySelector('.tree-checkbox');
                childCb.checked = newState;
                childContainer.dataset.state = newState ? 'checked' : 'unchecked';
                child.setAttribute('aria-checked', newState);

                // Update data
                const toolId = childCb.dataset.id;
                this.updateToolData(categoryId, toolId, newState);
            });

            // Update parent visual
            checkbox.checked = newState;
            checkbox.indeterminate = false;
            checkboxContainer.dataset.state = newState ? 'checked' : 'unchecked';
            node.setAttribute('aria-checked', newState);
        } else {
            // Child toggle - use data-state since checkbox.checked may already be toggled by browser
            const currentState = checkboxContainer.dataset.state;
            const newState = currentState !== 'checked';
            checkbox.checked = newState;
            checkboxContainer.dataset.state = newState ? 'checked' : 'unchecked';
            node.setAttribute('aria-checked', newState);

            const toolId = checkbox.dataset.id;
            this.updateToolData(categoryId, toolId, newState);

            this.updateParentState(categoryId);
        }

        this.updateCategoryBadge(categoryId);
        this.updateTotals();
    }

    updateToolData(categoryId, toolId, enabled) {
        const category = this.data.find(c => c.id === categoryId);
        if (category) {
            const tool = category.tools.find(t => t.id === toolId);
            if (tool) tool.enabled = enabled;
        }
    }

    updateParentState(categoryId) {
        const category = this.data.find(c => c.id === categoryId);
        if (!category) return;

        const parentNode = this.container.querySelector(`[data-category-id="${categoryId}"][data-level="1"]`);
        if (!parentNode) return;

        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;
        const state = this.getCheckState(enabledCount, totalCount);

        const checkbox = parentNode.querySelector(':scope > .tree-row .tree-checkbox input');
        const container = parentNode.querySelector(':scope > .tree-row .tree-checkbox');

        checkbox.checked = state === 'checked';
        checkbox.indeterminate = state === 'indeterminate';
        container.dataset.state = state;
        parentNode.setAttribute('aria-checked', this.ariaChecked(state));
    }

    updateCategoryBadge(categoryId) {
        const category = this.data.find(c => c.id === categoryId);
        if (!category) return;

        const parentNode = this.container.querySelector(`[data-category-id="${categoryId}"][data-level="1"]`);
        if (!parentNode) return;

        const enabledCount = category.tools.filter(t => t.enabled).length;
        const totalCount = category.tools.length;
        const badge = parentNode.querySelector('.tree-badge');
        if (badge) badge.textContent = `${enabledCount}/${totalCount}`;
    }

    updateTotals() {
        let totalEnabled = 0;
        let totalTools = 0;

        this.data.forEach(category => {
            totalTools += category.tools.length;
            totalEnabled += category.tools.filter(t => t.enabled).length;
        });

        document.getElementById('total-enabled').textContent = totalEnabled;
        document.getElementById('total-tools').textContent = totalTools;
    }

    // Focus management
    setFocus(node) {
        this.allNodes.forEach(n => n.setAttribute('tabindex', '-1'));
        node.setAttribute('tabindex', '0');
        node.focus();
        this.focusedNode = node;
    }

    getVisibleNodes() {
        return this.allNodes.filter(node => {
            if (node.style.display === 'none') return false;
            if (node.dataset.level === '2') {
                const parent = node.closest('[data-level="1"]');
                if (parent && parent.getAttribute('aria-expanded') !== 'true') return false;
            }
            return true;
        });
    }

    focusNext(currentNode) {
        const visible = this.getVisibleNodes();
        const idx = visible.indexOf(currentNode);
        if (idx < visible.length - 1) {
            this.setFocus(visible[idx + 1]);
        }
    }

    focusPrev(currentNode) {
        const visible = this.getVisibleNodes();
        const idx = visible.indexOf(currentNode);
        if (idx > 0) {
            this.setFocus(visible[idx - 1]);
        }
    }

    focusFirst() {
        const visible = this.getVisibleNodes();
        if (visible.length > 0) this.setFocus(visible[0]);
    }

    focusLast() {
        const visible = this.getVisibleNodes();
        if (visible.length > 0) this.setFocus(visible[visible.length - 1]);
    }

    focusFirstChild(parentNode) {
        const firstChild = parentNode.querySelector('.tree-children > .tree-node');
        if (firstChild) this.setFocus(firstChild);
    }

    focusParent(childNode) {
        const parent = childNode.closest('[data-level="1"]');
        if (parent) this.setFocus(parent);
    }

    expandAll() {
        this.container.querySelectorAll('[data-level="1"]').forEach(node => {
            node.setAttribute('aria-expanded', 'true');
        });
        this.allNodes = Array.from(this.container.querySelectorAll('.tree-node'));
    }

    collapseAll() {
        this.container.querySelectorAll('[data-level="1"]').forEach(node => {
            node.setAttribute('aria-expanded', 'false');
        });
    }

    handleSearch(term) {
        const searchTerm = term.toLowerCase().trim();

        this.data.forEach(category => {
            const catNode = this.container.querySelector(`[data-category-id="${category.id}"][data-level="1"]`);
            if (!catNode) return;

            const catMatch = category.name.toLowerCase().includes(searchTerm);
            let hasVisibleTools = false;

            category.tools.forEach(tool => {
                const toolNode = this.container.querySelector(`[data-tool-id="${tool.id}"]`);
                if (!toolNode) return;

                const toolMatch = searchTerm === '' || tool.name.toLowerCase().includes(searchTerm);
                toolNode.style.display = toolMatch ? '' : 'none';
                if (toolMatch) hasVisibleTools = true;
            });

            catNode.style.display = (searchTerm === '' || catMatch || hasVisibleTools) ? '' : 'none';

            if (searchTerm !== '' && hasVisibleTools) {
                catNode.setAttribute('aria-expanded', 'true');
            }
        });

        this.allNodes = Array.from(this.container.querySelectorAll('.tree-node'));
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.treeView = new TreeView('tools-tree', toolsData);
});
