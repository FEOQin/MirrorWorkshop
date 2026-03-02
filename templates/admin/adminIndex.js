// templates/admin/adminIndex.js
// 后台整体结构（导入各卡片并组装）
import { adminHeaderHTML } from './adminHeader.js';
import { addProjectHTML } from './addProject.js';
import { autoMonitorHTML } from './autoMonitor.js';
import { snippetsHTML } from './snippets.js';
import { hostnameHTML } from './hostname.js';

export const adminHTML = `
<div id="adminPanel" class="admin-panel">
    ${adminHeaderHTML}
    ${addProjectHTML}
    ${autoMonitorHTML}
    ${snippetsHTML}
    ${hostnameHTML}
</div>
`;