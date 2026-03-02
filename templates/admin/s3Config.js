// templates/admin/s3Config.js
// S3 存储桶配置卡片
export const s3ConfigHTML = `
<div class="card">
    <div class="card-header">
        <h2>S3 存储桶配置</h2>
        <button class="btn-icon" id="addBucketBtn"><i class="fas fa-plus"></i> 添加新桶</button>
    </div>
    <div id="bucketsList" class="bucket-list">
        <!-- 桶列表将动态渲染 -->
    </div>
</div>

<!-- 添加/编辑桶的模态框 -->
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
                <label>桶标识 (ID) <small>留空则自动生成</small></label>
                <input type="text" id="bucketId" placeholder="例如: default" disabled>
                <small style="color:#64748b;">用于内部引用，不可重复</small>
            </div>
            <input type="hidden" id="editingIndex" value="-1">
            <button type="submit" class="modal-btn" id="saveBucketBtn">保存</button>
        </form>
    </div>
</div>
`;