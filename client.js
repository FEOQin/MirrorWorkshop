// client.js
// 前端 JavaScript 逻辑（所有交互、数据获取、轮询），导出为字符串
export const clientJS = `(async function() {
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
                                assets: []
                            }));
                        }
                    }
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
                            <button class="save-btn backup-btn" data-name="\${item.name}" data-type="\${item.type}">完整备份</button>
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

            // 绑定完整备份按钮事件
            document.querySelectorAll('.backup-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const name = e.target.dataset.name;
                    const type = e.target.dataset.type;
                    const bucketId = e.target.parentElement.querySelector('.bucket-select').value;
                    const res = await fetch(apiBase + '/project', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type, name, bucketId })
                    });
                    const result = await res.json();
                    if (result.success) {
                        alert(\`完整备份任务已提交，任务ID: \${result.taskId}\`);
                        pollTaskStatus(result.taskId);
                    } else {
                        alert('保存失败：' + (result.error || '未知错误'));
                    }
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

    // 轮询任务状态
    function pollTaskStatus(taskId) {
        const interval = setInterval(async () => {
            const res = await fetch(\`/api/task/\${taskId}\`);
            const task = await res.json();
            if (task.status === 'completed') {
                clearInterval(interval);
                alert(\`备份完成！共上传 \${task.totalFiles} 个文件\`);
                location.reload();
            } else if (task.status === 'failed') {
                clearInterval(interval);
                alert(\`备份失败: \${task.error}\`);
            } else if (task.status === 'processing' || task.status === 'queued') {
                const progress = task.completedBatches ? \`\${task.completedBatches.length}/\${task.totalBatches}\` : '0/?';
                console.log(\`任务处理中... 批次进度: \${progress}\`);
            }
        }, 3000);
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.git-link-btn')) alert('复制 Git 链接演示 (本站代理链接)');
        else if (e.target.closest('.btn-download:not(.btn-stream)')) alert('下载项目ZIP / pull (通过本站代理)');
        else if (e.target.closest('.btn-stream')) alert('流式代理下载 (流量经过B2)');
    });
})();`;