// templates/common/styles.js
// 全局 CSS 样式（字符串）
export const styles = `
/* ========== 全局样式 ========== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    line-height: 1.5;
    position: relative;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
}

/* header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.4rem;
}

.logo-icon {
    background: #1e293b;
    color: #facc15;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

/* 登录按钮 / 用户下拉 */
.login-btn, .user-menu-btn {
    background: white;
    border: 1px solid #cbd5e1;
    padding: 0.5rem 1.2rem;
    border-radius: 40px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
}

.login-btn:hover, .user-menu-btn:hover {
    background: #f1f5f9;
}

.user-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
    padding: 0.5rem 0;
    min-width: 160px;
    z-index: 20;
    display: none;
}

.user-dropdown.show {
    display: block;
}

.dropdown-item {
    padding: 0.6rem 1.5rem;
    font-size: 0.95rem;
    color: #334155;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dropdown-item:hover {
    background: #f1f5f9;
}

.dropdown-item i {
    width: 20px;
    color: #64748b;
}

/* 登录悬浮窗 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    border-radius: 32px;
    max-width: 400px;
    width: 90%;
    padding: 2rem;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.modal-header h3 {
    font-size: 1.4rem;
}

.modal-close {
    background: #f1f5f9;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.modal-close:hover {
    background: #e2e8f0;
}

.input-group {
    margin-bottom: 1.2rem;
}

.input-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: #334155;
}

.input-group input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 60px;
    font-size: 1rem;
    outline: none;
    transition: 0.2s;
}

.input-group input:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 2px #e2e8f0;
}

.modal-btn {
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 60px;
    padding: 0.8rem;
    width: 100%;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 0.5rem;
}

.modal-btn:hover {
    background: #0f172a;
}

/* ========== 首页样式 ========== */
.tabs {
    display: flex;
    gap: 0.25rem;
    background: #e9eef2;
    padding: 0.25rem;
    border-radius: 40px;
    width: fit-content;
    margin-bottom: 2rem;
}

.tab-item {
    padding: 0.5rem 1.8rem;
    border-radius: 40px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    user-select: none;
}

.tab-item.active {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    color: #1e293b;
}

.search-section {
    margin-bottom: 2rem;
}

.search-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.search-box {
    flex: 1;
    display: flex;
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 60px;
    overflow: hidden;
    box-shadow: 0 4px 6px -2px rgba(0,0,0,0.02);
}

.mode-toggle-btn {
    background: transparent;
    border: none;
    border-right: 1px solid #cbd5e1;
    padding: 0 1.2rem 0 1.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;
}

.mode-toggle-btn i {
    font-size: 0.8rem;
    color: #64748b;
}

.mode-toggle-btn:hover {
    background-color: #f1f5f9;
}

.search-box input {
    flex: 1;
    border: none;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    outline: none;
    background: transparent;
}

.search-btn {
    background: #1e293b;
    color: white;
    border: none;
    width: 56px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: 0.2s;
}

.search-btn:hover {
    background: #0f172a;
}

/* 官网搜索结果卡片 - 滚动列表 */
.official-result-card {
    background: #fef9e7;
    border: 1px solid #fde68a;
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 20px rgba(251, 191, 36, 0.1);
}

.official-badge {
    background: #fbbf24;
    color: #0f172a;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.2rem 0.9rem;
    border-radius: 30px;
    letter-spacing: 0.3px;
    display: inline-block;
    margin-bottom: 0.6rem;
}

.official-results-list {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.5rem;
    position: relative;
}

.official-result-item {
    position: relative;
    overflow: hidden;
    background: #fef9e7;
    border-radius: 20px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    border: 1px solid #fde68a;
    transition: 0.2s;
}

.official-result-item:hover {
    border-color: #fbbf24;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
}

.official-result-item .card-bg-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 6rem;
    opacity: 0.08;
    z-index: 0;
    pointer-events: none;
    color: #1e293b;
    transform: rotate(-5deg);
}

.official-item-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.3rem;
    position: relative;
    z-index: 1;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.official-item-name {
    font-weight: 700;
    font-size: 1.1rem;
    color: #1e293b;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 40%;
    flex-shrink: 1;
}

.official-item-name:hover {
    text-decoration: underline;
    color: #2563eb;
}

.official-item-stats {
    display: flex;
    gap: 0.8rem;
    color: #475569;
    font-size: 0.85rem;
    flex-shrink: 0;
    margin-left: 0;
}

.official-item-lastupdate {
    color: #64748b;
    font-size: 0.8rem;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: auto;
}

.official-item-description {
    color: #475569;
    font-size: 0.9rem;
    margin: 0.3rem 0 0.5rem 0;
    position: relative;
    z-index: 1;
}

.official-item-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
}

.loading-indicator {
    text-align: center;
    padding: 0.8rem;
    color: #64748b;
    font-size: 0.9rem;
    background: rgba(255,255,255,0.5);
    border-radius: 40px;
    margin-top: 0.5rem;
}

/* 项目网格 */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.project-card {
    position: relative;
    overflow: hidden;
    background: white;
    border-radius: 24px;
    padding: 1.3rem 1.5rem 1.5rem 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    border: 1px solid #e2e8f0;
    transition: all 0.2s;
}

.project-card:hover {
    border-color: #94a3b8;
    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);
}

.card-bg-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 8rem;
    opacity: 0.08;
    z-index: 0;
    pointer-events: none;
    color: #1e293b;
    transform: rotate(-5deg);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.project-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    text-decoration: none;
    cursor: pointer;
    z-index: 2;
}

.project-name:hover {
    text-decoration: underline;
    color: #2563eb;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
}

.official-link-btn {
    background: #eef2ff;
    border: none;
    border-radius: 30px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1e4f8a;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1rem;
    text-decoration: none;
}

.official-link-btn:hover {
    background: #dbeafe;
    transform: scale(1.05);
}

.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
    font-size: 0.85rem;
    color: #475569;
    margin: 1rem 0 1.2rem 0;
    border-top: 1px dashed #e2e8f0;
    padding-top: 0.8rem;
    position: relative;
    z-index: 1;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.meta-item i {
    width: 16px;
    color: #64748b;
}

.action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
}

.btn-icon {
    background: #f1f5f9;
    border: none;
    border-radius: 40px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    transition: 0.2s;
    color: #1e293b;
}

.btn-icon i {
    font-size: 0.9rem;
}

.btn-icon:hover {
    background: #e2e8f0;
}

.btn-download {
    background: #e9f0ff;
    color: #1e4f8a;
}

.btn-download:hover {
    background: #d4e2fc;
}

.btn-release {
    background: #e6f7e6;
    color: #166534;
}

.btn-stream {
    background: #f1e6ff;
    color: #6b21a8;
}

.btn-stream i {
    color: #7e22ce;
}

.releases-group {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    flex-wrap: wrap;
}

/* 悬浮窗 (releases popup) - 关闭按钮绝对定位 */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background: white;
    border-radius: 32px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    padding: 2rem;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
    overflow-y: auto;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #f1f5f9;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1.2rem;
    z-index: 101;
}

.popup-close:hover {
    background: #e2e8f0;
}

.popup-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-right: 2rem;
    flex-wrap: wrap;
}

.popup-header h3 {
    font-size: 1.4rem;
    margin-right: auto;
}

.version-selector-sm {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border-radius: 40px;
    padding: 0.3rem 1rem 0.3rem 1.2rem;
    cursor: pointer;
    user-select: none;
    gap: 0.5rem;
    position: relative;
}

.version-selector-sm span {
    font-weight: 500;
}

.version-dropdown-sm {
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    z-index: 110;
    display: none;
    min-width: 130px;
}

.version-dropdown-sm.show {
    display: block;
}

.version-item-sm {
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    transition: background 0.2s;
}

.version-item-sm:hover {
    background: #f1f5f9;
}

.version-item-sm.current {
    background: #e9f0ff;
    font-weight: 600;
}

.popup-releases-list {
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 1rem;
}

.asset-row {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: white;
}

.asset-row:last-child {
    border-bottom: none;
}

.asset-name {
    flex: 1;
    font-weight: 500;
}

.asset-size {
    color: #64748b;
    font-size: 0.85rem;
    margin-right: 1rem;
}

/* 详情页面 */
.detail-view {
    background: white;
    border-radius: 28px;
    border: 1px solid #e2e8f0;
    padding: 2rem;
}

.detail-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.back-btn {
    background: #f1f5f9;
    border: none;
    border-radius: 40px;
    padding: 0.5rem 1.3rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.version-selector {
    position: relative;
    margin-left: auto;
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border-radius: 40px;
    padding: 0.3rem 1rem 0.3rem 1.2rem;
    cursor: pointer;
    user-select: none;
    gap: 0.5rem;
}

.version-selector span {
    font-weight: 500;
    color: #1e293b;
}

.version-selector i {
    font-size: 0.8rem;
    color: #64748b;
}

.version-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
    padding: 0.5rem 0;
    min-width: 140px;
    z-index: 20;
    display: none;
}

.version-dropdown.show {
    display: block;
}

.version-item {
    padding: 0.6rem 1.5rem;
    font-size: 0.95rem;
    color: #334155;
    cursor: pointer;
    transition: background 0.2s;
}

.version-item:hover {
    background: #f1f5f9;
}

.version-item.current {
    background: #e9f0ff;
    color: #1e4f8a;
    font-weight: 600;
}

.file-list, .releases-list {
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1.5rem;
}

.file-row, .release-row {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: white;
}

.file-row:last-child, .release-row:last-child {
    border-bottom: none;
}

.file-icon, .release-icon {
    width: 24px;
    color: #64748b;
    margin-right: 1rem;
}

.file-name {
    flex: 1;
    font-weight: 500;
}

.release-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.release-tag {
    font-weight: 600;
    color: #0f172a;
}

.release-date {
    font-size: 0.8rem;
    color: #64748b;
}

.release-download {
    display: flex;
    gap: 0.5rem;
}

.docker-tag-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.tag-row {
    display: flex;
    justify-content: space-between;
    background: #f8fafc;
    padding: 0.8rem 1.5rem;
    border-radius: 16px;
}

.section-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem 0;
}

.hide {
    display: none !important;
}

/* ========== 后台管理面板样式 ========== */
.admin-panel {
    display: none;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.back-home-btn {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 40px;
    padding: 0.5rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.2s;
}

.back-home-btn:hover {
    background: #e2e8f0;
}

.admin-panel .section-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #0f172a;
}

.admin-panel .card {
    background: white;
    border-radius: 24px;
    border: 1px solid #e2e8f0;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.admin-panel .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.admin-panel .card-header h2 {
    font-size: 1.2rem;
    font-weight: 600;
}

.admin-panel .search-box {
    max-width: 600px;
}

.admin-panel .mode-toggle {
    background: transparent;
    border: none;
    border-right: 1px solid #cbd5e1;
    padding: 0 1.2rem 0 1.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    white-space: nowrap;
}

.admin-panel .mode-toggle i {
    font-size: 0.8rem;
    color: #64748b;
}

.admin-panel .monitor-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin: 1rem 0;
}

.admin-panel .toggle-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.admin-panel .switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
}

.admin-panel .switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.admin-panel .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e1;
    transition: .3s;
    border-radius: 34px;
}

.admin-panel .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
}

.admin-panel input:checked + .slider {
    background-color: #1e293b;
}

.admin-panel input:checked + .slider:before {
    transform: translateX(24px);
}

.admin-panel .radio-group {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.admin-panel .radio-group label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
}

.admin-panel .custom-project-trigger {
    background: #f1f5f9;
    border: none;
    border-radius: 40px;
    padding: 0.4rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}

.admin-panel .days-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.admin-panel .days-input input {
    width: 70px;
    padding: 0.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 40px;
    text-align: center;
}

.admin-panel .json-editor {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 1rem;
    font-family: monospace;
    font-size: 0.9rem;
    margin: 1rem 0;
    white-space: pre-wrap;
}

.admin-panel .bucket-list {
    margin: 1.5rem 0;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
}

.admin-panel .bucket-item {
    display: grid;
    grid-template-columns: 1.5fr 1fr 2fr;
    align-items: center;
    padding: 0.8rem 1.2rem;
    border-bottom: 1px solid #e2e8f0;
    background: white;
    font-size: 0.9rem;
}

.admin-panel .bucket-item:last-child {
    border-bottom: none;
}

.admin-panel .bucket-item.header {
    background: #f8fafc;
    font-weight: 600;
    color: #475569;
}

.admin-panel .bucket-usage {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.admin-panel .progress {
    flex: 1;
    height: 8px;
    background: #e2e8f0;
    border-radius: 40px;
    overflow: hidden;
}

.admin-panel .progress-fill {
    height: 100%;
    background: #1e293b;
}

.admin-panel .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
}

.admin-panel .hostname-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
}

.admin-panel .hostname-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.admin-panel .hostname-input label {
    min-width: 150px;
    font-weight: 500;
}

.admin-panel .hostname-input input {
    flex: 1;
    padding: 0.7rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 60px;
    outline: none;
}

.admin-panel .project-list {
    max-height: 300px;
    overflow-y: auto;
    margin: 1rem 0;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 0.5rem;
}

.admin-panel .project-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
}

.admin-panel .project-item:hover {
    background: #f8fafc;
    border-radius: 40px;
}

/* 后台搜索结果区域 - 滚动容器 */
.search-result-area {
    margin-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
}

.search-results-scroll {
    max-height: 250px;
    overflow-y: auto;
    padding-right: 0.5rem;
}

.search-result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f8fafc;
    border-radius: 60px;
    padding: 0.6rem 1rem;
    margin-bottom: 0.8rem;
}

.bucket-select {
    background: white;
    border: 1px solid #cbd5e1;
    border-radius: 40px;
    padding: 0.3rem 1rem;
    margin: 0 0.5rem;
    outline: none;
}

.save-btn {
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 0.3rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
}

.save-btn:hover {
    background: #0f172a;
}

.loading-indicator {
    text-align: center;
    padding: 0.5rem;
    color: #64748b;
}
`;