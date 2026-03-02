// templates/admin/s3Config.js
export const s3ConfigHTML = `
<div class="card">
    <div class="card-header">
        <h2>S3 存储桶配置</h2>
        <div style="display: flex; gap: 0.5rem;">
            <button class="btn-icon" id="addBucketBtn"><i class="fas fa-plus"></i> 添加新桶</button>
            <button class="btn-icon" id="deleteModeBtn" title="批量删除"><i class="fas fa-trash"></i></button>
        </div>
    </div>
    <div id="bucketsList" class="buckets-grid">
        <!-- 桶卡片将动态渲染 -->
    </div>
    <div style="margin-top: 1rem;" id="snippetsJson">
        <!-- 这里显示动态生成的Snippets配置 -->
    </div>
</div>

<!-- 添加/编辑桶的模态框（与之前相同，但增加桶标识字段） -->
<div class="modal-overlay" id="bucketModal" style="display: none;">
    <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
            <h3 id="bucketModalTitle">添加新桶</h3>
            <div class="modal-close" id="closeBucketModal"><i class="fas fa-times"></i></div>
        </div>
        <form id="bucketForm">
            <div class="input-group">
                <label>自定义桶名 <span style="color:#ef4444;">*</span></label>
                <input type="text" id="bucketCustomName" placeholder="例如: 我的默认桶" required>
            </div>
            <div class="input-group">
                <label>应用密钥ID (keyID) <span style="color:#ef4444;">*</span></label>
                <input type="text" id="bucketKeyID" placeholder="例如: 006ebb39a593d8a0000000002" required>
            </div>
            <div class="input-group">
                <label>应用密钥 (applicationKey) <span style="color:#ef4444;">*</span></label>
                <input type="password" id="bucketAppKey" placeholder="例如: K006N6aOLs31B7svSroyWHKP2+HJHQU" required>
            </div>
            <div class="input-group">
                <label>存储桶名 (bucketName) <span style="color:#ef4444;">*</span></label>
                <input type="text" id="bucketName" placeholder="例如: M-M-O-C2" required>
            </div>
            <div class="input-group">
                <label>端点 (Endpoint) <span style="color:#ef4444;">*</span></label>
                <input type="text" id="bucketEndpoint" placeholder="例如: s3.ca-east-006.backblazeb2.com" required>
            </div>
            <div class="input-group">
                <label>桶标识 (可选)</label>
                <input type="text" id="bucketId" placeholder="留空则不在Snippets中显示">
                <small style="color:#64748b;">填写后将在Snippets规则中显示为键名</small>
            </div>
            <input type="hidden" id="editingIndex" value="-1">
            <button type="submit" class="modal-btn" id="saveBucketBtn">保存</button>
        </form>
    </div>
</div>
`;
