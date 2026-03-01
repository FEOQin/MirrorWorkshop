// html.js
export function renderHomePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B2 镜像工坊 · 首页 + 后台管理</title>
    <!-- Font Awesome Icons (v6 free) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Google Font: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <style>
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
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo-area">
                <span class="logo-icon"><i class="fas fa-cloud"></i></span>
                <span>B2 镜像工坊</span>
            </div>
            <div id="loginContainer">
                <div class="login-btn" id="loginBtn">
                    <i class="fas fa-user-circle"></i> 登录
                </div>
            </div>
            <div id="userMenuContainer" class="hide">
                <div class="user-menu-btn" id="userMenuBtn">
                    <i class="fas fa-user-circle"></i> Admin <i class="fas fa-chevron-down"></i>
                    <div class="user-dropdown" id="userDropdown">
                        <div class="dropdown-item" id="goToAdmin"><i class="fas fa-cog"></i> 进入后台</div>
                        <div class="dropdown-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> 退出登录</div>
                    </div>
                </div>
            </div>
        </header>

        <div id="homeView">
            <div class="tabs" id="tabsContainer">
                <div class="tab-item active" data-tab="github">GitHub 项目</div>
                <div class="tab-item" data-tab="docker">Docker 镜像</div>
            </div>

            <div class="search-section">
                <div class="search-row">
                    <div class="search-box">
                        <button class="mode-toggle-btn" id="modeToggleBtn">
                            <span id="modeText">存储库</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <input type="text" id="homeSearchInput" placeholder="搜索项目名称 / 关键词...">
                        <button class="search-btn" id="homeSearchBtn"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>

            <div id="officialResultCard" class="official-result-card hide">
                <span class="official-badge"><i class="fas fa-globe"></i> 官网搜索 · <span id="officialBadgeText">GitHub</span></span>
                <div id="officialResultsList" class="official-results-list"></div>
            </div>

            <div id="githubGrid" class="projects-grid"></div>
            <div id="dockerGrid" class="projects-grid hide"></div>
        </div>

        <div id="detailView" class="detail-view hide"></div>

        <div id="adminPanel" class="admin-panel">
            <div class="admin-header">
                <h1 class="section-title">管理面板</h1>
                <div class="back-home-btn" id="backHomeBtn"><i class="fas fa-arrow-left"></i> 返回首页</div>
            </div>

            <div class="card">
                <div class="card-header"><h2>项目添加</h2></div>
                <div class="search-box" style="max-width: 600px;">
                    <button class="mode-toggle" id="addModeToggle">
                        <span id="addModeText">GitHub</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <input type="text" id="searchProjectInput" placeholder="搜索项目名称...">
                    <button class="search-btn" id="searchProjectBtn"><i class="fas fa-search"></i></button>
                </div>
                <div id="searchResultArea" class="search-result-area hide">
                    <h3 style="font-size:1rem; margin-bottom:1rem;">搜索结果：</h3>
                    <div id="searchResultsScroll" class="search-results-scroll">
                        <div id="searchResultList"></div>
                    </div>
                </div>
                <p style="color:#64748b; margin-top:0.5rem;">搜索后将项目保存到存储桶</p>
            </div>

            <div class="card">
                <div class="card-header"><h2>自动监控</h2></div>
                <div class="monitor-row">
                    <div class="toggle-switch">
                        <span>监控开关</span>
                        <label class="switch">
                            <input type="checkbox" id="monitorSwitch" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="radio-group">
                        <label><input type="radio" name="monitorScope" value="all" checked> 全部项目</label>
                        <label><input type="radio" name="monitorScope" value="custom"> 自定义项目</label>
                    </div>
                    <button class="custom-project-trigger" id="openCustomProject"><i class="fas fa-list"></i> 选择项目</button>
                </div>
                <div class="days-input">
                    <span>监控日期：每</span>
                    <input type="number" value="1" min="1" max="30"> 天一次
                </div>
            </div>

            <div class="card">
                <div class="card-header"><h2>Snippets 规则</h2></div>
                <div>
                    <div style="font-weight:500; margin-bottom:0.3rem;">自定义桶名对应桶值 (JSON)</div>
                    <div class="json-editor" id="bucketsJson"></div>
                    <div class="bucket-list" id="bucketList"></div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="addHostnameCheck"> 
                        <label for="addHostnameCheck">将 BUCKETS 值添加到存储桶自定义主机名</label>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header"><h2>自定义主机名</h2></div>
                <div class="hostname-row">
                    <div class="hostname-input">
                        <label>官网自定义主机名:</label>
                        <input type="text" id="officialHostname" placeholder="https://mirror.example.com" value="https://gh-mirror.example.com">
                    </div>
                    <div class="hostname-input">
                        <label>存储桶自定义主机名:</label>
                        <input type="text" id="bucketHostname" placeholder="https://b2-mirror.example.com" value="https://b2-mirror.example.com">
                    </div>
                    <p style="color:#475569; font-size:0.9rem;">设置后，相应卡片中的下载链接会替换为自定义主机名</p>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="loginModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>登录后台</h3>
                    <div class="modal-close" id="closeLoginModal"><i class="fas fa-times"></i></div>
                </div>
                <div class="input-group">
                    <label>账号</label>
                    <input type="text" placeholder="admin" id="username">
                </div>
                <div class="input-group">
                    <label>密码</label>
                    <input type="password" placeholder="******" id="password">
                </div>
                <button class="modal-btn" id="doLogin">登录</button>
            </div>
        </div>

        <div class="modal-overlay" id="customProjectModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>选择监控项目</h3>
                    <div class="modal-close" id="closeCustomModal"><i class="fas fa-times"></i></div>
                </div>
                <div class="project-list" id="customProjectList"></div>
                <button class="modal-btn" id="saveCustomProjects">确定</button>
            </div>
        </div>

        <div class="popup-overlay" id="releasesPopup">
            <div class="popup-content" id="popupContent">
                <div class="popup-close" id="popupClose"><i class="fas fa-times"></i></div>
                <div class="popup-header">
                    <h3 id="popupProjectName">项目名称</h3>
                    <div class="version-selector-sm" id="popupVersionSelector">
                        <span id="popupSelectedVersion">选择版本</span>
                        <i class="fas fa-chevron-down"></i>
                        <div class="version-dropdown-sm" id="popupVersionDropdown"></div>
                    </div>
                </div>
                <div id="popupReleasesList" class="popup-releases-list"></div>
            </div>
        </div>
    </div>

    <script>
        (async function() {
            const apiBase = '/api';
            let githubProjects = [], dockerProjects = [], buckets = [], config = {};
            let currentTab = 'github', searchMode = 'local';

            // 分页相关
            let officialCurrentPage = 1, officialTotal = 0, officialLoading = false, officialHasMore = true, officialQuery = '', officialType = 'github';
            let adminCurrentPage = 1, adminTotal = 0, adminLoading = false, adminHasMore = true, adminQuery = '', adminType = 'github';

            async function loadData() {
                try {
                    const [githubRes, dockerRes, bucketsRes, configRes] = await Promise.all([
                        fetch(apiBase + '/projects/github'),
                        fetch(apiBase + '/projects/docker'),
                        fetch(apiBase + '/buckets'),
                        fetch(apiBase + '/config')
                    ]);
                    githubProjects = await githubRes.json();
                    dockerProjects = await dockerRes.json();
                    buckets = await bucketsRes.json();
                    config = await configRes.json();
                    updateBucketsUI();
                    updateConfigUI();
                } catch (e) { console.error('加载数据失败', e); }
            }

            function updateBucketsUI() {
                const bucketsJson = document.getElementById('bucketsJson');
                bucketsJson.innerText = JSON.stringify(buckets.reduce((acc, b) => { acc[b.customName] = b.id; return acc; }, {}), null, 2);
                const bucketList = document.getElementById('bucketList');
                bucketList.innerHTML = buckets.map(b => \`
                    <div class="bucket-item">
                        <span>\${b.customName}</span>
                        <span><code>\${b.id}</code></span>
                        <div class="bucket-usage"><div class="progress"><div class="progress-fill" style="width:\${(b.usage/b.total*100).toFixed(1)}%"></div></div><span>\${b.usage} GB / \${b.total} GB</span></div>
                    </div>\`).join('');
            }
            function updateConfigUI() {
                document.getElementById('officialHostname').value = config.officialHostname;
                document.getElementById('bucketHostname').value = config.bucketHostname;
            }

            // 登录状态
            let isLoggedIn = false;
            const loginContainer = document.getElementById('loginContainer');
            const userMenuContainer = document.getElementById('userMenuContainer');
            const homeView = document.getElementById('homeView');
            const detailView = document.getElementById('detailView');
            const adminPanel = document.getElementById('adminPanel');
            const loginBtn = document.getElementById('loginBtn');
            const loginModal = document.getElementById('loginModal');
            const closeLoginModal = document.getElementById('closeLoginModal');
            const doLogin = document.getElementById('doLogin');
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userDropdown = document.getElementById('userDropdown');
            const goToAdmin = document.getElementById('goToAdmin');
            const logoutBtn = document.getElementById('logoutBtn');
            const backHomeBtn = document.getElementById('backHomeBtn');

            function setLoggedIn(status) {
                isLoggedIn = status;
                if (status) {
                    loginContainer.classList.add('hide');
                    userMenuContainer.classList.remove('hide');
                    homeView.classList.remove('hide');
                    detailView.classList.add('hide');
                    adminPanel.style.display = 'none';
                } else {
                    loginContainer.classList.remove('hide');
                    userMenuContainer.classList.add('hide');
                    homeView.classList.remove('hide');
                    detailView.classList.add('hide');
                    adminPanel.style.display = 'none';
                }
            }
            setLoggedIn(false);

            loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
            closeLoginModal.addEventListener('click', () => loginModal.style.display = 'none');
            loginModal.addEventListener('click', e => { if (e.target === loginModal) loginModal.style.display = 'none'; });
            doLogin.addEventListener('click', () => { loginModal.style.display = 'none'; setLoggedIn(true); });

            userMenuBtn.addEventListener('click', e => { e.stopPropagation(); userDropdown.classList.toggle('show'); });
            document.addEventListener('click', e => { if (!userMenuBtn.contains(e.target)) userDropdown.classList.remove('show'); });

            goToAdmin.addEventListener('click', () => {
                userDropdown.classList.remove('show');
                homeView.classList.add('hide');
                detailView.classList.add('hide');
                adminPanel.style.display = 'block';
            });
            backHomeBtn.addEventListener('click', () => {
                adminPanel.style.display = 'none';
                homeView.classList.remove('hide');
            });
            logoutBtn.addEventListener('click', () => { setLoggedIn(false); userDropdown.classList.remove('show'); });

            // 自定义项目模态框
            const openCustomProject = document.getElementById('openCustomProject');
            const customProjectModal = document.getElementById('customProjectModal');
            const closeCustomModal = document.getElementById('closeCustomModal');
            const saveCustomProjects = document.getElementById('saveCustomProjects');
            openCustomProject.addEventListener('click', () => {
                const list = document.getElementById('customProjectList');
                list.innerHTML = githubProjects.concat(dockerProjects).map(p => \`<div class="project-item"><input type="checkbox" value="\${p.name}"> \${p.name}</div>\`).join('');
                customProjectModal.style.display = 'flex';
            });
            closeCustomModal.addEventListener('click', () => customProjectModal.style.display = 'none');
            saveCustomProjects.addEventListener('click', () => { customProjectModal.style.display = 'none'; alert('已保存自定义项目选择（演示）'); });
            customProjectModal.addEventListener('click', e => { if (e.target === customProjectModal) customProjectModal.style.display = 'none'; });

            // 首页搜索模式切换
            const modeToggleBtn = document.getElementById('modeToggleBtn');
            const modeText = document.getElementById('modeText');
            const officialBadgeText = document.getElementById('officialBadgeText');
            function toggleSearchMode() {
                searchMode = searchMode === 'local' ? 'official' : 'local';
                modeText.innerText = searchMode === 'local' ? '存储库' : (currentTab === 'github' ? 'GitHub 搜索' : 'Docker 搜索');
                document.getElementById('officialResultCard').classList.add('hide');
            }
            modeToggleBtn.addEventListener('click', toggleSearchMode);

            // 官网搜索无限滚动
            const homeSearchBtn = document.getElementById('homeSearchBtn');
            const homeSearchInput = document.getElementById('homeSearchInput');
            const officialCard = document.getElementById('officialResultCard');
            const officialResultsList = document.getElementById('officialResultsList');

            async function loadOfficialResults(query, type, page) {
                if (officialLoading) return;
                
                // 移除可能残留的旧加载指示器
                const oldLoading = document.getElementById('official-loading-item');
                if (oldLoading) oldLoading.remove();

                officialLoading = true;
                const loadingItem = document.createElement('div');
                loadingItem.className = 'loading-indicator';
                loadingItem.id = 'official-loading-item';
                loadingItem.innerText = '加载中...';
                officialResultsList.appendChild(loadingItem);

                try {
                    const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}&type=\${type}&page=\${page}\`);
                    if (!res.ok) throw new Error('搜索失败');
                    const data = await res.json();
                    const newItems = data.items;
                    officialTotal = data.total;
                    officialHasMore = newItems.length === 10 && (page * 10) < officialTotal;

                    if (page === 1) officialResultsList.innerHTML = '';
                    else document.getElementById('official-loading-item')?.remove();

                    newItems.forEach(item => {
                        const isGitHub = item.type === 'github';
                        const bgIconClass = isGitHub ? 'fab fa-github' : 'fab fa-docker';
                        const releaseButton = item.has_releases ? \`<button class="btn-icon btn-release" data-project='\${JSON.stringify(item)}'><i class="fas fa-tag"></i> Releases</button>\` : '';
                        const itemHtml = \`
                            <div class="official-result-item" data-repo='\${JSON.stringify(item)}'>
                                <div class="card-bg-icon"><i class="\${bgIconClass}"></i></div>
                                <div class="official-item-header">
                                    <a href="\${item.homepage}" target="_blank" class="official-item-name">\${item.name}</a>
                                    <div class="official-item-stats">
                                        <span><i class="\${isGitHub ? 'fas fa-code-branch' : 'fas fa-download'}"></i> \${isGitHub ? (item.forks || 0) : (item.pulls || 0)}</span>
                                        <span><i class="far fa-star"></i> \${item.stars || 0}</span>
                                    </div>
                                    <span class="official-item-lastupdate"><i class="far fa-calendar-alt"></i> \${item.lastUpdate || '未知'}</span>
                                </div>
                                <div class="official-item-description">\${item.description}</div>
                                <div class="official-item-actions">
                                    <button class="btn-icon git-link-btn"><i class="far fa-copy"></i> Git链接</button>
                                    <button class="btn-icon btn-download"><i class="fas fa-file-zipper"></i> 下载ZIP</button>
                                    <button class="btn-icon btn-stream"><i class="fas fa-water"></i> 流式</button>
                                    \${releaseButton}
                                </div>
                            </div>
                        \`;
                        officialResultsList.insertAdjacentHTML('beforeend', itemHtml);
                    });

                    if (officialHasMore) {
                        const newLoadingItem = document.createElement('div');
                        newLoadingItem.className = 'loading-indicator hide';
                        newLoadingItem.id = 'official-loading-item';
                        newLoadingItem.innerText = '加载中...';
                        officialResultsList.appendChild(newLoadingItem);
                    }

                    // 绑定 Releases 按钮事件 - 获取完整资产
                    officialResultsList.querySelectorAll('.btn-release').forEach(btn => {
                        btn.addEventListener('click', async (e) => {
                            e.stopPropagation();
                            const proj = JSON.parse(e.target.dataset.project);
                            let releases = [];
                            if (proj.type === 'github') {
                                const url = \`https://api.github.com/repos/\${proj.owner}/\${proj.repo}/releases\`;
                                const res = await fetch(url, {
                                    headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'B2-Mirror-Worker' }
                                });
                                if (res.ok) {
                                    const data = await res.json();
                                    releases = data.map(r => ({
                                        tag: r.tag_name,
                                        date: r.published_at?.split('T')[0] || r.created_at?.split('T')[0],
                                        assets: r.assets.map(a => ({
                                            name: a.name,
                                            size: a.size,
                                            url: a.browser_download_url
                                        }))
                                    }));
                                }
                            } else {
                                const url = \`https://hub.docker.com/v2/repositories/library/\${proj.repo}/tags/?page_size=20\`;
                                const res = await fetch(url, {
                                    headers: { 'Accept': 'application/json', 'User-Agent': 'B2-Mirror-Worker' }
                                });
                                if (res.ok) {
                                    const data = await res.json();
                                    releases = data.results.map(t => ({
                                        tag: t.name,
                                        date: t.last_updated?.split('T')[0],
                                        assets: [] // Docker 无资产
                                    }));
                                }
                            }
                            // 构造版本数组（按日期排序，最新在前）
                            const versions = releases.map(r => ({
                                date: r.date || '未知',
                                releases: [r]
                            }));
                            showReleasesPopup(versions, proj.name, proj.type, 0, true);
                        });
                    });

                } catch (error) {
                    alert('搜索出错：' + error.message);
                } finally {
                    officialLoading = false;
                    const li = document.getElementById('official-loading-item');
                    if (li) li.classList.add('hide');
                }
            }

            officialResultsList.addEventListener('scroll', () => {
                if (!officialHasMore || officialLoading) return;
                const { scrollTop, scrollHeight, clientHeight } = officialResultsList;
                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    const li = document.getElementById('official-loading-item');
                    if (li) li.classList.remove('hide');
                    officialCurrentPage++;
                    loadOfficialResults(officialQuery, officialType, officialCurrentPage);
                }
            });

            homeSearchBtn.addEventListener('click', async () => {
                const query = homeSearchInput.value.trim();
                if (!query) { alert('请输入搜索关键词'); return; }
                if (searchMode === 'local') {
                    const allProjects = [...githubProjects, ...dockerProjects];
                    const results = allProjects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
                    if (results.length === 0) { alert('未找到本地项目'); return; }
                    officialResultsList.innerHTML = results.map(p => {
                        const type = p.homepage.includes('github') ? 'github' : 'docker';
                        const isGitHub = type === 'github';
                        const bgIconClass = isGitHub ? 'fab fa-github' : 'fab fa-docker';
                        const hasReleases = p.versions && p.versions.some(v => v.releases && v.releases.length > 0);
                        const releaseButton = hasReleases ? \`<button class="btn-icon btn-release" data-project='\${JSON.stringify(p)}'><i class="fas fa-tag"></i> Releases</button>\` : '';
                        return \`
                            <div class="official-result-item">
                                <div class="card-bg-icon"><i class="\${bgIconClass}"></i></div>
                                <div class="official-item-header">
                                    <a href="\${p.homepage}" target="_blank" class="official-item-name">\${p.name}</a>
                                    <div class="official-item-stats">
                                        <span><i class="\${isGitHub ? 'fas fa-code-branch' : 'fas fa-download'}"></i> 0</span>
                                        <span><i class="far fa-star"></i> 0</span>
                                    </div>
                                    <span class="official-item-lastupdate"><i class="far fa-calendar-alt"></i> \${p.lastUpdate}</span>
                                </div>
                                <div class="official-item-description">存储库项目</div>
                                <div class="official-item-actions">
                                    <button class="btn-icon git-link-btn"><i class="far fa-copy"></i> Git链接</button>
                                    <button class="btn-icon btn-download"><i class="fas fa-file-zipper"></i> 下载ZIP</button>
                                    <button class="btn-icon btn-stream"><i class="fas fa-water"></i> 流式</button>
                                    \${releaseButton}
                                </div>
                            </div>\`;
                    }).join('');
                    officialCard.classList.remove('hide');
                } else {
                    officialQuery = query;
                    officialType = currentTab === 'github' ? 'github' : 'docker';
                    officialCurrentPage = 1;
                    officialHasMore = true;
                    officialBadgeText.innerText = currentTab === 'github' ? 'GitHub' : 'Docker';
                    officialCard.classList.remove('hide');
                    await loadOfficialResults(officialQuery, officialType, 1);
                }
            });

            // 后台项目添加搜索无限滚动
            const addModeToggle = document.getElementById('addModeToggle');
            const addModeText = document.getElementById('addModeText');
            let addMode = 'GitHub';
            addModeToggle.addEventListener('click', () => {
                addMode = addMode === 'GitHub' ? 'Docker' : 'GitHub';
                addModeText.innerText = addMode;
            });

            const searchProjectBtn = document.getElementById('searchProjectBtn');
            const searchProjectInput = document.getElementById('searchProjectInput');
            const searchResultArea = document.getElementById('searchResultArea');
            const searchResultList = document.getElementById('searchResultList');
            const searchResultsScroll = document.getElementById('searchResultsScroll');

            async function loadAdminResults(query, type, page) {
                if (adminLoading) return;
                
                const oldLoading = document.getElementById('admin-loading-item');
                if (oldLoading) oldLoading.remove();

                adminLoading = true;
                const loadingItem = document.createElement('div');
                loadingItem.className = 'loading-indicator';
                loadingItem.id = 'admin-loading-item';
                loadingItem.innerText = '加载中...';
                searchResultsScroll.appendChild(loadingItem);

                try {
                    const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}&type=\${type}&page=\${page}\`);
                    if (!res.ok) throw new Error('搜索失败');
                    const data = await res.json();
                    const newItems = data.items;
                    adminTotal = data.total;
                    adminHasMore = newItems.length === 10 && (page * 10) < adminTotal;

                    if (page === 1) searchResultList.innerHTML = '';
                    else document.getElementById('admin-loading-item')?.remove();

                    newItems.forEach(item => {
                        const isGitHub = item.type === 'github';
                        const itemHtml = \`
                            <div class="search-result-item">
                                <span style="display: flex; align-items: center; gap: 0.5rem;">
                                    <i class="\${isGitHub ? 'fab fa-github' : 'fab fa-docker'}"></i>
                                    <strong>\${item.name}</strong>
                                    <span style="color:#64748b; font-size:0.8rem;">
                                        <i class="\${isGitHub ? 'fas fa-code-branch' : 'fas fa-download'}"></i> \${isGitHub ? item.forks : item.pulls}
                                        <i class="far fa-star"></i> \${item.stars}
                                    </span>
                                </span>
                                <div>
                                    <select class="bucket-select">
                                        \${buckets.map(b => '<option value="\${b.id}">\${b.customName}</option>').join('')}
                                    </select>
                                    <button class="save-btn" data-name="\${item.name}" data-type="\${item.type}">保存</button>
                                </div>
                            </div>\`;
                        searchResultList.insertAdjacentHTML('beforeend', itemHtml);
                    });

                    if (adminHasMore) {
                        const newLoadingItem = document.createElement('div');
                        newLoadingItem.className = 'loading-indicator hide';
                        newLoadingItem.id = 'admin-loading-item';
                        newLoadingItem.innerText = '加载中...';
                        searchResultsScroll.appendChild(newLoadingItem);
                    }

                    searchResultList.querySelectorAll('.save-btn').forEach(btn => {
                        btn.addEventListener('click', async (e) => {
                            const name = e.target.dataset.name;
                            const type = e.target.dataset.type;
                            const bucketId = e.target.parentElement.querySelector('.bucket-select').value;
                            const res = await fetch(apiBase + '/project', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ type, name, bucketId })
                            });
                            if (res.ok) {
                                alert(\`项目 \${name} 已保存到桶 \${bucketId}\`);
                                location.reload();
                            } else alert('保存失败');
                        });
                    });

                } catch (error) {
                    alert('搜索出错：' + error.message);
                } finally {
                    adminLoading = false;
                    const li = document.getElementById('admin-loading-item');
                    if (li) li.classList.add('hide');
                }
            }

            searchResultsScroll.addEventListener('scroll', () => {
                if (!adminHasMore || adminLoading) return;
                const { scrollTop, scrollHeight, clientHeight } = searchResultsScroll;
                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    const li = document.getElementById('admin-loading-item');
                    if (li) li.classList.remove('hide');
                    adminCurrentPage++;
                    loadAdminResults(adminQuery, adminType, adminCurrentPage);
                }
            });

            searchProjectBtn.addEventListener('click', async () => {
                const query = searchProjectInput.value.trim();
                if (!query) { alert('请输入搜索关键词'); return; }
                adminQuery = query;
                adminType = addMode === 'GitHub' ? 'github' : 'docker';
                adminCurrentPage = 1;
                adminHasMore = true;
                searchResultArea.classList.remove('hide');
                await loadAdminResults(adminQuery, adminType, 1);
            });

            document.getElementById('monitorSwitch').addEventListener('change', e => console.log('监控开关:', e.target.checked));

            // 首页项目渲染
            const githubGrid = document.getElementById('githubGrid');
            const dockerGrid = document.getElementById('dockerGrid');
            const tabs = document.querySelectorAll('.tab-item');

            function renderGrid() {
                githubGrid.innerHTML = '';
                dockerGrid.innerHTML = '';
                githubProjects.forEach(p => githubGrid.appendChild(createProjectCard(p, 'github')));
                dockerProjects.forEach(p => dockerGrid.appendChild(createProjectCard(p, 'docker')));
            }

            function createProjectCard(proj, type) {
                const card = document.createElement('div'); card.className = 'project-card';
                const isGitHub = type === 'github';
                const displayName = isGitHub ? proj.name : proj.name + (proj.versions[0].tags ? \`:\${proj.versions[0].tags[0]}\` : '');
                const hasAnyReleases = proj.versions.some(v => v.releases && v.releases.length > 0);
                const releasesButton = hasAnyReleases ? \`<div class="releases-group"><button class="btn-icon btn-release"><i class="fas fa-tag"></i> Releases</button></div>\` : '';
                const officialButton = \`<a href="\${proj.homepage}" target="_blank" class="official-link-btn" title="访问官网"><i class="fas fa-external-link-alt"></i></a>\`;
                const bgIconClass = type === 'github' ? 'fab fa-github' : 'fab fa-docker';
                card.innerHTML = \`
                    <div class="card-bg-icon"><i class="\${bgIconClass}"></i></div>
                    <div class="card-header">
                        <a class="project-name" data-detail='\${JSON.stringify(proj).replace(/'/g, "&apos;")}' data-type="\${type}">\${displayName}</a>
                        <div class="header-right">\${officialButton}</div>
                    </div>
                    <div class="project-meta">
                        <span class="meta-item"><i class="far fa-calendar-alt"></i> 最后更新: \${proj.lastUpdate}</span>
                        <span class="meta-item"><i class="far fa-clock"></i> 存入: \${proj.versions[0].date}</span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-icon git-link-btn"><i class="far fa-copy"></i> Git链接</button>
                        <div style="display: flex; gap:0.3rem;"><button class="btn-icon btn-download"><i class="fas fa-file-zipper"></i> 下载ZIP</button></div>
                        \${releasesButton}
                    </div>\`;
                const nameLink = card.querySelector('.project-name');
                nameLink.addEventListener('click', (e) => { e.preventDefault(); showDetail(type, JSON.parse(e.target.dataset.detail)); });
                const releaseBtn = card.querySelector('.btn-release');
                if (releaseBtn) releaseBtn.addEventListener('click', (e) => { e.stopPropagation(); showReleasesPopup(proj.versions, proj.name, type, 0, false); });
                return card;
            }

            function showDetail(type, project) {
                homeView.classList.add('hide');
                detailView.classList.remove('hide');
                let currentVersionIndex = 0;
                const renderDetailContent = (versionIdx) => {
                    const version = project.versions[versionIdx];
                    let filesHtml = '', releasesHtml = '';
                    if (type === 'github') {
                        filesHtml = \`<div class="file-list">\${version.files.map(f => \`<div class="file-row"><i class="far fa-file-code file-icon"></i><span class="file-name">\${f}</span><span class="file-meta">\${(Math.random()*4+1).toFixed(1)} KB</span></div>\`).join('')}</div>\`;
                        if (version.releases && version.releases.length > 0) {
                            releasesHtml = \`<div class="section-title">Releases</div><div class="releases-list">\${version.releases.map(r => \`<div class="release-row"><i class="fas fa-tag release-icon"></i><div class="release-info"><span class="release-tag">\${r.tag}</span><span class="release-date">\${r.date}</span></div><div class="release-download"><button class="btn-icon btn-download"><i class="fas fa-download"></i> 下载</button></div></div>\`).join('')}</div>\`;
                        }
                    } else {
                        filesHtml = \`<div class="docker-tag-list">\${version.tags.map(tag => \`<div class="tag-row"><span><i class="fas fa-tag"></i> \${tag}</span><span><button class="btn-icon"><i class="fas fa-download"></i> pull</button><button class="btn-icon btn-stream"><i class="fas fa-water"></i> 流式</button></span></div>\`).join('')}</div>\`;
                        if (version.releases && version.releases.length > 0) {
                            releasesHtml = \`<div class="section-title">版本发布</div><div class="releases-list">\${version.releases.map(r => \`<div class="release-row"><i class="fas fa-tag release-icon"></i><div class="release-info"><span class="release-tag">\${r.tag}</span><span class="release-date">\${r.date}</span>\${r.digest ? '<span style="font-size:0.8rem;">' + r.digest + '</span>' : ''}</div><div class="release-download"><button class="btn-icon btn-download"><i class="fas fa-download"></i> pull</button></div></div>\`).join('')}</div>\`;
                        }
                    }
                    return { filesHtml, releasesHtml };
                };
                const buildFullHtml = (versionIdx) => {
                    const { filesHtml, releasesHtml } = renderDetailContent(versionIdx);
                    const versionDates = project.versions.map(v => v.date);
                    const currentDate = project.versions[versionIdx].date;
                    return \`<div class="detail-header"><button class="back-btn" id="backBtn"><i class="fas fa-arrow-left"></i> 返回列表</button><h2><i class="\${type === 'github' ? 'fab fa-github' : 'fab fa-docker'}"></i> \${project.name}</h2><div class="version-selector" id="versionSelector"><span id="selectedVersion">\${currentDate}</span><i class="fas fa-chevron-down"></i><div class="version-dropdown" id="versionDropdown">\${versionDates.map((date, idx) => \`<div class="version-item \${idx === versionIdx ? 'current' : ''}" data-version-index="\${idx}">\${date}</div>\`).join('')}</div></div></div>\${filesHtml}\${releasesHtml || ''}<p style="margin-top:1rem; color:#475569;"><i class="fas fa-info-circle"></i> \${type === 'github' ? '文件列表和Releases随版本切换' : '标签列表和Releases随版本切换'}</p>\`;
                };
                detailView.innerHTML = buildFullHtml(currentVersionIndex);
                document.getElementById('backBtn').addEventListener('click', () => { detailView.classList.add('hide'); homeView.classList.remove('hide'); });
                const selector = document.getElementById('versionSelector');
                const dropdown = document.getElementById('versionDropdown');
                selector.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('show'); });
                dropdown.querySelectorAll('.version-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const idx = parseInt(item.dataset.versionIndex);
                        if (idx !== currentVersionIndex) {
                            currentVersionIndex = idx;
                            detailView.innerHTML = buildFullHtml(currentVersionIndex);
                            showDetail(type, project);
                        }
                        dropdown.classList.remove('show');
                    });
                });
                document.addEventListener('click', function closeDropdown(e) { if (selector && !selector.contains(e.target)) dropdown.classList.remove('show'); }, { once: true });
            }

            // 悬浮窗
            const popup = document.getElementById('releasesPopup');
            const popupClose = document.getElementById('popupClose');
            const popupProjectName = document.getElementById('popupProjectName');
            const popupSelectedVersion = document.getElementById('popupSelectedVersion');
            const popupVersionSelector = document.getElementById('popupVersionSelector');
            const popupVersionDropdown = document.getElementById('popupVersionDropdown');
            const popupReleasesList = document.getElementById('popupReleasesList');
            let currentVersions = [];
            let currentPopupVersionIdx = 0;
            let currentPopupType = 'github';
            let isOfficialPopup = false;

            window.showReleasesPopup = function(versions, projectName, type, versionIdx, official = false) {
                currentVersions = versions;
                currentPopupVersionIdx = versionIdx;
                currentPopupType = type;
                isOfficialPopup = official;
                popupProjectName.innerText = projectName;
                const version = versions[versionIdx];
                popupSelectedVersion.innerText = version.date;
                let dropdownHtml = '';
                versions.forEach((v, idx) => {
                    dropdownHtml += \`<div class="version-item-sm \${idx === versionIdx ? 'current' : ''}" data-popup-version="\${idx}">\${v.date}</div>\`;
                });
                popupVersionDropdown.innerHTML = dropdownHtml;
                renderPopupReleases(version.releases, official);
                popup.style.display = 'flex';

                popupVersionDropdown.querySelectorAll('.version-item-sm').forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const newIdx = parseInt(item.dataset.popupVersion);
                        if (newIdx !== currentPopupVersionIdx) {
                            currentPopupVersionIdx = newIdx;
                            const newVersion = currentVersions[newIdx];
                            popupSelectedVersion.innerText = newVersion.date;
                            renderPopupReleases(newVersion.releases, isOfficialPopup);
                            popupVersionDropdown.querySelectorAll('.version-item-sm').forEach(el => el.classList.remove('current'));
                            item.classList.add('current');
                        }
                        popupVersionDropdown.classList.remove('show');
                    });
                });
            };

            function renderPopupReleases(releases, official = false) {
                if (!releases || releases.length === 0) {
                    popupReleasesList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #64748b;">暂无 Releases 文件</div>';
                    return;
                }
                let html = '';
                releases.forEach(r => {
                    html += \`<div class="release-row"><i class="fas fa-tag release-icon"></i><div class="release-info"><span class="release-tag">\${r.tag}</span><span class="release-date">\${r.date}</span></div></div>\`;
                    if (r.assets && r.assets.length > 0) {
                        r.assets.forEach(asset => {
                            const size = asset.size ? (asset.size / 1024).toFixed(2) + ' KB' : '';
                            html += \`
                                <div class="asset-row">
                                    <span class="asset-name">📄 \${asset.name}</span>
                                    <span class="asset-size">\${size}</span>
                                    <div class="release-download">
                                        <button class="btn-icon btn-download" onclick="window.open('\${asset.url}', '_blank')"><i class="fas fa-download"></i> 官网下载</button>
                                        <button class="btn-icon btn-stream" onclick="alert('流式下载演示')"><i class="fas fa-water"></i> 流式下载</button>
                                    </div>
                                </div>
                            \`;
                        });
                    } else {
                        html += \`<div class="asset-row">该版本无可下载文件</div>\`;
                    }
                });
                popupReleasesList.innerHTML = html;
            }

            popupVersionSelector.addEventListener('click', (e) => { e.stopPropagation(); popupVersionDropdown.classList.toggle('show'); });
            popupClose.addEventListener('click', () => popup.style.display = 'none');
            popup.addEventListener('click', (e) => { if (e.target === popup) popup.style.display = 'none'; });

            function setActiveTab(tabId) {
                currentTab = tabId;
                tabs.forEach(t => t.classList.remove('active'));
                document.querySelector(\`.tab-item[data-tab="\${tabId}"]\`).classList.add('active');
                if (tabId === 'github') { githubGrid.classList.remove('hide'); dockerGrid.classList.add('hide'); } else { githubGrid.classList.add('hide'); dockerGrid.classList.remove('hide'); }
                if (searchMode === 'official') modeText.innerText = currentTab === 'github' ? 'GitHub 搜索' : 'Docker 搜索';
            }

            tabs.forEach(tab => tab.addEventListener('click', () => setActiveTab(tab.dataset.tab)));

            await loadData();
            renderGrid();
            setActiveTab('github');
            modeText.innerText = '存储库';

            document.addEventListener('click', (e) => {
                if (e.target.closest('.git-link-btn')) alert('复制 Git 链接演示 (本站代理链接)');
                else if (e.target.closest('.btn-download:not(.btn-stream)')) alert('下载项目ZIP / pull (通过本站代理)');
                else if (e.target.closest('.btn-stream')) alert('流式代理下载 (流量经过B2)');
            });
        })();
    </script>

    <div style="max-width:1400px; margin:0 auto 2rem; padding:0 2rem; color:#64748b; font-size:0.9rem; border-top:1px solid #e2e8f0; padding-top:1.5rem;">
        <p><i class="fas fa-check-circle" style="color:#22c55e;"></i> 优化：统计信息紧靠项目名，悬浮窗关闭按钮固定右上角，无 Releases 的项目自动隐藏按钮，每页搜索结果改为10条。</p>
    </div>
</body>
</html>`;
}