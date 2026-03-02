// templates/admin/snippets.js
// Snippets 规则卡片（桶配置和使用量）
export const snippetsHTML = `
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
`;