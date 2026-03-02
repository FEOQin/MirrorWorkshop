// templates/home/homeIndex.js
// 首页整体结构（导入各子组件并组装）
import { tabsHTML } from './tabs.js';
import { searchHTML } from './search.js';
import { officialCardHTML } from './officialCard.js';
import { projectGridHTML } from './projectGrid.js';

export const homeHTML = `
<div id="homeView">
    ${tabsHTML}
    ${searchHTML}
    ${officialCardHTML}
    ${projectGridHTML}
</div>
`;