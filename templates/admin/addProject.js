// templates/admin/addProject.js
// 项目添加卡片（搜索框 + 结果区 + 完整备份按钮）
export const addProjectHTML = `
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
    <p style="color:#64748b; margin-top:0.5rem;">搜索后将项目完整备份到存储桶</p>
</div>
`;