// templates/admin/adminIndex.js
import { adminHeaderHTML } from './adminHeader.js';
import { addProjectHTML } from './addProject.js';
import { autoMonitorHTML } from './autoMonitor.js';
import { snippetsHTML } from './snippets.js';
import { hostnameHTML } from './hostname.js';
import { s3ConfigHTML } from './s3Config.js';  // 新增

export const adminHTML = `
<div id="adminPanel" class="admin-panel">
    ${adminHeaderHTML}
    ${addProjectHTML}
    ${autoMonitorHTML}
    ${snippetsHTML}
    ${hostnameHTML}
    ${s3ConfigHTML}  <!-- 新增卡片 -->
</div>
`;
